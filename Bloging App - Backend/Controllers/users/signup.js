const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { signupSchema } = require("../../Config/inputValidation")
const userCollection = require("../../Models/users")
const JWT_SECRET = require("../../Config/JWT_SECRET.JS")

const signup = async (req, res) => {
    try {

        const userInputs = signupSchema.safeParse(req.body)

        if (userInputs == null) {
            res.json({ message: "Invalid inputs" })
            return
        }

        const userExists = await userCollection.findOne({ username: (userInputs.data.username).toLowerCase() })

        if (userExists) {
            res.json({ message: "User already exists / Go to login page" })
            return;
        }

        const Token = `Bearer ${jwt.sign((userInputs.data.username).toLowerCase(), JWT_SECRET)}`
        const hashedPassword = await bcrypt.hash(userInputs.data.password, 10)

        await userCollection.create({
            firstName: (userInputs.data.firstName).toLowerCase(),
            lastName: (userInputs.data.lastName).toLowerCase(),
            username: (userInputs.data.username).toLowerCase(),
            password: hashedPassword,
            isAdmin: false
        })

        res.status(201).json({ message: "User Created", Token })

    } catch (err) {

        res.json({ message: "Error while signing-up" })

    }

}

module.exports = signup