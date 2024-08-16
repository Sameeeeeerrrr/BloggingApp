const blogCollection = require("../../Models/services");
const userCollection = require("../../Models/users");

const removeUser = async (req, res) => {

    try {

        const userToBeRemoved = (req.headers.user).toLowerCase();

        const findUser = await userCollection.findOne({ username: userToBeRemoved })

        if (!findUser) {
            res.json({ message: "User doesn't exists" })
            return;
        }

        if (findUser.isAdmin) {
            res.json({ message: "Cannot remove a admin user" })
            return
        }

        await userCollection.deleteOne({ username: userToBeRemoved })
        await blogCollection.deleteMany({author_username : findUser.username})

        res.json({message : "User removed successfully"})
        
    } catch {

        res.json({ message: "Error while removing user" })

    }

}

module.exports = removeUser
