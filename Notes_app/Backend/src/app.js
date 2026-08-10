const express = require('express');
const notesRoutes = require('./routes/note.routes')


const app = express();
app.use(express.json())

app.use('/api/notes/',notesRoutes);

module.exports = app