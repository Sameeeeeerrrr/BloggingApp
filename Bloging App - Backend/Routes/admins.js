const express = require("express");
const authorization = require("../Middlewares/Authorization");
const allUsers = require("../Controllers/admins/allUsers");
const removeBlog = require("../Controllers/admins/removeBlog");
const removeUser = require("../Controllers/admins/removeUser");
const auth = require("../Middlewares/Authentication");
const router = express.Router()

router.delete("/removeBlog", auth, authorization, removeBlog)
router.delete("/removeUser", auth, authorization, removeUser)
router.get("/allUsers", auth, authorization, allUsers)


module.exports = router