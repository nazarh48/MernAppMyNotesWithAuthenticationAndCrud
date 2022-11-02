const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook1";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongoDB succeccfully");
    })
}

module.exports = connectToMongo;