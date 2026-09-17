import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Import ปลั๊กอินเข้ามา

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. ใส่ฟังก์ชันลงในอาเรย์ plugins
  ],
})
