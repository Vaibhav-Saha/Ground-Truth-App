const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for your data
const yourSchema = new mongoose.Schema({
  timestamp:Date,
  label:String
});

const YourModel = mongoose.model('YourModel', yourSchema);

app.use(express.json());

// Create a route to handle POST requests
app.post('/yourEndpoint', async (req, res) => {
  try {
    const data = req.body;
    const newData = new YourModel(data);
    await newData.save();
    res.status(201).send(newData);
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.listen(3000, () => {
  console.log('Server is running on port 3001');
});
