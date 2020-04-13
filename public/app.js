$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)

    $("#todoInput").keypress(function(event){
        //which contains keycode value, enter key = 13
        if(event.which == 13) {
            console.log("you hit enter!");
            createTodo()
        }
    });
    //on load, listening to clicks on list, and dynamically generated span, happens only
    //because we put the click listener on the ul's or on list class
    $(".list").on("click", "span", function(){
        var clickedId = $(this).parent().data("id");
        var deleteUrl = "/api/todos/" + clickedId;
        $(this).parent().remove();
        $.ajax({
            method: "DELETE",
            url: deleteUrl
        })
        .then(function(data){
            console.log(data);
        })
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
    var newTodo = $("<li class='task'>" + todo.name + " <span>X</span></li>");
    //jQuery is storing the id of each new todo
    newTodo.data("id", todo._id);
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