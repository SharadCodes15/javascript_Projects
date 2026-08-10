const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  category: {
    type: String,
    default: "No Category",
    trim: true,
  },
  date: {
    type: String,
    default: "Today",
    validate: {
      validator: function (v) {
        // Accepts "Today" or a valid ISO date string
        return v === "Today" || !isNaN(Date.parse(v));
      },
      message: (props) =>
        `${props.value} is not a valid date format or "Today"!`,
    },
  },
  title: {
    type: String,
    default: "No Title",
    required: true,
    trim: true,
  },
  text:{
    type:String,
    default:"",
    trim:true,
  },
    tag: {
    type: String,
    default: "",
    trim: true
  },
  image:{
    type:String,
    default:"",
    trim:true,
  },
  pinned:{
    type:Boolean,
    default:false,
  },
    color: {
    type: String,
    default: "purple",
    enum: {
      values: [
        "purple", "green", "blue", 
        "red", "orange", "yellow", 
        "teal", "pink", "gray", "indigo"
      ],
      message: "Please select a valid color option."
    }
  }
}, { timestamps: true });


const NotesModel = mongoose.model('NotesBlock',noteSchema)

module.exports = NotesModel
