const { default: mongoose } = require("mongoose");


const postSchema = mongoose.Schema({
    creator:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true },
    title:{type:String,required:true},
    content:{type:String,required:true},
    category:{type:String,enum:['Business', 'Tech', 'Lifestyle','Entertainment'],required:true},
    date:{type:Date,required:true},
    likes:{type:[String],default:[]},
    comments:{type:[Object],default:[]},
    user:{type:String,required:true}

})

const postModel = mongoose.model('post',postSchema)

module.exports = postModel;