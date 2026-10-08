import React from "react";
import { PackageSearch, Plus } from "lucide-react";

const ProductHeader = ({ onAddClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-base-100/70 backdrop-blur-xl border border-white/80 shadow-xl rounded-2xl p-6 mb-8 transition-all">
      <h1 className="text-3xl font-extrabold text-base-content drop-shadow-sm mb-4 md:mb-0 flex items-center gap-3">
        <PackageSearch className="w-9 h-9 text-black" /> Product Management
      </h1>
      <button
        className="btn btn-primary rounded-full px-6 shadow-md hover:shadow-xl hover:scale-105 transition-all text-primary-content border-none"
        onClick={onAddClick}
      >
        <Plus className="w-5 h-5 mr-1" /> Add Product
      </button>
    </div>
  );
};

export default ProductHeader;
