const { configDotenv } = require('dotenv');
const mongoose = require('mongoose')
require('dotenv').config();

const mongoose_key = process.env.MONGO_URI

async function connectDB() {
        await mongoose.connect(mongoose_key);
    //param : uri  async and await as it speed response dependent
    console.log("Connected to DB"); 
}

module.exports = connectDB
