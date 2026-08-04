const express = require('express')
const multer = require('multer')
const uploadFile = require('./services/storage.service')
const postModel = require('./models/post.model')
const cors = require('cors')
const app = express()
// app.use(express.json())
// multer for raw data postman
app.use(cors())
const upload = multer({storage:multer.memoryStorage()})

app.post('/create-post', upload.single("image"),async (req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    const result = await uploadFile(req.file.buffer)
    console.log(result)

    const post = await postModel.create({
        Image: result.url,
        caption:req.body.caption
    })

    return res.status(201).json({
        message:"Post Created succesfully",
        post
    })
})
 

app.get('/posts',async (req,res)=>{
    const post = await postModel.find();

    // console.log(post)

    res.status(200).json({
        message:"Post Fetched Successfully",
        post:post
    })

})

module.exports = app