const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../Config/JWT_SECRET");


const auth = async (req, res, next) => {
    try {

        const authToken = req.headers.authorization;

        const token = authToken.split("Bearer ")[1]

        const isValid = jwt.verify(token, JWT_SECRET)

        if (!isValid) {
            res.json({ message: "Invalid token" })
            return

        } else {
            next()
        }

    } catch (err) {

        res.json({message : "Error while authentication"})

    }



}

module.exports = auth