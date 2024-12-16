import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js";


const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        throw new Error(`Failed to connect to MongoDB: ${error}`);
        console.log(error);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
    connect();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//middlewares
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/hotels", hotelsRoute);

app.use((err, req, res, next) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, () => {
    connect();
    console.log('Server is running on port 8800');
});