// Require the Express Module
var express = require('express');

// Require the Mongoose Module
var mongoose = require('mongoose');

// Create an Express App
var app = express();

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

// Integrate body-parser with our App
app.use(bodyParser.json());

// Require path
var path = require('path');

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));

mongoose.connect('mongodb://localhost/api_1955');

// define Schema variable
var Schema = mongoose.Schema;

var TaskSchema = new mongoose.Schema({
    title:  { type: String, required: [true, "Title is required"], minlength: [3, "Title must be at least 3 characters long"] },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false }
}, {timestamps: true });

// set our models by passing them their respective Schemas
mongoose.model('Task', TaskSchema);

// store our models in variables
var Task = mongoose.model('Task');

// Routes
// Root Request
app.get('/tasks', function(req, res) {
    Task.find({ }, function(err, tasks) {         
        if(err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({message: "Error", error: err});
        }else{
            // respond` with JSON
            res.json({message: "Success", data: tasks});
        }
    });
});

app.get('/tasks/:id', function(req, res){
    Task.find({ _id: req.params.id }, function(err, task) {
        if(err) {
            console.log('something went wrong, could not display: '+req.params.name);
            console.log("Returned error", err);
            res.json({message: "Error", error: err});
        } else {
            console.log('Display a task by id!');
            res.json({message: "Success", data: task});
        }
    });
});

app.post('/tasks', function(req, res) {
    var task = new Task({ title: req.body.title, description: req.body.description, completed: req.body.completed });

    task.save(function(err) {
        if(err) {
            console.log('Something went wrong, could not save: '+req.body.title);
            console.log("Returned error", err);
            res.json({message: "Error", error: err});
        } else {
            // respond` with JSON
            res.json({message: "Success", data: task});
        }
    });
});

app.put('/tasks/:id', function(req, res){
    var query = {'_id': req.params.id};

    Task.findByIdAndUpdate(query, { title: req.body.title, description: req.body.description, completed: req.body.completed }, {upsert:true, new: true}, function(err, task){
        if(err) {
            console.log('Something went wrong, could not update task: '+req.params.id);
            console.log("Returned error", err);
            res.json({message: "Error", error: err});
        } else {
            console.log(task)
            res.json({message: "Success", data: task});
        }
    });
});

app.delete('/tasks/:id', function(req, res){
    Task.remove({ _id: req.params.id }, function(err, task) {
        if(err){
            console.log('something went wrong, could not remove task: '+req.params.id);
            console.log("Returned error", err);
            res.json({message: "Error", error: err});
        }else{
            console.log('successfully deleted a task!');
            res.json({message: "Success", data: task});
        }
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});