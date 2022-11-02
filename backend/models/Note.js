const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema({
// for the notes of specific user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // this user refered from User.js
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : {
        type: String,
        default: "general"
    },
    timestamp : {
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes', NoteSchema);