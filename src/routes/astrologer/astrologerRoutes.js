import express from "express";
const router = express.Router();
import { getAstrologerData, createAstrologerData } from "../../controllers/astrologer/astrologerControllers.js";

router.get("/", getAstrologerData);
router.post("/create", createAstrologerData);

export default router;