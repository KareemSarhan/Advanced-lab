require('dotenv').config();
const PORT = process.env.PORT;
const users = require('./users')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bycrypt = require('bcryptjs')
const app = express();
const mongoConnectionString = process.env.mongoConnectionString
app.use(bodyParser.json());

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
app.post('/register',async (req,res)=>
{
    try {
        let {email}=req.body
        if(!email)
        {
            return res.status(400).json({msg:"7ot email 3dl ya wad"})
        }
        // const salt = await bycrypt.genSalt();
        // const hashedemail = await bycrypt.hash(email);
        const newuser = new users(
        {
            email:email
        });
    } catch (error) {
        res.status(500).json({error:error.message})
    }

})
app.post('/login',async(req,res)=>
{
    let {email,password} = req.body;
    console.log(req.body)
    console.log(password)
    if(!email||!password)
    {
        return res.status(400).json({msg:"7ot email/password 3dl ya wad"})
    }    
    const ExistingUser = await users.findOne({email:email,password:password})
    if(!ExistingUser){
        return res.status(400).json({msg:"email mesh mawgood"})
    }
    const matching = await bycrypt.compare(password,ExistingUser.password)
    if(!matching){
        return res.status(400).json({msg:"el password 8lt"})
    }
})
mongoose.connect(mongoConnectionString, { useNewUrlParser: true , useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");

})
