import express from "express";
import {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getAllHotels,
    countByCity, countByType,
    getCities
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET
router.get("/find/:id", getHotel);

// GET ALL
router.get("/", getAllHotels);

router.get("/countByCity",  countByCity);
router.get("/countByType", countByType);

//Fetch unique cities
router.get("/unique-cities", getCities)
export default router;
