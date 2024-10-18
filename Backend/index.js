import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";

//        MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'https://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));


const PORT = process.env.PORT || 8080;

//api's
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`app is listening on PORT ${PORT}`);   
})