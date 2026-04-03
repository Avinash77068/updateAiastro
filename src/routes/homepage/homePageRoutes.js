import express from "express";
const router = express.Router();
import { getHomePageData, createHomePageData } from "../../controllers/homepage/homePageControllers.js";

router.get("/", getHomePageData);
router.post("/create", createHomePageData);
export default router;