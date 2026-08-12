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

async function GetNoteById(req, res) {
    const { id } = req.params;
    const note = await NotesModel.findById(id);
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({
        message: "Note fetched successfully",
        note,
    });
}

async function UpdateNotes(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    const note = await NotesModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
        message: "Note updated successfully",
        note,
    });
}

module.exports = {CreateNotes,GetNotes,GetNoteById,UpdateNotes}