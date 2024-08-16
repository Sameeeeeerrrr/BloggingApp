const blogCollection = require("../../Models/services");

const search = async (req, res) => {
    try {
        const searchedQuery = (req.query.q).toLowerCase();

        const findSearchedQuery = await blogCollection.find({
            $or: [{
                title: {
                    "$regex": searchedQuery
                }
            }, {
                author_username: {
                    "$regex": searchedQuery
                }
            }, {
                author: {
                    "$regex": searchedQuery
                }
            }]
        })

        if (!findSearchedQuery) {
            res.json({ message: "Doesn't exists" })
            return;
        }

        res.json({
            Result: findSearchedQuery.map(item => ({
                title: item.title,
                content: item.content,
                author: item.author,
                date: item.date,
                blog_id: item._id
            }))
        })

    } catch (err) {
        
        res.json({message : "Error while finding 'search' item"})

    }

}

module.exports = search