const userCollection = require("../../Models/users")

const allUsers = async (req,res)=>{

    try{

    const Users = await userCollection.find({})

    if(!Users){
        res.json({message : "Cannot find"})
        return
    }
    
    res.json({Users : Users.map(item => ({
        Name : `${item.firstName} ${item.lastName}`,
        Username : item.username,
        IsAdmin : item.isAdmin
    }))})

    }catch(err){

        res.json({message : "Error while getting all users"})
    }

    
}

module.exports = allUsers