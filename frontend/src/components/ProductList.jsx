import React from "react";
import { Edit2, Trash2, ImageOff, Volume2 } from "lucide-react";

const ProductList = ({ products, onEditClick, onDeleteClick }) => {
  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-16 bg-base-100/70 backdrop-blur-xl border border-white/80 rounded-3xl shadow-lg">
        <p className="text-xl text-base-content/70 font-medium">
          No products found. Start by adding one!
        </p>
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="aura aura-rainbow">
          <div className="card bg-base-100">
            <div className="bg-base-100/75 backdrop-blur-xl border border-white/80 shadow-xl rounded-3xl overflow-hidden hover:bg-base-100/90 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between">
              <div>
                <div className="h-48 relative overflow-hidden bg-base-200/50">
                  {/* ตรวจสอบว่ามีค่า product.image หรือไม่ */}
                  {product.image ? (
                    /* กรณีมีลิงก์รูปภาพ: นำ URL ไปใส่ในแท็ก <img> เพื่อแสดงผล */
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    /* กรณีไม่มีลิงก์รูปภาพ: แสดง Placeholder Icon แทน */
                    <div className="w-full h-full flex flex-col items-center justify-center text-base-content/40">
                      <ImageOff className="w-12 h-12 stroke-[1.5]" />
                      <span className="text-xs mt-1 font-medium">No Image</span>
                    </div>
                  )}
                  {/* DaisyUI Badge แสดงราคา */}
                  <div className="absolute top-3 right-3 badge badge-success text-white text-shadow-2xs font-bold shadow-md px-3 py-3 text-sm">
                    ฿{Number(product.price).toLocaleString()}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-base-content mb-2 truncate">
                    {product.name}
                  </h2>
                  <p className="text-sm text-base-content/70 mb-2 h-10 overflow-hidden line-clamp-2">
                    {product.description || "No description provided."}
                  </p>

                  {/* ส่วนเล่นไฟล์เสียง: แสดงเฉพาะเมื่อมีการแนบไฟล์เสียง audio เท่านั้น */}
                  {product.audio && (
                    <div className="mt-3 p-2.5 bg-base-200/50 rounded-2xl border border-base-300/60 backdrop-blur-md">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1.5">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Audio Clip</span>
                      </div>
                      <audio
                        controls
                        className="w-full h-8 rounded-lg"
                        src={product.audio}
                      >
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 pb-5 pt-0 flex gap-2 justify-end border-t border-base-200/50 pt-3">
                <button
                  onClick={() => onEditClick(product)}
                  className="btn btn-sm btn-ghost hover:bg-base-200 text-info font-medium rounded-xl border border-info/30 transition-all cursor-pointer"
                >
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </button>
                <button
                  onClick={() => onDeleteClick(product.id)}
                  className="btn btn-sm btn-ghost hover:bg-error/10 text-error font-medium rounded-xl border border-error/30 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
