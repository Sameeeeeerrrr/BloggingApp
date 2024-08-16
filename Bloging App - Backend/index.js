const express = require("express");
const cors = require("cors")
const connectDB = require("./Config/DBconnection")
const adminRouter = require("./Routes/admins")
const serviceRouter = require("./Routes/services")
const userRouter = require("./Routes/users")

const app = express()
const PORT = 8080

connectDB(/*YOUR MONGODB STRING*/)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/users", userRouter)
app.use("/api/v1/services", serviceRouter)
app.use("/api/v1/admins", adminRouter)

app.listen(PORT, () => { 
    console.log(`Server running http://localhost:${PORT}`) 
})
