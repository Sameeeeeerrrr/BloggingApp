const express = require("express");
const create = require("../Controllers/services/create");
const update = require("../Controllers/services/update");
const remove = require("../Controllers/services/remove");
const myBlogs = require("../Controllers/services/myBlogs");
const allBlogs = require("../Controllers/services/allBlogs");
const search = require("../Controllers/services/search");
const auth = require("../Middlewares/Authentication");
const router = express.Router()

router.post("/create",auth, create)
router.put("/update",auth, update)
router.get("/myblogs",auth, myBlogs)
router.delete("/remove",auth, remove)
router.get("/allBlogs",auth, allBlogs)
router.get("/search",auth, search)

module.exports = router