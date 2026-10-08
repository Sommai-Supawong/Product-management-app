import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div
      data-theme="light"
      className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 text-base-content font-sans p-4 md:p-8 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        {/* Child routes render here */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
