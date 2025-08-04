import React, { useState, useRef, useEffect } from 'react';
import { Plus, Download, Save as SaveIcon, Trash2, RefreshCw } from 'lucide-react';
import ProductRow from './components/ProductRow';
import { exportToPNG } from './utils/pngExporter';
import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage } from './utils/localStorage';

const PriceTableEditor = () => {
  // Default products data
  const defaultProducts = [
    {
      id: 1,
      name: "Nước giặt cho bé BB ECO dạng can",
      image: null,
      specification: "3kg/can\n4 can/thùng",
      shopPrice: "135.000đ",
      retailPrice: "175.000đ",
      discount: "10%\nMua 5 thùng trở lên\nGiảm thêm 2%"
    },
    {
      id: 2,
      name: "Nước giặt cho bé BB ECO dạng túi",
      image: null,
      specification: "1.2l/túi\n12 túi/thùng",
      shopPrice: "55.000đ",
      retailPrice: "75.000đ",
      discount: "15%\nKhuyến mãi tháng"
    },
    {
      id: 3,
      name: "Bánh ăn dặm Bidochi 5 vị",
      image: null,
      specification: "30gr/hộp\n20 hộp/thùng",
      shopPrice: "45.000đ",
      retailPrice: "65.000đ",
      discount: "20%\nGiá sốc cuối năm"
    },
    {
      id: 4,
      name: "Hồng yến Bidochi dạng túi",
      image: null,
      specification: "115ml/túi\n20 túi/hộp\n8 hộp/thùng",
      shopPrice: "20.000đ",
      retailPrice: "26.000đ",
      discount: "12%\nHàng mới về"
    },
    {
      id: 5,
      name: "Hồng yến Bidochi dạng hũ 25%",
      image: null,
      specification: "18gr/hũ\n4 hũ/hộp\n20 hộp/thùng",
      shopPrice: "135.000đ",
      retailPrice: "170.000đ",
      discount: "18%\nSản phẩm cao cấp\nBảo hành chất lượng"
    },
    {
      id: 6,
      name: "Hồng yến Bidocare Cho người lớn",
      image: null,
      specification: "6 hũ/hộp\n100 hũ/thùng\nKèm vỏ hộp 6, hộp 9",
      shopPrice: "45.000đ",
      retailPrice: "60.000đ",
      discount: "25%\nGiảm giá đặc biệt\nMua nhiều giảm nhiều"
    },
    {
      id: 7,
      name: "Hồng yến Bidochi dạng hũ 30%",
      image: null,
      specification: "6 hũ/hộp\n100 hũ/thùng",
      shopPrice: "38.000đ",
      retailPrice: "50.000đ",
      discount: "22%\nSản phẩm bán chạy"
    }
  ];

  const [products, setProducts] = useState(defaultProducts);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const fileInputRefs = useRef({});
  const tableRef = useRef(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProducts = loadFromLocalStorage();
    if (savedProducts && savedProducts.length > 0) {
      setProducts(savedProducts);
      setLastSaved(new Date());
    }
  }, []);

  // Auto-save to localStorage when products change
  useEffect(() => {
    if (products.length > 0) {
      const saved = saveToLocalStorage(products);
      if (saved) {
        setLastSaved(new Date());
      }
    }
  }, [products]);

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
      retailPrice: "0đ",
      discount: "0%\nChiết khấu mới"
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

  const handleExportToPNG = async () => {
    try {
      await exportToPNG(products);
      alert('Xuất bảng báo giá PNG thành công!');
    } catch (error) {
      console.error('Lỗi xuất PNG:', error);
      alert('Có lỗi xảy ra khi xuất file PNG. Vui lòng thử lại.');
    }
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const resetToDefault = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục dữ liệu mặc định? Tất cả thay đổi sẽ bị mất.')) {
      setProducts(defaultProducts);
      clearLocalStorage();
      setLastSaved(null);
    }
  };

  const manualSave = () => {
    const saved = saveToLocalStorage(products);
    if (saved) {
      setLastSaved(new Date());
      alert('Đã lưu dữ liệu thành công!');
    } else {
      alert('Có lỗi khi lưu dữ liệu!');
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header công ty */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 rounded-t-xl shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">OANH NGUYỄN</h1>
            <p className="text-blue-100 text-lg">Phân phối bỉm sữa chất lượng cao</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-b-xl shadow-lg border-t-4 border-green-500">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Bảng Báo Giá Sản Phẩm</h2>
            {lastSaved && (
              <p className="text-sm text-gray-500 mt-1">
                Lần lưu cuối: {lastSaved.toLocaleString('vi-VN')}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={manualSave}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg transform hover:scale-105"
            >
              <SaveIcon size={18} />
              Lưu dữ liệu
            </button>
            <button
              onClick={resetToDefault}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg transform hover:scale-105"
            >
              <RefreshCw size={18} />
              Reset
            </button>
            <button
              onClick={handleExportToPNG}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg transform hover:scale-105"
            >
              <Download size={20} />
              Xuất PNG
            </button>
            <button
              onClick={addProduct}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg transform hover:scale-105"
            >
              <Plus size={20} />
              Thêm sản phẩm
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border" ref={tableRef}>
          {/* Grid layout với cột chiết khấu mới */}
          <div className="grid grid-cols-[2fr_4fr_1.5fr_2fr_1.2fr_1fr_0.8fr_0.8fr] bg-gradient-to-r from-green-600 to-green-700 text-white font-bold">
            <div className="p-4 text-center border-r border-green-500">TÊN SẢN PHẨM</div>
            <div className="p-4 text-center border-r border-green-500">HÌNH ẢNH SẢN PHẨM</div>
            <div className="p-4 text-center border-r border-green-500">QUY CÁCH</div>
            <div className="p-4 text-center border-r border-green-500">GIÁ BÁN SHOP</div>
            <div className="p-4 text-center border-r border-green-500">GIÁ BÁN LẺ</div>
            <div className="p-4 text-center border-r border-green-500">CHIẾT KHẤU</div>
            <div className="p-4 text-center">THAO TÁC</div>
          </div>

          {products.map((product, index) => (
            <ProductRow
              key={product.id}
              product={product}
              index={index}
              editingCell={editingCell}
              editValue={editValue}
              setEditValue={setEditValue}
              startEdit={startEdit}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
              fileInputRefs={fileInputRefs}
              handleImageUpload={handleImageUpload}
              triggerImageUpload={triggerImageUpload}
              removeImage={removeImage}
              deleteProduct={deleteProduct}
            />
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border-t-4 border-blue-500">
          <div className="text-center text-gray-600 space-y-3">
            <p className="text-lg">💡 <strong>Hướng dẫn sử dụng:</strong></p>
            <div className="flex flex-wrap justify-center gap-6 text-sm bg-gray-50 p-4 rounded-lg">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Click vào ô bất kỳ để chỉnh sửa
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Click vào khung ảnh để tải hình sản phẩm (chiếm 90% ô ảnh)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Dùng nút "Xuất PNG" để lưu bảng báo giá
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Dữ liệu tự động lưu vào localStorage
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Cột chiết khấu đã được tối ưu cho nội dung dài
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTableEditor;
