<div align="center">

# ✨ Product Management App

### โมเดิร์นเว็บแอปพลิเคชันจัดการสินค้าสไตล์ Glassmorphism & Soft Pastel UI

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-v5-5A0EF8?logo=daisyui&logoColor=white)](https://daisyui.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

---

</div>

## 📖 สรุปภาพรวมของโปรเจกต์ (Project Overview)

**Product Management App** คือเว็บแอปพลิเคชันแบบ Full-stack สำหรับบริหารจัดการรายการสินค้า (CRUD) อย่างครบวงจร พัฒนาด้วยเทคโนโลยีทันสมัย ออกแบบ UI ด้วยคอนเซปต์ **Glassmorphism (กระจกโปร่งแสง)** ผสมผสานกับ **Soft Color Gradient (โทนสีพาสเทลละมุน)** และใช้ชุดสี **Light Theme** ของ **DaisyUI** พร้อมฟอนต์ภาษาไทย **Kanit** ทั่วทั้งระบบ

---

## 🌟 ฟีเจอร์เด่น (Key Features)

- 🛍️ **CRUD Operations เต็มรูปแบบ:**
  - สร้างสินค้าใหม่ (Create)
  - ดึงข้อมูลและค้นหารายการสินค้า (Read)
  - แก้ไขข้อมูลสินค้า (Update)
  - ลบสินค้าออกจากระบบ (Delete)
- 🖼️ **ระบบแนบลิงก์รูปภาพ (Image URL):**
  - แสดงตัวอย่างรูปภาพสด (Live Image Preview) ในขณะกรอกฟอร์ม
  - แสดงผลบนการ์ดสินค้าพร้อมเอฟเฟกต์รูปขยาย (Zoom on hover) และมี Fallback Placeholder เมื่อไม่มีรูป
- 🎵 **ระบบแนบไฟล์เสียง MP3 (Audio Support):**
  - รองรับทั้งการอัปโหลดไฟล์เสียง `.mp3` จากเครื่องคอมพิวเตอร์ และการวาง URL ลิงก์ตรง
  - มี Audio Preview ให้ฟังก่อนบันทึก
  - **ซ่อนอัตโนมัติบน Card:** การ์ดสินค้าที่ไม่มีการแนบไฟล์เสียงจะไม่แสดงแถบเครื่องเล่น ช่วยให้หน้าเว็บสะอาดตา
- 💎 **Glassmorphism & Soft Pastel UI:**
  - การ์ดกระจกโปร่งแสง เงาสะท้อนสวยงาม (`backdrop-blur-xl border border-white/80`)
  - โทนสีอ่อนสบายตา ไล่เฉดสีพาสเทลนุ่มนวล
- 🌼 **DaisyUI Light Theme & Kanit Font:**
  - ล็อกธีมสว่าง (`data-theme="light"`) สม่ำเสมอบนทุกหน้าจอ
  - ตัวอักษรภาษาไทยและอังกฤษคมชัด สวยงาม ด้วย Google Font **"Kanit"**
- 🔔 **DaisyUI Toast Alert & Confirmation Modal:**
  - แจ้งเตือนสถานะการทำงานด้วย Toast มุมขวาบน (Success / Error) ปิดตัวเองอัตโนมัติ
  - ยืนยันการลบสินค้าด้วย DaisyUI Modal สุดหรู แทนที่กล่องแจ้งเตือนเบราว์เซอร์แบบเดิม
- 🧭 **ระบบ Routing ด้วย React Router:**
  - แยกหน้าเพจอย่างเป็นสัดส่วน (`/`, `/add`, `/edit/:id`)
  - มีหน้า **404 Not Found** สไตล์ Glass UI

---

## 🏗️ โครงสร้างโปรเจกต์ (Project Structure)

```text
product-management-app/
├── backend/
│   ├── config/
│   │   └── database.js          # เชื่อมต่อ PostgreSQL และตั้งค่า Sequelize ORM
│   ├── controller/
│   │   └── productController.js # ควบคุมการทำงาน CRUD และจัดการข้อมูลสินค้า
│   ├── model/
│   │   └── productModel.js      # Sequelize Model กำหนดตาราง Products (id, name, price, desc, image, audio)
│   ├── router/
│   │   └── productRouter.js     # Express Router จัดการ Endpoints ตามมาตรฐาน RESTful
│   ├── .env                     # ตัวแปรสภาพแวดล้อมฝั่ง Backend
│   └── index.js                 # Entry point ของ Express Server
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductHeader.jsx # ส่วนหัวของหน้าเว็บและปุ่ม Add Product
│   │   │   └── ProductList.jsx   # รายการการ์ดสินค้าพร้อม Audio Player
│   │   ├── context/
│   │   │   └── ToastContext.jsx  # ระบบ Toast Notification (DaisyUI Alert)
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx    # Layout โครงสร้างหลักและพื้นหลัง Soft Color
│   │   ├── pages/
│   │   │   ├── ProductPage.jsx   # หน้าแสดงรายการสินค้าทั้งหมด
│   │   │   ├── AddProduct.jsx    # หน้าเพิ่มสินค้าใหม่
│   │   │   ├── EditProduct.jsx   # หน้าแก้ไขข้อมูลสินค้า
│   │   │   ├── ProductForm.jsx   # ฟอร์ม Reusable พร้อม Live Preview รูปภาพและเสียง
│   │   │   └── NotFound.jsx      # หน้าแจ้งเตือน 404 Page Not Found
│   │   ├── App.jsx               # การตั้งค่า Route (BrowserRouter, Routes, Route)
│   │   ├── index.css             # นำเข้า Tailwind, DaisyUI และตั้งค่าฟอนต์ Kanit
│   │   └── main.jsx
│   ├── index.html                # ติดตั้งฟอนต์ Kanit และ data-theme="light"
│   └── vite.config.js
│
├── docker-compose.yml           # ไฟล์คอนฟิก Docker รัน Postgres, Backend และ Frontend
└── README.md
```

---

## 🔌 รายการ API Endpoints (Backend RESTful APIs)

| Method | Endpoint | คำอธิบาย |
| :--- | :--- | :--- |
| **GET** | `/api/products` หรือ `/products` | ดึงรายการสินค้าทั้งหมด |
| **GET** | `/api/products/:id` หรือ `/products/:id` | ดึงข้อมูลสินค้าเฉพาะรายการตาม ID |
| **POST** | `/api/products` หรือ `/products` | เพิ่มสินค้าใหม่เข้าสู่ระบบ |
| **PUT** | `/api/products/:id` หรือ `/products/:id` | แก้ไขข้อมูลสินค้าเดิมตาม ID |
| **DELETE** | `/api/products/:id` หรือ `/products/:id` | ลบสินค้าออกจากระบบตาม ID |

---

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Getting Started)

