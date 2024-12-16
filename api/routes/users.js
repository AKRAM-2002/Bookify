import express from "express";
import { 
    updateUser, 
    deleteUser, 
    getUser, 
    getAllUsers 
} from "../controllers/userController.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next) =>{
//     res.send("hello user, you are authenticated!")
// });

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
//  })

//  router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//    res.send("hello admin, you are logged in and you can delete your account")
//   })

// UPDATE USER
router.put("/:id",verifyUser, updateUser);

// DELETE USER
router.delete("/:id", verifyUser, deleteUser);

// GET USER
router.get("/:id", verifyAdmin, getUser);

// GET ALL USERS
router.get("/", verifyAdmin, getAllUsers);

export default router;
