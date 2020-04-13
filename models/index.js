var mongoose = require("mongoose");
var dbPath = "mongodb+srv://michael:Wakethefuckup1@cluster0-hhvyr.mongodb.net/test?retryWrites=true&w=majority";

mongoose.set("debug", true);

mongoose.connect(dbPath, {
    useNewUrlParser: true,
});

mongoose.Promise = Promise;

const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});

process.on("SIGINT", function(){
    db.close(function(){
        console.log("> success!, database connection closed due to process termination");
        process.exit(0);
    });
});

module.exports = mongoose;
module.exports.Todo = require("./todo");