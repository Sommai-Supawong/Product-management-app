import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

let sequelize;

if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes("neon.tech")) {
  // สำหรับ Neon PostgreSQL: ใช้ @neondatabase/serverless ผ่าน WebSocket (พอร์ต 443)
  // ช่วยแก้ปัญหาการเชื่อมต่อไม่ติด (ETIMEDOUT) เมื่อถูกไฟร์วอลล์บล็อกพอร์ต 5432
  const neon = await import("@neondatabase/serverless");
  const ws = (await import("ws")).default;
  neon.neonConfig.webSocketConstructor = ws;

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectModule: neon,
    logging: false,
  });
} else if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // สำหรับ Local Docker PostgreSQL (พอร์ต 5432)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      logging: false,
      dialectOptions:
        process.env.DB_SSL === "true"
          ? {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            }
          : {},
    },
  );
}

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
