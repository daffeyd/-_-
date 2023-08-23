import express from "express";
import authController from "../controllers/authController.js";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/users/register", authController.userRegistration);
router.post("/users/login", authController.userLogin);

// Forget Password

router.post("/forget-password", authController.forgetPassword);
router.post("/forget-password/:id/:token", authController.forgetPasswordEmail);

// Email Verification

router.get("/:id/verify/:token/", authController.saveVerifiedEmail);

// Protected Routes

router.post(
  "/change-password",
  checkIsUserAuthenticated,
  authController.changePassword
);
router.post(
  "/secured-route",
  checkIsUserAuthenticated, 
  (req, res) => res.status(200).json({ message: 'Access granted' })
);
export default router;
