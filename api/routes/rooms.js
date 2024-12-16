import express from "express";
import {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getAllRooms,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE ROOM (Admin only)
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE ROOM (Admin only)
router.put("/:id", verifyAdmin, updateRoom);

// DELETE ROOM (Admin only)
router.delete("/:id", verifyAdmin, deleteRoom);

// GET ROOM (Public)
router.get("/:id", getRoom);

// GET ALL ROOMS (Public)
router.get("/", getAllRooms);

export default router;
