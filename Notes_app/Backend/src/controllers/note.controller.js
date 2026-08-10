const express = require('express')
const NotesModel = require('../models/note.model')

async function CreateNotes(req,res) {
    const {category,date,title,text,tag,image,pinned,color} = req.body;
    const note = await NotesModel.create({
        category,date,title,text,tag,image,pinned,color
    })
    res.status(201).json({
        message:"Note Created Successfully",
        note,
    })
}

async function GetNotes(req,res) {
    const notes = await NotesModel.find();
    res.status(200).json({
        message:"Notes fetched successfull",
        notes:notes
    })
    
}

module.exports = {CreateNotes,GetNotes}