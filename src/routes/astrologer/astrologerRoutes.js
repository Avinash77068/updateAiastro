const express = require("express");
const router = express.Router();
const { getAstrologerData, createAstrologerData } = require("../../controllers/astrologer/astrologerControllers");

router.get("/", getAstrologerData);
router.post("/create", createAstrologerData);

module.exports = router;