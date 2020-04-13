$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)

    $("#todoInput").keypress(function(event){
        //which contains keycode value, enter key = 13
        if(event.which == 13) {
            console.log("you hit enter!");
            createTodo()
        }
    })
});

function addTodos(todo){
    //add todos to page
    //looping through todos with for each
    todo.forEach(function(todo){
        addTodo(todo);
    })
};

function addTodo(todo){
    var newTodo = $("<li class='task'>" + todo.name + todo.completed + "</li>");
    //toggle, or adding a new class for the todo if completed
    if(todo.completed)
        newTodo.addClass("done")
    //appending the todos to the DOM
    $(".list").append(newTodo);
};

function createTodo(){
    //send request to create new todo
    //binding the input to a variable 
    var userInput = $("#todoInput").val();
    $.post("/api/todos", {name: userInput})
    .then(function(newTodo){
        console.log(newTodo)
        //clearing input after success
        $("#todoInput").val("");
        //calling previously made function to append new todo
        addTodo(newTodo);

    })
    .catch(function(err){
        console.log(err);
    })
}