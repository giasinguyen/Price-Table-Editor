import React from 'react';
import { Camera, Upload, Edit2, X } from 'lucide-react';

const ImageCell = ({ 
  product, 
  fileInputRefs, 
  handleImageUpload, 
  triggerImageUpload, 
  removeImage 
}) => {
  return (
    <div className="p-4 border-r border-gray-200 flex justify-center items-center">
      <div className="relative">
        {product.image ? (
          <div className="relative group">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-48 h-40 object-cover rounded-xl border-2 border-gray-200 shadow-lg transform transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              <button
                onClick={() => triggerImageUpload(product.id)}
                className="p-2 bg-blue-600 text-white rounded-full mr-2 hover:bg-blue-700 transition-colors transform hover:scale-110"
                title="Thay đổi hình ảnh"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => removeImage(product.id)}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors transform hover:scale-110"
                title="Xóa hình ảnh"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div
              onClick={() => triggerImageUpload(product.id)}
              className="w-48 h-40 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:border-blue-400 transition-all duration-200 group transform hover:scale-105"
            >
              <Camera size={28} className="text-gray-500 group-hover:text-blue-500 mb-2 transition-colors" />
              <Upload size={18} className="text-gray-400 group-hover:text-blue-400 mb-1 transition-colors" />
              <span className="text-gray-500 group-hover:text-blue-600 text-xs text-center font-medium">Tải ảnh</span>
            </div>
            <button
              onClick={() => triggerImageUpload(product.id)}
              className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 text-white text-xs rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-1 transform hover:scale-105"
            >
              <Upload size={12} />
              Chọn ảnh
            </button>
          </div>
        )}
        <input
          ref={el => fileInputRefs.current[product.id] = el}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={(e) => handleImageUpload(product.id, e)}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageCell;
