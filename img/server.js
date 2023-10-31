const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use('/img',express.static(__dirname+'/img/'));

mongoose.connect('mongodb://localhost:27017/tester', { useNewUrlParser: true, useUnifiedTopology: true });

const schema = new mongoose.Schema({
  timestamp:Date,
  label:String
});

const Model = mongoose.model('Model', schema);

app.use(express.json());

app.post('/', async (req, res) => {
  
    var date = new Date();
    let newData = new Model({
      timestamp: date,
      label: req.body.addi
    })
    newData.save();
  
});


app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});