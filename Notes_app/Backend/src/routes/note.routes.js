const express = require('express');
const noteController = require('../controllers/note.controller')

const router = express.Router();

router.post('/Create-Note', noteController.CreateNotes)
router.get('/Notes', noteController.GetNotes)
router.get('/:id', noteController.GetNoteById)
router.put('/:id', noteController.UpdateNotes)

module.exports = router 