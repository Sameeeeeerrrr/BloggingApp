const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
    },
    username : {
        type : String,
        required : true,
        trim : true,
        unique : false,
    },
    password : {
        type : String,
        required : true,
        trim : true,
        unique : true,
    },
    isAdmin : {
        type : Boolean,
        required : true,
    }
})

const userCollection = mongoose.model("users", userSchema)

module.exports = userCollection