const { updateBlogSchema } = require("../../Config/inputValidation")
const blogCollection = require("../../Models/services")

const update = async (req, res) => {
    try {

        const username = (req.headers.username).toLowerCase()
        const blog = (req.headers.blog).toLowerCase()
        const blogInputsForUpdate = updateBlogSchema.safeParse(req.body)

        if (!blogInputsForUpdate) {
            res.json({ message: "Invalid inputs / Try again" })
            return;
        }

        const findBlog = await blogCollection.findOne({ title: blog, author_username: username })

        if (!findBlog) {
            res.json({ message: "Cannot find your blog" })
            return;
        }

        await blogCollection.updateOne({ title: blog, author_username: username }, {
            title: blogInputsForUpdate.data.title ? (blogInputsForUpdate.data.title).toLowerCase() : findBlog.title,
            content: blogInputsForUpdate.data.content ? blogInputsForUpdate.data.content : findBlog.content
        })

        res.json({ message: "Blog updated" })


    } catch (err) {

        res.json({ message: "Error while updating your blog" })

    }


}

module.exports = update