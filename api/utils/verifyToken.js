import jwt from "jsonwebtoken";
import createError  from "../utils/error.js";

// Verify if user is authenticated
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
    })
}


// Verify if user is the owner or an admin
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(`Authenticated user ID: ${req.user.id}`);
    console.log(`Target user ID: ${req.params.id}`);
    console.log(`Is Admin: ${req.user.isAdmin}`);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// Verify if user is an admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};