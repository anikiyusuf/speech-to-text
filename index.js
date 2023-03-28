const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
PORT = process.env.PORT
app.use(express.static('public'))
app.use(express.json())
app.use(cors())


app.use('/', require('./routes/api'));

app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});
});


app.listen( PORT, () =>{
    console.log(`server running on port ${3000}`);
});