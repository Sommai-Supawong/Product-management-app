import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="bg-base-100/80 backdrop-blur-2xl border border-white/80 shadow-2xl rounded-3xl p-10 max-w-md w-full">
        <div className="w-16 h-16 bg-error/10 text-error rounded-2xl flex items-center justify-center mx-auto mb-4 border border-error/20">
          <AlertCircle className="w-9 h-9" />
        </div>
        <h1 className="text-5xl font-black text-base-content mb-2">404</h1>
        <h2 className="text-xl font-bold text-base-content/80 mb-2">Page Not Found</h2>
        <p className="text-base-content/60 mb-6 text-sm">
          ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา หรือหน้านี้อาจถูกย้ายไปแล้ว
        </p>
        <Link
          to="/"
          className="btn btn-primary w-full rounded-xl shadow-md text-primary-content gap-2"
        >
          <Home className="w-5 h-5" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
