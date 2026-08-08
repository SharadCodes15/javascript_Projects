const express = require('express');
const cookie_parser = require('cookie-parser');
const authrouter = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());


app.use('/api/auth',authrouter);
app.use('/api/music',musicRoutes);

module.exports = app