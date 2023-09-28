const { log } = require("console")
const { default: mongoose } = require("mongoose")

const connect = async()=>{
    try {
      const  connection =  await mongoose.connect(`mongodb+srv://psaurabh574:psaurabh574@cluster0.yyxtfwu.mongodb.net/mock6database?retryWrites=true&w=majority`)
      console.log('connection has built')
      
    } catch (error) {
        console.log(error)
    }
}

module.exports  = connect;