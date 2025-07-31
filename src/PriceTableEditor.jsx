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

  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const exportToPNG = async () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Kích thước canvas được tối ưu lại
      const canvasWidth = 2000;
      const rowHeight = 160;
      const companyHeaderHeight = 140;
      const tableHeaderHeight = 70;
      const columnHeaderHeight = 60;
      const footerHeight = 80;
      const canvasHeight = companyHeaderHeight + tableHeaderHeight + columnHeaderHeight + (products.length * rowHeight) + footerHeight + 40;
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      // Nền trắng
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      let currentY = 20;
      
      // Header công ty với background xanh lá cây và thiết kế hiện đại
      const headerHeight = companyHeaderHeight + tableHeaderHeight;
      
      // Background gradient xanh lá cây
      const companyGradient = ctx.createLinearGradient(0, currentY, 0, currentY + headerHeight);
      companyGradient.addColorStop(0, '#16a34a');
      companyGradient.addColorStop(0.5, '#15803d');
      companyGradient.addColorStop(1, '#14532d');
      
      // Vẽ background với bo góc tròn
      ctx.fillStyle = companyGradient;
      drawRoundedRect(ctx, 40, currentY, canvasWidth - 80, headerHeight, 20);
      ctx.fill();
      
      // Thêm hiệu ứng shadow nhẹ
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetY = 5;
      ctx.fillStyle = companyGradient;
      drawRoundedRect(ctx, 40, currentY, canvasWidth - 80, headerHeight, 20);
      ctx.fill();
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      
      // Tên công ty với font hiện đại
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '2px';
      ctx.fillText('OANH NGUYỄN - Phân Phối Bỉm Sữa', canvasWidth / 2, currentY + 65);
      
      // Đường phân cách hiện đại
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2 - 300, currentY + 85);
      ctx.lineTo(canvasWidth / 2 + 300, currentY + 85);
      ctx.stroke();
      
      // Tiêu đề bảng báo giá
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Segoe UI", Arial, sans-serif';
      ctx.letterSpacing = '1px';
      ctx.fillText('BẢNG BÁO GIÁ SẢN PHẨM', canvasWidth / 2, currentY + 125);

      // Thông tin liên hệ
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '22px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '1px';
      ctx.fillText('FB: OANH NGUYỄN - SĐT: 036.7373.498', canvasWidth / 2, currentY + 165);
      
      currentY += headerHeight + 30;
      
      // Điều chỉnh độ rộng cột: tăng cột hình ảnh, giảm cột giá bán lẻ
      const colWidths = [80, 300, 600, 220, 200, 300]; // STT, TÊN, HÌNH (tăng lên 500), QUY CÁCH, GIÁ SHOP, GIÁ LẺ
      const headers = ['STT', 'TÊN SẢN PHẨM', 'HÌNH ẢNH', 'QUY CÁCH', 'GIÁ BÁN SHOP', 'GIÁ BÁN LẺ'];
      
      // Background cho header cột với bo góc tròn
      ctx.fillStyle = '#22c55e';
      drawRoundedRect(ctx, 40, currentY, canvasWidth - 80, columnHeaderHeight, 12);
      ctx.fill();
      
      // Vẽ các header cột
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      
      let currentX = 40;
      headers.forEach((header, index) => {
        // Vẽ border giữa các cột
        if (index > 0) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(currentX, currentY + 5);
          ctx.lineTo(currentX, currentY + columnHeaderHeight - 5);
          ctx.stroke();
        }
        
        ctx.fillText(header, currentX + colWidths[index] / 2, currentY + 35);
        currentX += colWidths[index];
      });
      
      currentY += columnHeaderHeight;
      
      // Vẽ từng sản phẩm với thiết kế đẹp hơn và bo góc tròn
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const rowY = currentY + (i * rowHeight);
        
        // Nền xen kẽ với bo góc tròn nhẹ
        ctx.fillStyle = i % 2 === 0 ? '#ffffff' : '#f8fafc';
        if (i === 0) {
          // Hàng đầu tiên bo góc trên
          drawRoundedRect(ctx, 40, rowY, canvasWidth - 80, rowHeight, 12);
          ctx.fill();
        } else if (i === products.length - 1) {
          // Hàng cuối bo góc dưới
          drawRoundedRect(ctx, 40, rowY, canvasWidth - 80, rowHeight, 12);
          ctx.fill();
        } else {
          // Các hàng giữa không bo góc
          ctx.fillRect(40, rowY, canvasWidth - 80, rowHeight);
        }
        
        // Border ngang với màu nhẹ nhàng hơn
        if (i < products.length - 1) {
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(50, rowY + rowHeight);
          ctx.lineTo(canvasWidth - 50, rowY + rowHeight);
          ctx.stroke();
        }
        
        currentX = 40;
        
        // STT
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 24px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText((i + 1).toString(), currentX + colWidths[0] / 2, rowY + rowHeight / 2 + 8);
        
        // Tên sản phẩm
        currentX += colWidths[0];
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'left';
        const nameLines = wrapText(ctx, product.name, colWidths[1] - 30);
        const nameStartY = rowY + (rowHeight - nameLines.length * 22) / 2 + 18;
        nameLines.forEach((line, lineIndex) => {
          ctx.fillText(line, currentX + 15, nameStartY + lineIndex * 22);
        });
        
        // Hình ảnh (kích thước lớn hơn nhiều)
        currentX += colWidths[1];
        if (product.image) {
          try {
            const img = await loadImage(product.image);
            const imgWidth = 280; // Chiều rộng ảnh tăng lên
            const imgHeight = 140; // Chiều cao ảnh
            const imgX = currentX + (colWidths[2] - imgWidth) / 2;
            const imgY = rowY + (rowHeight - imgHeight) / 2;
            
            // Vẽ shadow cho ảnh
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            drawRoundedRect(ctx, imgX + 3, imgY + 3, imgWidth, imgHeight, 12);
            ctx.fill();
            
            ctx.save();
            drawRoundedRect(ctx, imgX, imgY, imgWidth, imgHeight, 12);
            ctx.clip();
            ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
            ctx.restore();
            
            // Border cho ảnh
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 2;
            drawRoundedRect(ctx, imgX, imgY, imgWidth, imgHeight, 12);
            ctx.stroke();
          } catch (error) {
            console.log('Không thể load ảnh:', error);
            // Placeholder đẹp hơn với kích thước lớn
            const imgWidth = 280;
            const imgHeight = 140;
            const imgX = currentX + (colWidths[2] - imgWidth) / 2;
            const imgY = rowY + (rowHeight - imgHeight) / 2;
            
            ctx.fillStyle = '#f1f5f9';
            drawRoundedRect(ctx, imgX, imgY, imgWidth, imgHeight, 12);
            ctx.fill();
            
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 2;
            drawRoundedRect(ctx, imgX, imgY, imgWidth, imgHeight, 12);
            ctx.stroke();
            
            ctx.fillStyle = '#94a3b8';
            ctx.font = '16px "Segoe UI", Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Chưa có', currentX + colWidths[2] / 2, rowY + rowHeight / 2 - 10);
            ctx.fillText('hình ảnh', currentX + colWidths[2] / 2, rowY + rowHeight / 2 + 15);
          }
        } else {
          // Placeholder khi không có ảnh với kích thước lớn
          const imgWidth = 280;
          const imgHeight = 140;
          const imgX = currentX + (colWidths[2] - imgWidth) / 2;
          const imgY = rowY + (rowHeight - imgHeight) / 2;
          
          ctx.fillStyle = '#f1f5f9';
          drawRoundedRect(ctx, imgX, imgY, imgWidth, imgHeight, 12);
          ctx.fill();
          
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 2;
          drawRoundedRect(ctx, imgX, imgY, imgWidth, imgHeight, 12);
          ctx.stroke();
          
          ctx.fillStyle = '#94a3b8';
          ctx.font = '16px "Segoe UI", Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Chưa có', currentX + colWidths[2] / 2, rowY + rowHeight / 2 - 10);
          ctx.fillText('hình ảnh', currentX + colWidths[2] / 2, rowY + rowHeight / 2 + 15);
        }
        
        // Quy cách
        currentX += colWidths[2];
        ctx.fillStyle = '#475569';
        ctx.font = '18px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        const specLines = product.specification.split('\n');
        const specStartY = rowY + (rowHeight - specLines.length * 18) / 2 + 14;
        specLines.forEach((line, lineIndex) => {
          ctx.fillText(line, currentX + colWidths[3] / 2, specStartY + lineIndex * 18);
        });
        
        // Giá bán shop
        currentX += colWidths[3];
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(product.shopPrice, currentX + colWidths[4] / 2, rowY + rowHeight / 2 + 8);
        
        // Giá bán lẻ (cột nhỏ gọn hơn với font size phù hợp)
        currentX += colWidths[4];
        ctx.fillStyle = '#16a34a';
        ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif'; // Font size vừa phải
        ctx.textAlign = 'center';
        ctx.fillText(product.retailPrice, currentX + colWidths[5] / 2, rowY + rowHeight / 2 + 8);
        
        // Vẽ border dọc giữa các cột
        currentX = 40;
        colWidths.forEach((width, index) => {
          if (index > 0) {
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(currentX, rowY + 5);
            ctx.lineTo(currentX, rowY + rowHeight - 5);
            ctx.stroke();
          }
          currentX += width;
        });
      }
      
      // Footer với thông tin liên hệ đẹp và bo góc tròn
      const footerY = currentY + (products.length * rowHeight) + 30;
      
      // Background cho footer với bo góc tròn
      ctx.fillStyle = '#f8fafc';
      drawRoundedRect(ctx, 40, footerY, canvasWidth - 80, footerHeight, 15);
      ctx.fill();
      
      // Border cho footer
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      drawRoundedRect(ctx, 40, footerY, canvasWidth - 80, footerHeight, 15);
      ctx.stroke();
      
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Liên hệ: Oanh Nguyễn - Phân phối bỉm sữa chất lượng cao', canvasWidth / 2, footerY + 30);
      
      ctx.font = '16px "Segoe UI", Arial, sans-serif';
      ctx.fillText('Email: contact@oanhnguyenstore.com | SĐT: 0123.456.789', canvasWidth / 2, footerY + 55);
      
      // Tạo link download
      const link = document.createElement('a');
      link.download = `bang-bao-gia-oanh-nguyen-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('Xuất bảng báo giá PNG thành công!');
      
    } catch (error) {
      console.error('Lỗi xuất PNG:', error);
      alert('Có lỗi xảy ra khi xuất file PNG. Vui lòng thử lại.');
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
          <h2 className="text-2xl font-bold text-gray-800">Bảng Báo Giá Sản Phẩm</h2>
          <div className="flex gap-3">
            <button
              onClick={exportToPNG}
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
          {/* Sử dụng grid layout tối ưu với cột ảnh rộng hơn và cột giá lẻ nhỏ gọn hơn */}
          <div className="grid grid-cols-[2fr_4fr_1.5fr_2fr_1.2fr_0.8fr] bg-gradient-to-r from-green-600 to-green-700 text-white font-bold">
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
              className={`grid grid-cols-[2fr_4fr_1.5fr_2fr_1.2fr_0.8fr] border-b border-gray-200 transition-all hover:bg-blue-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
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
                <div className="text-center">
                  <EditableCell
                    productId={product.id}
                    field="retailPrice"
                    value={product.retailPrice}
                  />
                </div>
              </div>

              <div className="p-4 flex justify-center">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 transform hover:scale-110"
                  title="Xóa sản phẩm"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
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
                Click vào khung ảnh để tải hình sản phẩm
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Dùng nút "Xuất PNG" để lưu bảng báo giá
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTableEditor;