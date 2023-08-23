import express from "express";
import infoController from "../controllers/infoController.js";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/user/home", infoController.homeInfoUpdate);


export default router;
