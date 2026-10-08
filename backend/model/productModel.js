import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // เก็บ URL ลิงก์รูปภาพเป็น String (เช่น https://example.com/image.jpg)
  // กำหนด allowNull: true คือไม่ต้องใส่รูปภาพก็ได้
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // เก็บ URL หรือ Base64 ของไฟล์เสียง mp3
  // allowNull: true คือถ้าไม่มีการแนบไฟล์เสียง จะเป็น null
  audio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Product;
