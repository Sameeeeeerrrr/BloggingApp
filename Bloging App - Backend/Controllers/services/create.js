const { createBlogSchema } = require("../../Config/inputValidation")
const blogCollection = require("../../Models/services")
const userCollection = require("../../Models/users")

const create = async (req, res) => {
    try {

        const user = (req.query.username).toLowerCase()
        const blogInput = createBlogSchema.safeParse(req.body)

        if (!blogInput) {
            res.json({ message: "Invalid inputs / Try again" })
            return;
        }

        const findUser = await userCollection.findOne({ username: user })

        await blogCollection.create({
            title: (blogInput.data.title).toLowerCase(),
            content: blogInput.data.content,
            date: Date.now(),
            author_username: findUser.username,
            author: `${findUser.firstName} ${findUser.lastName}`
        })
        res.json({ message: "Blog posted" })

    } catch (err) {

        res.json({message : "Error while posting your blog"})

    }

}

module.exports = create