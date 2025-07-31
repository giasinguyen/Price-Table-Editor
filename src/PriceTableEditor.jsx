import React, { useState, useRef } from 'react';
import { Edit2, Save, X, Plus, Trash2, Upload, Camera, Download } from 'lucide-react';

const PriceTableEditor = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Nước giặt cho bé BB ECO dạng can",
      image: null,
      specification: "3kg/can\n4 can/thùng",
      shopPrice: "135.000đ",
      retailPrice: "175.000đ"
    },
    {
      id: 2,
      name: "Nước giặt cho bé BB ECO dạng túi",
      image: null,
      specification: "1.2l/túi\n12 túi/thùng",
      shopPrice: "55.000đ",
      retailPrice: "75.000đ"
    },
    {
      id: 3,
      name: "Bánh ăn dặm Bidochi 5 vị",
      image: null,
      specification: "30gr/hộp\n20 hộp/thùng",
      shopPrice: "45.000đ",
      retailPrice: "65.000đ"
    },
    {
      id: 4,
      name: "Hồng yến Bidochi dạng túi",
      image: null,
      specification: "115ml/túi\n20 túi/hộp\n8 hộp/thùng",
      shopPrice: "20.000đ",
      retailPrice: "26.000đ"
    },
    {
      id: 5,
      name: "Hồng yến Bidochi dạng hũ 25%",
      image: null,
      specification: "18gr/hũ\n4 hũ/hộp\n20 hộp/thùng",
      shopPrice: "135.000đ",
      retailPrice: "170.000đ"
    },
    {
      id: 6,
      name: "Hồng yến Bidocare Cho người lớn",
      image: null,
      specification: "6 hũ/hộp\n100 hũ/thùng\nKèm vỏ hộp 6, hộp 9",
      shopPrice: "45.000đ",
      retailPrice: "60.000đ"
    },
    {
      id: 7,
      name: "Hồng yến Bidochi dạng hũ 30%",
      image: null,
      specification: "6 hũ/hộp\n100 hũ/thùng",
      shopPrice: "38.000đ",
      retailPrice: "50.000đ"
    }
  ]);

  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const fileInputRefs = useRef({});
  const tableRef = useRef(null);

  const startEdit = (productId, field, currentValue) => {
    setEditingCell(`${productId}-${field}`);
    setEditValue(currentValue);
  };

  const saveEdit = (productId, field) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, [field]: editValue }
        : product
    ));
    setEditingCell(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const addProduct = () => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const newProduct = {
      id: newId,
      name: "Sản phẩm mới",
      image: null,
      specification: "Quy cách mới",
      shopPrice: "0đ",
      retailPrice: "0đ"
    };
    setProducts([...products, newProduct]);
  };

  const handleImageUpload = (productId, event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProducts(products.map(product => 
          product.id === productId 
            ? { ...product, image: e.target.result }
            : product
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, image: null }
        : product
    ));
  };

  const triggerImageUpload = (productId) => {
    if (fileInputRefs.current[productId]) {
      fileInputRefs.current[productId].click();
    }
  };

  const exportToPNG = async () => {
    if (!tableRef.current) {
      alert('Không thể xuất bảng. Vui lòng thử lại.');
      return;
    }
    
    try {
      // Tạo canvas để vẽ bảng
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const table = tableRef.current;
      const rect = table.getBoundingClientRect();
      
      // Thiết lập kích thước canvas
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
      
      // Vẽ nền trắng
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // Vẽ tiêu đề
      ctx.fillStyle = '#16a34a'; // màu xanh green-600
      ctx.fillRect(0, 0, rect.width, 60);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('BẢNG BÁO GIÁ SẢN PHẨM', rect.width / 2, 35);
      
      // Tạo link download
      const link = document.createElement('a');
      link.download = `bang-bao-gia-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Xuất PNG thành công!');
      
    } catch (error) {
      console.error('Lỗi xuất PNG:', error);
      alert('Không thể xuất file PNG tự động. Vui lòng sử dụng tính năng chụp màn hình của trình duyệt (Ctrl+Shift+S hoặc Cmd+Shift+4) để lưu bảng báo giá.');
    }
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const EditableCell = ({ productId, field, value, multiline = false }) => {
    const cellKey = `${productId}-${field}`;
    const isEditing = editingCell === cellKey;

    if (isEditing) {
      return (
        <div className="flex items-center gap-2">
          {multiline ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 p-2 border rounded text-sm resize-none"
              rows={3}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 p-2 border rounded text-sm"
              autoFocus
            />
          )}
          <button
            onClick={() => saveEdit(productId, field)}
            className="p-1 text-green-600 hover:bg-green-100 rounded"
          >
            <Save size={16} />
          </button>
          <button
            onClick={cancelEdit}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
          >
            <X size={16} />
          </button>
        </div>
      );
    }

    return (
      <div
        className="group cursor-pointer p-2 rounded hover:bg-gray-50 relative"
        onClick={() => startEdit(productId, field, value)}
      >
        {multiline ? (
          <div className="whitespace-pre-line text-sm text-center">
            {value}
          </div>
        ) : (
          <div className="text-center font-medium text-green-700">
            {value}
          </div>
        )}
        <Edit2 
          size={14} 
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-50 text-gray-500"
        />
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Bảng Báo Giá Sản Phẩm</h1>
          <div className="flex gap-3">
            <button
              onClick={exportToPNG}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={20} />
              Xuất PNG
            </button>
            <button
              onClick={addProduct}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={20} />
              Thêm sản phẩm
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden" ref={tableRef}>
          <div className="grid grid-cols-6 bg-green-600 text-white font-bold">
            <div className="p-4 text-center border-r border-green-500">TÊN SẢN PHẨM</div>
            <div className="p-4 text-center border-r border-green-500">HÌNH ẢNH SẢN PHẨM</div>
            <div className="p-4 text-center border-r border-green-500">QUY CÁCH</div>
            <div className="p-4 text-center border-r border-green-500">GIÁ BÁN SHOP</div>
            <div className="p-4 text-center border-r border-green-500">GIÁ BÁN LẺ</div>
            <div className="p-4 text-center">THAO TÁC</div>
          </div>

          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`grid grid-cols-6 border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="p-4 border-r border-gray-200">
                <EditableCell
                  productId={product.id}
                  field="name"
                  value={product.name}
                />
              </div>
              
              <div className="p-4 border-r border-gray-200 flex justify-center items-center">
                <div className="relative">
                  {product.image ? (
                    <div className="relative group">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-28 h-28 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          onClick={() => triggerImageUpload(product.id)}
                          className="p-2 bg-blue-600 text-white rounded-full mr-2 hover:bg-blue-700 transition-colors"
                          title="Thay đổi hình ảnh"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => removeImage(product.id)}
                          className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
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
                        className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:border-blue-400 transition-all duration-200 group"
                      >
                        <Camera size={24} className="text-gray-500 group-hover:text-blue-500 mb-2 transition-colors" />
                        <Upload size={16} className="text-gray-400 group-hover:text-blue-400 mb-1 transition-colors" />
                        <span className="text-gray-500 group-hover:text-blue-600 text-xs text-center font-medium">Tải ảnh</span>
                      </div>
                      <button
                        onClick={() => triggerImageUpload(product.id)}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-green-700 transition-colors flex items-center gap-1"
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
              
              <div className="p-4 border-r border-gray-200">
                <EditableCell
                  productId={product.id}
                  field="specification"
                  value={product.specification}
                  multiline={true}
                />
              </div>
              
              <div className="p-4 border-r border-gray-200">
                <EditableCell
                  productId={product.id}
                  field="shopPrice"
                  value={product.shopPrice}
                />
              </div>
              
              <div className="p-4 border-r border-gray-200">
                <EditableCell
                  productId={product.id}
                  field="retailPrice"
                  value={product.retailPrice}
                />
              </div>

              <div className="p-4 flex justify-center">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="Xóa sản phẩm"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-gray-600 space-y-2">
          <p>💡 <strong>Hướng dẫn sử dụng:</strong></p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span>• Click vào ô bất kỳ để chỉnh sửa</span>
            <span>• Click vào khung ảnh để tải hình sản phẩm</span>
            <span>• Dùng nút "Xuất PNG" để lưu bảng báo giá</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTableEditor;