import jwt from "jsonwebtoken";
import userSchema from "../models/user.js";


// Middleware to protect routes (requires login)
const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Not authorized. Try login again."
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userSchema.findById(decodedToken.userId).select("isAdmin email");

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found. Try login again."
      });
    }

    req.user = {
      email: user.email,
      isAdmin: user.isAdmin,
      userId: decodedToken.userId
    };
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: false,
      message: "Not authorized. Try login again."
    });
  }
};

// Middleware to check admin access
const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin."
    });
  }
};

export { protectRoute, isAdminRoute };