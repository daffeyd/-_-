import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkIsUserAuthenticated = async (req, res,next) => {
  const {email, token} = req.body;
  if (email && token) {
    try {
      // verify token
      const { userID } = jwt.verify(token, email + process.env.JWTPRIVATEKEY);
      // Get User from Token
      req.user = await authModel.findById(userID).select("--password"); 
      if (req.user){
        next();
      }
    } catch (error) {
      return res.status(401).json({ message: "unAuthorized User" });
    }
  } else {
    return res.status(401).json({ message: "unAuthorized User" });
  }
};

export default checkIsUserAuthenticated;
