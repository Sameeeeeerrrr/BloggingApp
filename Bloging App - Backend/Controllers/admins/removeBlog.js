const blogCollection = require("../../Models/services");
const userCollection = require("../../Models/users");

const removeBlog = async (req, res) => {
    try {

        const blog_id = req.headers.blog_id;

        const findblog = await blogCollection.findOne({ _id: blog_id })

        if (!findblog) {
            res.json({ message: "Cannot find / doesn't exists" })
            return;
        }

        //checking if the blog is posted by admin
        const isAdminsBlog = await userCollection.findOne({ username: findblog.author_username })

        if (isAdminsBlog.isAdmin) {
            res.json({ message: "Cannot remove an admin's blog" })
            return;
        }

        await blogCollection.deleteOne({ _id: blog_id })
            .then(() => { res.json({ message: "Blog removed successfully" }) })


    } catch (err) {

        res.json({ message: "Error while removing the blog" })

    }
}

module.exports = removeBlog