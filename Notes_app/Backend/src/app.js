const express = require('express');
const notesRoutes = require('./routes/note.routes')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/notes/',notesRoutes);

module.exports = app