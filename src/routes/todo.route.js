const router = require('express').Router();
const { todoController } = require('../controllers');

router.get('/all', todoController.getTasks);
router.get('/:id', todoController.getTaskById);
router.post('/createTodo', todoController.createTodo);
router.put('/update/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
module.exports = router;
