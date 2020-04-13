var express = require("express");
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/todos");

//refactored functions, moved to helpers file
router.route("/")
    .get(helpers.getTodos)
    .post(helpers.createTodos)

//get todo by id
router.get("/:todoId", function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo)
    })
    .catch(function(err){
        res.send(err);
    })
});

//update todo by id
router.put("/:todoId", function(req, res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
})

//delete todo
router.delete("/:todoId", function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: "Deleted Todo"});
    })
    .catch(function(err){
        res.send(err);
    })
})

module.exports = router;