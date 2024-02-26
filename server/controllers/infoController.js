import authModel from "../models/authModel.js";
import Token from "../models/token.js";
import Locker from "../models/lockerModel.js";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendEmailtoUser } from "../config/EmailTemplate.js";

class authController {
    static async homeInfoUpdate(req, res) {
        const { email, token } = req.body;

        try {
            if (!email || !token) {
                return res.status(400).json({ message: "Email and token are required" });
            }

            const secretKey = `${email}${process.env.JWTPRIVATEKEY}`;
            const decoded = await jwt.verify(token, secretKey);

            if (!decoded) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const user = await authModel.findById(decoded.userID).select("-password");

            if (!user || user.email !== email) {
                return res.status(400).json({ message: "User not found" });
            }

            return res.status(200).json({
                message: "Updated data fetched successfully!",
                lockerId: user.locker.lockerId,
                lockerNumber: user.locker.lockerNumber,
                rfid: user.rfid,
                tutorial: user.tutorial,
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }


    static lockerStatusInfoUpdate = async (req, res) => {
        const { lockerRoomLoc } = req.body;
        try {
            const locker = await Locker.findOne({ lockerRoomLoc: lockerRoomLoc });
            let statusString = '';
            for (let i = 1; i <= 8; i++) {
                statusString += locker.lockerStatus[i].status === 'empty' ? '0' : '1'
            }


            res.json({ status: statusString });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static lockerTimeLimitInfoUpdate = async (req, res) => {
        const { email, token } = req.body;

        try {
            if (!email || !token) {
                return res.status(400).json({ message: "Email and token are required" });
            }

            const secretKey = `${email}${process.env.JWTPRIVATEKEY}`;
            const decoded = await jwt.verify(token, secretKey);

            if (!decoded) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const user = await authModel.findById(decoded.userID).select("-password");

            if (!user || user.email !== email) {
                return res.status(400).json({ message: "User not found" });
            }

            return res.status(200).json({
                message: "Updated data fetched successfully!",
                lockerExpiredDate: user.locker.lockerExpiredDate
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }





}
export default authController;
