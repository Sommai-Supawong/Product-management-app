import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({path: "../.env"});


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).send("welcome to product management app");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

