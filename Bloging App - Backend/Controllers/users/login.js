const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { loginSchema } = require("../../Config/inputValidation")
const userCollection = require("../../Models/users")
const JWT_SECRET = require("../../Config/JWT_SECRET")

const login = async (req, res) => {
    try {

        const userInput = loginSchema.safeParse(req.body)

        if (!userInput) {
            res.json({ message: "Invalid inputs / Try again" })
            return;
        }

        const userExist = await userCollection.findOne({ username: (userInput.data.username).toLowerCase() })

        if (!userExist) {
            res.json({ message: "User does'nt exists / Go to signup page" })
            return;
        }

        const validPassword = await bcrypt.compare(userInput.data.password, userExist.password)

        if (!validPassword) {
            res.json({ message: "Incorrect password / Try again" })
            return;
        }

        const Token = `Bearer ${jwt.sign(userExist.username, JWT_SECRET)}`
        res.json({ Token })


    } catch (err) {

        res.json({messge : "Error while logging-in"})

    }

}

module.exports = login