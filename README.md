# 📋 Price Table Editor - Bảng Báo Giá Sản Phẩm

Ứng dụng web hiện đại để tạo và quản lý bảng báo giá sản phẩm với khả năng chỉnh sửa trực tiếp và xuất file PNG chất lượng cao.

## 🌟 Tính năng chính

### ✨ Quản lý sản phẩm
- **Chỉnh sửa trực tiếp**: Click vào bất kỳ ô nào để chỉnh sửa thông tin
- **Thêm sản phẩm mới**: Dễ dàng thêm sản phẩm với một click
- **Xóa sản phẩm**: Loại bỏ sản phẩm không cần thiết
- **Quản lý hình ảnh**: Upload, thay đổi và xóa hình ảnh sản phẩm

### 🖼️ Quản lý hình ảnh
- **Upload hình ảnh**: Kéo thả hoặc click để tải ảnh lên
- **Xem trước**: Hiển thị hình ảnh ngay lập tức
- **Thay đổi ảnh**: Dễ dàng cập nhật hình ảnh sản phẩm
- **Xóa ảnh**: Loại bỏ hình ảnh khi không cần

### 📤 Xuất file
- **Xuất PNG**: Tạo file PNG chất lượng cao với thiết kế chuyên nghiệp
- **Header công ty**: Tự động thêm thông tin công ty và liên hệ
- **Định dạng đẹp**: Layout được tối ưu cho in ấn và chia sẻ

## 🚀 Demo trực tuyến

Truy cập ứng dụng tại: [https://giasinguyen.github.io/Price-Table-Editor/](https://giasinguyen.github.io/Price-Table-Editor/)

## 🛠️ Công nghệ sử dụng

- **React 19** - Framework JavaScript hiện đại
- **Vite** - Build tool nhanh chóng
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Bộ icon đẹp và nhất quán
- **Canvas API** - Để xuất file PNG chất lượng cao

## 📦 Cài đặt và chạy local

### Yêu cầu hệ thống
- Node.js 18+
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**
   ```bash
   git clone https://github.com/giasinguyen/Price-Table-Editor.git
   cd Price-Table-Editor/PriceList
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Chạy development server**
   ```bash
   npm run dev
   ```

4. **Mở trình duyệt**
   Truy cập `http://localhost:5173`

### Các lệnh khác

```bash
# Build cho production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

## 📁 Cấu trúc dự án

```
PriceList/
├── src/
│   ├── PriceTableEditor.jsx    # Component chính
│   ├── App.jsx                 # App component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/
│   └── vite.svg               # Favicon
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions workflow
├── package.json               # Dependencies và scripts
├── vite.config.js            # Vite configuration
└── README.md                 # Documentation
```

## 🎯 Hướng dẫn sử dụng

### 1. Chỉnh sửa thông tin sản phẩm
- Click vào bất kỳ ô nào trong bảng để chỉnh sửa
- Nhấn ✅ để lưu hoặc ❌ để hủy

### 2. Thêm sản phẩm mới
- Click nút "➕ Thêm sản phẩm"
- Sản phẩm mới sẽ được thêm vào cuối bảng

### 3. Quản lý hình ảnh
- **Thêm ảnh**: Click vào vùng "Tải ảnh" hoặc kéo thả file
- **Thay đổi ảnh**: Hover vào ảnh và click nút chỉnh sửa
- **Xóa ảnh**: Hover vào ảnh và click nút xóa

### 4. Xuất file PNG
- Click nút "📥 Xuất PNG"
- File sẽ được tải xuống tự động với tên có timestamp

## 🎨 Tùy chỉnh

### Thay đổi thông tin công ty
Chỉnh sửa trong file `PriceTableEditor.jsx`:

```javascript
// Tên công ty
ctx.fillText('OANH NGUYỄN - Phân Phối Bỉm Sữa', canvasWidth / 2, currentY + 65);

// Thông tin liên hệ
ctx.fillText('FB: OANH NGUYỄN - SĐT: 036.7373.498', canvasWidth / 2, currentY + 165);
```

### Thay đổi màu sắc
Các màu chính được định nghĩa trong Tailwind classes:
- `bg-green-600`: Màu header chính
- `text-green-700`: Màu text giá
- `bg-blue-600`: Màu nút xuất file

## 🚀 Deploy

Dự án sử dụng GitHub Actions để tự động deploy lên GitHub Pages.

### Tự động deploy
- Push code lên branch `main`
- GitHub Actions sẽ tự động build và deploy

### Manual deploy
```bash
npm run build
# Upload thư mục dist/ lên hosting
```

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

**Nguyễn Trần Gia Sĩ**
- Email: giasinguyentran@gmail.com
- Project Link: [https://github.com/giasinguyen/Price-Table-Editor](https://github.com/giasinguyen/Price-Table-Editor)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [GitHub Pages](https://pages.github.com/)

---

⭐ **Nếu dự án này hữu ích, hãy cho một star nhé!** ⭐