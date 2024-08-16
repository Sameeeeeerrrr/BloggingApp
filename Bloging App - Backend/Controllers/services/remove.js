const blogCollection = require("../../Models/services");

const remove = async (req, res) => {
    try {

        const username = (req.headers.username).toLowerCase();
        const blog = (req.headers.blog).toLowerCase();

        const findBlog = await blogCollection.findOne({ title: blog, author_username: username })

        if (!findBlog) {
            res.json({ message: "Cannot find your blog" })
            return;
        }

        await blogCollection.deleteOne({ _id: findBlog._id })
            .then(() => { res.json({ message: "Blog deleted" }) })
        

    } catch (err) {

        console.log(err)
        res.json({ message: "Error while deleting your blog" })

    }

}

module.exports = remove