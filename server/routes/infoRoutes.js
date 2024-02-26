import express from "express";
import infoController from "../controllers/infoController.js";
const router = express.Router();

router.post("/user/home", infoController.homeInfoUpdate);
router.post("/locker/status", infoController.lockerStatusInfoUpdate);
router.post("/locker/timelimit", infoController.lockerTimeLimitInfoUpdate);

export default router;
