const express = require('express');
const noteController = require('../controllers/note.controller')

const router = express.Router();

router.post('/Create-Note',noteController.CreateNotes)
router.get('/Notes',noteController.GetNotes)

module.exports = router