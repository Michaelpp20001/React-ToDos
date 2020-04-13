//todo schema
var mongoose = require("mongoose");

todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name cannot be blank!"
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;