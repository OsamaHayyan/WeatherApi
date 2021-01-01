// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// POST route
app.post('/add', addData);
function addData(req, res){
    let data = req.body
    projectData["temp"] = data.temp;
    projectData["content"] = data.content;
    projectData["date"] = data.date;
}

// Initialize all route with a callback function
app.get('/all', sendData);
function sendData (req, res) {
  res.send(projectData);
};

// Setup Server
const port = 4200;
const server = app.listen(port, ()=>{
    console.log(`server is working on port ${port}`)
})

