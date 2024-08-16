const blogCollection = require("../../Models/services")

const allBlogs = async (req, res) => {

    const allblogs = await blogCollection.find({})

    res.json({
        Blogs: allblogs.map(item => ({
            title: item.title,
            content: item.content,
            author: item.author,
            date: item.date,
            blog_id : item._id
        }))
    })
}

module.exports = allBlogs