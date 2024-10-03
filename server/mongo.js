const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://ISky:QEUkchFP60MY8uh3@isky.ihd3s.mongodb.net/kumare?retryWrites=true&w=majority&appName=ISky")
mongoose.connection.on('connected', function () {
    console.log('mongo db connected');
  })


const newSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const user = mongoose.model("users",newSchema)

module.exports = user
