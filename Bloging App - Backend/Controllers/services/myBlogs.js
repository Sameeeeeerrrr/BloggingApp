const blogCollection = require("../../Models/services");

const myBlogs = async (req, res) => {
    try {

        const username = (req.query.username).toLowerCase();

        const Blogs = await blogCollection.find({ author_username: username })

        if (!Blogs) {
            res.json({ message: "Cannot find your blogs" })
            return;
        }

        res.json({
            MyBlogs: Blogs.map(item => ({
                title: item.title,
                content: item.content,
                author: item.author,
                date: item.date,
                blog_id : item._id
            }))
        })

    } catch (err) {

        res.json({ message: "Error while getting your blogs" })

    }

}

module.exports = myBlogs