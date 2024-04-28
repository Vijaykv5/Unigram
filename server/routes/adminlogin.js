const mongoose = require("mongoose");
const express = require("express");
const Router = express.Router();
const Admin = require("../models/adminDetails");


Router.post("/admin", async (req, res) => {
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({error: "Please fill the data"});
        }
        const userExist = await Admin.findOne({username: username});
        if(userExist){
            if (userExist.password === password) {
              res.status(200).json({ message: "Logged in successfully" });
            } else {
              res.status(400).json({ error: " is this Invalid credentials" });
            }
        }else{
            res.status(400).json({error: " Invalid credentials"});
        }
    }
    catch(err){
        console.log(err);
    }
});


module.exports = Router;