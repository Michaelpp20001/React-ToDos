var express = require("express"),
    app = express();
    port = process.env.PORt || 3000;
    bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos");

//allow us to access the request body, had to npm install body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//allow us to point to html file for the view
//telling express to serve these static files and these are the directories
app.use(express.static(__dirname + "/views"));
//allow us to point to css file in the public directory for the styles
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
    res.sendFile("index.html");
})

app.use("/api/todos", todoRoutes);

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
}) 