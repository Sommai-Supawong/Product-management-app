import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Music, Volume2, Upload, Trash2 } from "lucide-react";

const ProductForm = ({
  title,
  buttonText,
  formData,
  handleChange,
  handleSubmit,
  loading = false,
}) => {
  const fileInputRef = useRef(null);

  // รองรับการอัปโหลดไฟล์เสียง .mp3 จากเครื่องแล้วแปลงเป็น Data URL
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.includes("audio") && !file.name.endsWith(".mp3")) {
      alert("กรุณาเลือกไฟล์เสียง .mp3 หรือไฟล์ประเภท Audio เท่านั้น");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      handleChange({
        target: {
          name: "audio",
          value: reader.result,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleClearAudio = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    handleChange({
      target: {
        name: "audio",
        value: "",
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header bar with Back button */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="btn btn-sm btn-ghost bg-base-100/70 hover:bg-base-100 border border-white/80 backdrop-blur-md shadow-sm rounded-xl text-base-content gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* Glass Form Card with DaisyUI tokens */}
      <div className="bg-base-100/80 backdrop-blur-2xl border border-white/80 shadow-2xl rounded-3xl p-8 transition-all">
        <h2 className="text-2xl font-extrabold text-base-content mb-6 drop-shadow-sm flex items-center gap-2">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-base-content/80 text-sm font-semibold mb-1">
              Product Name <span className="text-error">*</span>
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Noise Canceling Headphones"
              className="input input-bordered w-full bg-base-100/60 border-base-300 focus:input-primary rounded-xl backdrop-blur-md text-base-content placeholder:text-base-content/40"
            />
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-base-content/80 text-sm font-semibold mb-1">
              Price (฿) <span className="text-error">*</span>
            </label>
            <input
              required
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="input input-bordered w-full bg-base-100/60 border-base-300 focus:input-primary rounded-xl backdrop-blur-md text-base-content placeholder:text-base-content/40"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-base-content/80 text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe the product details, features, etc."
              className="textarea textarea-bordered w-full bg-base-100/60 border-base-300 focus:textarea-primary rounded-xl backdrop-blur-md resize-none text-base-content placeholder:text-base-content/40"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-base-content/80 text-sm font-semibold mb-1">
              Image URL (แนบลิงก์รูปภาพ)
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="input input-bordered w-full bg-base-100/60 border-base-300 focus:input-primary rounded-xl backdrop-blur-md text-base-content placeholder:text-base-content/40"
            />
          </div>

          {/* Live Image Preview */}
          {formData.image && (
            <div className="p-3 bg-base-200/50 border border-base-300/50 rounded-2xl backdrop-blur-md">
              <span className="block text-xs font-semibold text-base-content/70 mb-2">
                Preview Image:
              </span>
              <div className="h-44 rounded-xl overflow-hidden bg-base-200 flex items-center justify-center">
                <img
                  src={formData.image}
                  alt="Preview"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Audio Input Section (แนบไฟล์เสียง .mp3 หรือใส่ลิงก์ URL) */}
          <div className="pt-2">
            <label className="block text-base-content/80 text-sm font-semibold mb-1 flex items-center gap-1.5">
              <Music className="w-4 h-4 text-primary" /> แนบไฟล์เสียง (Audio .mp3)
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="audio"
                  value={formData.audio || ""}
                  onChange={handleChange}
                  placeholder="วางลิงก์ไฟล์เสียง (https://...mp3) หรือเลือกไฟล์ด้านขวา"
                  className="input input-bordered flex-1 bg-base-100/60 border-base-300 focus:input-primary rounded-xl backdrop-blur-md text-base-content placeholder:text-base-content/40 text-sm"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-outline btn-primary rounded-xl gap-1.5 px-4 cursor-pointer"
                >
                  <Upload className="w-4 h-4" /> เลือกไฟล์ MP3
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/mp3,audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
              </div>

              {/* Live Audio Preview (แสดงเมื่อมีการแนบไฟล์เสียงเท่านั้น) */}
              {formData.audio && (
                <div className="p-3.5 bg-base-200/50 border border-base-300/60 rounded-2xl backdrop-blur-md animate-in fade-in duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4" /> Audio Preview (ตัวอย่างเสียง):
                    </span>
                    <button
                      type="button"
                      onClick={handleClearAudio}
                      className="btn btn-ghost btn-xs text-error gap-1 hover:bg-error/10 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> ลบไฟล์เสียง
                    </button>
                  </div>
                  <audio
                    controls
                    className="w-full h-9 rounded-lg"
                    src={formData.audio}
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-base-200">
            <Link
              to="/"
              className="btn btn-ghost bg-base-100/70 hover:bg-base-200 rounded-xl border border-base-300 text-base-content font-medium px-5"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary rounded-xl px-6 shadow-md hover:shadow-xl text-primary-content border-none font-semibold transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                buttonText
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
