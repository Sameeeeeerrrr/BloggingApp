const bcrypt = require("bcrypt")
const userCollection = require("../../Models/users");
const blogCollection = require("../../Models/services");

const remove = async (req, res) => {
    try {
        const username = (req.headers.username).tolowerCase();
        const password = req.headers.password

        const isPasswordValid = await bcrypt.compare(password, findUser.password)
        if (!isPasswordValid) {
            res.json({ message: "You are not authorized / Incorrect password" })
            return;
        }

        const findUser = await userCollection.findOne({ username: username })
        if (!findUser) {
            res.json({ message: "User doesn't exists" })
            return;
        }

        const usersBlogsExist = await blogCollection.find({ author_username: username })

        if (usersBlogsExist) {
            await blogCollection.deleteMany({ author_username: username })
        }

        await userCollection.deleteOne({ username: username })
        res.json({ message: "User deleted" })


    } catch (err) {

        res.json({message : "Error while deleting your Account"})

    }

}

module.exports = remove