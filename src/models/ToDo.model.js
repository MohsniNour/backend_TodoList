const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToDoType = Object.freeze({
  Started: "started",
  Validated: "validated",
  NotValidated: "notValidated",
  Finished: "finished",
});
const ToDoSchema = new Schema(
  {
    toDoName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    EndDateEvent: {
    type: Date,
    required: true,
    },
    toDoDescription: {
      type: String,
      required: true,
    },
    toDoType: {
      type: String,
      required: true,
      enum: Object.values(ToDoType),
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("ToDo", toDoSchema);

module.exports = Task;
