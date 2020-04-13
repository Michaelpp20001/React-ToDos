var express = require("express"),
    app = express();
    port = process.env.PORt || 3000;
    bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos");

//allow us to access the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.send("Hello from the root route");
})

app.use("/api/todos", todoRoutes);

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
}) 