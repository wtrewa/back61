const express = require('express')
const connect = require('./connect');
const userRoute = require('./Route/User');
const cors = require('cors');
const postRoute = require('./Route/Post');


const app = express()

app.use(express.json())
app.use(cors())


app.use('/api',userRoute)
app.use('/api',postRoute)


app.get('/',(req,res)=>{
    res.send('Welcome to the home route')
})


app.listen('8080',()=>{
    connect()
    console.log('server is running on port 8080')
})