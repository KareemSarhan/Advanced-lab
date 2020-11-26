require('dotenv').config();
const PORT = process.env.PORT;
const users = require('./users')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const mongoConnectionString = process.env.mongoConnectionString
app.use(bodyParser.json());

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
app.post('/register',(req,res)=>
{
    try {
        console.log(req.body)
        let {email}=req.body
        if(!email)
        {
            return res.status(400).json({msg:"7ot email 3dl ya wad"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }

})
mongoose.connect(mongoConnectionString, { useNewUrlParser: true , useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");

})
