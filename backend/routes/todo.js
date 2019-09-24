const router = require("express").Router();
let ToDo = require("../models/todoModel");
const uuidv4 = require("uuid/v4");

// Get All Todo List
router.route("/TodoList").get((req, res, next) => {
  ToDo.find()
    .then(todolist => res.json(todolist))
    .catch(err => res.status(401).json("ERROR" + err));
});

// Get Todo List By ID
router.route("/TodoList/:id").get((req, res, next) => {
  ToDo.findById(req.params.id).then(todo =>
    res.json(todo).catch(err => res.status(401).json("ERROR" + err))
  );
});

// Create Todo List
router.route("/TodoList/CreateTodo").post((req, res, next) => {
  let id = uuidv4();
  const newTodo = new ToDo({
    id: id,
    title: req.body.title
  });
  newTodo
    .save()
    .then(() => res.send("Create Todo Successfully"))
    .catch(err => res.status(400).json("ERROR" + err));
});

// Update Todo List
router.route("/TodoList/update/:id").put((req, res, next) => {
  ToDo.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      stateComplete: req.body.stateComplete
    }
  })
    .then(() => res.send("Update Todo Successfully"))
    .catch(err => res.status(401).json("ERROR" + err));
});

// Delete Todo By ID
router.route("/TodoList/delete/:id").delete((req, res, next) => {
  ToDo.findByIdAndRemove(req.params.id)
    .then(() => res.send("Delete Todo Successfully"))
    .catch(err => res.status(401).json("ERROR" + err));
});

module.exports = router;
