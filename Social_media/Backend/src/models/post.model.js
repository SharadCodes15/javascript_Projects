const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    Image:String,
    caption:String,
})

const postModel = mongoose.model("post",postSchema)

module.exports = postModel
/*
post={
    image:string,
    caption:string
}

user={
    name:string,
    email:string
    password:string
    post:[post1,post2,post3]
}

*/