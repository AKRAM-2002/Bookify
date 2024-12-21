import Hotel from "../models/Hotel.js";
import createError from "../utils/error.js";

// CREATE
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
};

// UPDATE
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    } catch (err) {
        next(err);
    }
};

// GET
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
};

// GET ALL

export const getAllHotels = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;

    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { 
                $gte: min ? parseInt(min) : 1, 
                $lte: max ? parseInt(max) : 999 
            },
        })
        .limit(limit ? parseInt(limit) : 0); // Ensure 'limit' is converted to a number

        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};


export const countByCity = async (req, res, next) => {

    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    const luxuryCount = await Hotel.countDocuments({ type: "Luxury" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
      { type: "luxury", count: luxuryCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getCities = async (req, res, next) => {
  try {
    const cities = await Hotel.distinct("city");
    res.status(200).json(cities);
  } catch (err) {
    next(err);
  }
};
 