const musicModel = require('../models/music.model');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const albumModel = require('../models/album.model')
const uploadFile = require('../services/storage.service')
async function createMusic(req,res) {
    // create a protection that only artist can access the music 
    // else they get 401 forbidden request
   
    const {title} = req.body;

    const file = req.file;
    const result = await uploadFile(file.buffer.toString('base64'));
    const music = await musicModel.create({
        uri:result.url,
        title,
        artist:req.user.id,
    })
    res.status(201).json({
        message:"Music created successfully",
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist,
        }
    })

}
// we are doing token check two time to prevent make middleware
async function createAlbum(req,res) {

   
    const {title,musics} = req.body;

    const album = await albumModel.create({
        title,
        artist:req.user.id,
        musics:musics,
    })
      

    res.status(201).json({
        message:"Album created successfully",
        album:{
            id:album._id,
            title:album.title,
            artist:album.artist,
            music:album.music,
        }
    })

}

async function getAllMusics(req,res) {
    const musics = await musicModel
    .find()
    .populate("artist") // get details of artist also
    .limit(10)
    // .skip(2) // skip 1 and 2 and print 3rd
    // find all songs at a time millions of songs at a time
    // use limits
    res.status(200).json({
        message:"Music fetched succesfully",
        musics:musics
    })
}

async function getAllAlbums(req,res) {

// optimise that no load beacause of all at a time 

    const albums = await albumModel.find().select("title artist").populate("artist","username email")
     // get details of artist also

    res.status(200).json({
        message:"Albums fetched succesfully",
        albums:albums
    })
}

async function getAlbumsByID(req,res) {

// optimise that no load beacause of all at a time 
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist","username email")
     // get details of artist also

    res.status(200).json({
        message:"Albums fetched succesfully",
        album:album
    })
}

module.exports = {createMusic,createAlbum,getAllMusics,getAllAlbums,getAlbumsByID}