### วิธีที่ 1: รันผ่าน Docker (แนะนำ สะดวกที่สุด) 🐳

1. เปิด Terminal ในโฟลเดอร์โปรเจกต์หลัก
2. รันคำสั่งเปิดบริการทั้งหมด:
   ```bash
   docker compose up -d
   ```
3. เข้าใช้งานระบบ:
   - **Frontend (Web App):** [http://localhost:5173](http://localhost:5173)
   - **Backend API:** [http://localhost:5000](http://localhost:5000)
   - **PostgreSQL Database:** พอร์ต `5433`

---

### วิธีที่ 2: รันแบบ Manual (Local Environment) 💻

#### 1. ฝั่ง Backend
```bash
cd backend
npm install
npm run dev
```
*(Backend จะรันที่พอร์ต `5000`)*

#### 2. ฝั่ง Frontend
```bash
cd frontend
npm install
npm run dev
```
*(Frontend จะรันที่พอร์ต `5173`)*

---

## ⚙️ ตัวแปรสภาพแวดล้อม (Environment Variables)

ไฟล์ `.env` ที่โฟลเดอร์หลัก:
```env
# Neon Database (Cloud PostgreSQL)
DATABASE_URL=postgresql://neondb_owner:***@ep-super-rice-azbds6yf-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require

# Local Database (Fallback)
POSTGRES_USER=dev_user
POSTGRES_PASSWORD=dev_password
POSTGRES_DB=product_db
POSTGRES_PORT=5433

# Backend
NODE_ENV=development
BACKEND_PORT=5000

# Frontend
VITE_API_URL=http://localhost:5000
FRONTEND_PORT=5173
```

---

<div align="center">

จัดทำและพัฒนาด้วย ❤️ โดยมุ่งเน้น UX/UI ที่สวยงาม สะอาดตา และโครงสร้างโค้ดที่ถูกต้องตามมาตรฐาน

</div>
