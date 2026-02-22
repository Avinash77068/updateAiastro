const express = require("express");
const router = express.Router();
const { getHomePageData, createHomePageData } = require("../../controllers/homepage/homePageControllers");

router.get("/", getHomePageData);
router.post("/create", createHomePageData);
module.exports = router;