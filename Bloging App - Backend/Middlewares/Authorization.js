const userCollection = require("../Models/users");

const authorization = async (req, res, next) => {

    try {

        const username = (req.query.username).toLowerCase();

        const findUser = await userCollection.findOne({ username: username })

        if (!findUser.isAdmin) {
            res.json({ message: "You are not authorized" })
            return;

        } else {
            next()

        }

    } catch (err) {

        res.json({message : "Error while authorization for admin routes"})

    }


}

module.exports = authorization