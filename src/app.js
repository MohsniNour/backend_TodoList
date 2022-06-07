const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
// var MongoStore = require('rate-limit-mongo');
const { init } = require('./socket');

const app = express();

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes : to be updated ! for prod
  max: 1000,
  // store: new MongoStore({
  // uri: 'mongodb://127.0.0.1:27017/test_db',
  // user: 'mongouser',
  // password: 'mongopassword',
  // should match windowMs
  // expireTimeMs: 15 * 60 * 1000,
  // errorHandler: console.error.bind(null, 'rate-limit-mongo'),
  // see Configuration section for more options and details
  // }),
});

const limiterPatientSearching = rateLimit({
  windowMs: 60 * 1000, // 5 minutes : to be updated ! for prod
  max: 200,
  // store: new MongoStore({
  // uri: 'mongodb://127.0.0.1:27017/test_db',
  // user: 'mongouser',
  // password: 'mongopassword',
  // should match windowMs
  // expireTimeMs: 15 * 60 * 1000,
  // errorHandler: console.error.bind(null, 'rate-limit-mongo'),
  // see Configuration section for more options and details
  // }),
});

app.use(limiter);

// Init socket io
(async () => {
  try {
    init();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('failed to initialize SOCKET IO');
    process.exit(1);
  }
})();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
// app.options(
//   '*',
//   cors({
// origin: 'http://example.com',
// optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   })
// );

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}
app.use(express.static(`${__dirname}/public`));
app.get('/', (req, res) => res.sendFile(path.join(`${__dirname}/index.html`)));

// v1 api routes
app.use('/v1', routes);
app.use('/v1/patients', limiterPatientSearching);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
