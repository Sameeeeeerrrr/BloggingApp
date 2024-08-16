const mongoose = require("mongoose")

function connectDB(url){
    mongoose.connect(url)
        .then(()=>{console.log("Database connected")})
        .catch((err) => {console.log("Error while connecting to database",err)})
}

module.exports = connectDB