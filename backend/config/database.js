import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Initialize Sequelize with DATABASE_URL and SSL dialectOptions for Neon DB on Render
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      },
    );

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL (Neon DB) successfully!");
    await sequelize.sync({
      alter: process.env.NODE_ENV === "development",
    });
    console.log("Table Synchronized!");
  } catch (error) {
    console.error("Connection failed", error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
