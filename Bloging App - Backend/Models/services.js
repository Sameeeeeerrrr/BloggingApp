const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    author : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
        trim : true,
    },
    content : {
        type : String,
        required : true,
        trim : true
    },
    date : {
        type : Number,
        required : true
    },
    author_username : {
        type : mongoose.Schema.Types.String,
        ref : "users",
        required : true
    }
})

const blogCollection = mongoose.model("blogs",blogSchema)

module.exports = blogCollection