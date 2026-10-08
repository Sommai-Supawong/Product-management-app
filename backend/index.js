import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import productRouter from "./router/productRouter.js";

// .env อยู่ข้างนอก
dotenv.config();

const PORT = process.env.BACKEND_PORT;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDB();
app.get("/", (req, res) => {
  return res.status(200).send("<h>Hello</h>");
});

app.use("/api/products", productRouter);
app.use("/products", productRouter); // รองรับการเรียกผ่าน /products ตรงๆ ได้ด้วย

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
