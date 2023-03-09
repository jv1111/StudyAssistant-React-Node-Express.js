const express = require("express");
require("dotenv").config();//load env
const app = express();

//start the server
app.listen(process.env.PORT,()=>{
    console.log(`Running on port ${process.env.PORT}`);
});