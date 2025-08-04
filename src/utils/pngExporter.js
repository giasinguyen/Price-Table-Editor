import { wrapText, loadImage, drawRoundedRect } from '../utils/canvasUtils';

export const exportToPNG = async (products) => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Kích thước canvas được tối ưu lại với cột ảnh nhỏ hơn
    const canvasWidth = 2100; // Giảm từ 2400 xuống 2100 vì cột ảnh nhỏ hơn
    const rowHeight = 180; // Tăng chiều cao hàng để hiển thị chiết khấu tốt hơn
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
    ctx.fillText('Nhà Phân Phối NGUYỄN OANH', canvasWidth / 2, currentY + 65);
    
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
    ctx.fillText('Cung cấp Bỉm Sữa và Các Sản Phẩm Ngành Hàng Mẹ Và Bé', canvasWidth / 2, currentY + 125);

    // Thông tin liên hệ
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '22px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '1px';
    ctx.fillText('Facebook: Oanh Nguyễn Phânphốibỉmsữa - SĐT: 036.7373.498 - 086.7865.565 ', canvasWidth / 2, currentY + 165);
    
    currentY += headerHeight + 30;
    
    // Điều chỉnh độ rộng cột với ảnh nhỏ hơn và hình vuông
    const colWidths = [80, 300, 400, 220, 200, 250, 450]; // STT, TÊN, HÌNH (giảm từ 650->400), QUY CÁCH, GIÁ SHOP, GIÁ LẺ, CHIẾT KHẤU (tăng để bù)
    const headers = ['STT', 'TÊN SẢN PHẨM', 'HÌNH ẢNH', 'QUY CÁCH', 'GIÁ BÁN SHOP', 'GIÁ BÁN LẺ', 'CHIẾT KHẤU'];
    
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
      
      // Hình ảnh - Kích thước nhỏ và hình vuông
      currentX += colWidths[1];
      if (product.image) {
        try {
          const img = await loadImage(product.image);
          // Kích thước hình vuông nhỏ hơn
          const imgSize = 175; // Kích thước hình vuông 120x120px
          const imgX = currentX + (colWidths[2] - imgSize) / 2;
          const imgY = rowY + (rowHeight - imgSize) / 2;
          
          // Vẽ shadow cho ảnh
          ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
          drawRoundedRect(ctx, imgX + 3, imgY + 3, imgSize, imgSize, 12);
          ctx.fill();
          
          ctx.save();
          drawRoundedRect(ctx, imgX, imgY, imgSize, imgSize, 12);
          ctx.clip();
          ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
          ctx.restore();
          
          // Border cho ảnh
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 2;
          drawRoundedRect(ctx, imgX, imgY, imgSize, imgSize, 12);
          ctx.stroke();
        } catch (error) {
          console.log('Không thể load ảnh:', error);
          // Placeholder đẹp hơn với kích thước hình vuông
          const imgSize = 120;
          const imgX = currentX + (colWidths[2] - imgSize) / 2;
          const imgY = rowY + (rowHeight - imgSize) / 2;
          
          ctx.fillStyle = '#f1f5f9';
          drawRoundedRect(ctx, imgX, imgY, imgSize, imgSize, 12);
          ctx.fill();
          
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 2;
          drawRoundedRect(ctx, imgX, imgY, imgSize, imgSize, 12);
          ctx.stroke();
          
          ctx.fillStyle = '#94a3b8';
          ctx.font = '16px "Segoe UI", Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Chưa có', currentX + colWidths[2] / 2, rowY + rowHeight / 2 - 10);
          ctx.fillText('hình ảnh', currentX + colWidths[2] / 2, rowY + rowHeight / 2 + 15);
        }
      } else {
        // Placeholder khi không có ảnh với kích thước hình vuông
        const imgSize = 120;
        const imgX = currentX + (colWidths[2] - imgSize) / 2;
        const imgY = rowY + (rowHeight - imgSize) / 2;
        
        ctx.fillStyle = '#f1f5f9';
        drawRoundedRect(ctx, imgX, imgY, imgSize, imgSize, 12);
        ctx.fill();
        
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        drawRoundedRect(ctx, imgX, imgY, imgSize, imgSize, 12);
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
      
      // Giá bán lẻ
      currentX += colWidths[4];
      ctx.fillStyle = '#16a34a';
      ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(product.retailPrice, currentX + colWidths[5] / 2, rowY + rowHeight / 2 + 8);
      
      // Chiết khấu (cột mới) - Sửa lỗi hiển thị
      currentX += colWidths[5];
      ctx.fillStyle = '#7c3aed';
      ctx.font = 'bold 16px "Segoe UI", Arial, sans-serif'; // Giảm font size để vừa cột
      ctx.textAlign = 'left';
      const discountLines = product.discount.split('\n');
      const maxDiscountWidth = colWidths[6] - 30; // Để margin
      let currentLineY = rowY + 20; // Bắt đầu từ trên xuống
      
      discountLines.forEach((line) => {
        // Kiểm tra độ dài dòng và tự động xuống dòng nếu cần
        const wrappedLines = wrapText(ctx, line.trim(), maxDiscountWidth);
        wrappedLines.forEach((wrappedLine) => {
          if (currentLineY + 18 <= rowY + rowHeight - 10) { // Kiểm tra không vượt quá chiều cao hàng
            ctx.fillText(wrappedLine, currentX + 15, currentLineY);
            currentLineY += 18;
          }
        });
      });
      
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
    
    // Tạo link download
    const link = document.createElement('a');
    link.download = `bang-bao-gia-oanh-nguyen-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
    
  } catch (error) {
    console.error('Lỗi xuất PNG:', error);
    throw error;
  }
};
