const express = require("express");
const signup = require("../Controllers/users/signup");
const login = require("../Controllers/users/login");
const update = require("../Controllers/users/update");
const remove = require("../Controllers/users/remove");
const auth = require("../Middlewares/Authentication");
const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.put("/update",auth, update)
router.delete("/remove",auth, remove)

module.exports = router