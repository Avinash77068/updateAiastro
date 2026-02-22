// 

const express = require("express");
const router = express.Router();
const { getUserSidebar, createUserSidebar } = require("../../controllers/user/userSidebarController");

router.get("/", getUserSidebar);
router.post("/create", createUserSidebar);

module.exports = router;