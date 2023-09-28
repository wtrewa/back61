const express = require('express')
const userModel = require('../Model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blackList = require('../blackList')


const userRoute =  express.Router()


userRoute.post('/register',async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        const user = await userModel.findOne({email})
        console.log(user)
        if(user){
            res.send('You have already registered')
        }
        else
        {
            const newPassword = await bcrypt.hash(password,10)
            const newUser = await userModel.create({name,email,password:newPassword})
            res.send({
                message:"You have registered successfully",
                "user":newUser,
            })
        }
    } catch (error) {
        res.send({
            "register":error
        })
    }
})
userRoute.post('/login',async(req,res)=>{
    try {
        const {email,password,name} = req.body;
        const user = await userModel.findOne({email})
        console.log(user)
        if(!user){
            res.send('You need to sigup first ')
        }
        else
        {
            const varify = await bcrypt.compare(password,user.password)
            if(!varify){
                res.send('You password is incorrect')
            }
            else{

                const token = await jwt.sign({user:user._id,name:user.name},'secret')
                res.send({
                    message:"login successful",
                    "token":token,
                })
            }
            
        }
    } catch (error) {
        res.send({
            "register":error
        })
    }
})


userRoute.get('/logout',async(req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.send('login first')
    }
    else {
        blackList.push(token)
        res.send('logout successful')
    }
})


module.exports = userRoute;