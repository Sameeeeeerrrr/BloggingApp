const bcrypt = require("bcrypt")
const { updateUserSchema } = require("../../Config/inputValidation")
const userCollection = require("../../Models/users")
const blogCollection = require("../../Models/services")

const update = async (req, res) => {
    try {

        const currentUsername = (req.headers.username).toLowerCase()
        const currentPassword = req.headers.password
        const userInputs = updateUserSchema.safeParse(req.body)

        if (!userInputs) {
            res.json({ message: "Invalid inputs / Try again" })
            return;
        }

        const findUser = await userCollection.findOne({ username: currentUsername })
        const validPassword = await bcrypt.compare(currentPassword, findUser.password)

        if (!validPassword) {
            res.json({ message: "You are not authorized / Incorrect password" })
            return;
        }

        if (userInputs.data.username) {
            const findingIdenticalUsernames = await userCollection.findOne({ username: (userInputs.data.username).toLowerCase() })
            if (findingIdenticalUsernames) {
                res.json({ message: "This username is already taken / Try a unique one" })
                return;
            }
        }

        const findBlogs = await blogCollection.find({ author_username: currentUsername })

        if (findBlogs)
            await blogCollection.updateMany({ author_username: currentUsername }, {
                author: (userInputs.data.firstName && userInputs.data.lastName) ? (`${userInputs.data.firstName} ${userInputs.data.lastName}`).toLowerCase() : `${findUser.firstName} ${findUser.lastName}`,
                author_username: userInputs.data.username ? (userInputs.data.username).toLowerCase() : findUser.username
            })

        const hashedPassword = (userInputs.data.password) ? await bcrypt.hash(userInputs.data.password, 10) : findUser.password

        await userCollection.updateOne({ username: currentUsername }, {
            firstName: userInputs.data.firstName ? (userInputs.data.firstName).toLowerCase() : findUser.firstName,
            lastName: userInputs.data.lastName ? (userInputs.data.lastName).toLowerCase() : findUser.lastName,
            username: userInputs.data.username ? (userInputs.data.username).toLowerCase() : findUser.username,
            password: hashedPassword
        })

        res.json({ message: "User credentials got updated" })

    } catch (err) {

        res.json({ message: "Error while updating your information" })

    }
}

module.exports = update