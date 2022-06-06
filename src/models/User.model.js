const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First Name Minimum 3 charachters."],
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, "Last Name Minimum 3 charachters."],
        },
        mailAddress: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password Minimum 6 charachters."],
        },
        loginAttempts: { type: Number, required: true, default: 0 },
        lockUntil: { type: Number },
        roles: {
            type : String,
            enum : ['Simple User','Admin','Financial','Super Admin'],
            default : 'Simple User'
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema, "User");
module.exports = User;
