const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  stateComplete: {
    type: String,
    required: true,
    default: "Incomplete"
  }
});

const ToDo = mongoose.model("Todo", todoSchema);
module.exports = ToDo;
