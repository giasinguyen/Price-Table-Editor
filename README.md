# 📋 Price Table Editor

<p align="center">
  <strong>Ứng dụng web tạo và quản lý bảng báo giá sản phẩm trực quan, nhanh chóng và chuyên nghiệp.</strong>
</p>

<p align="center">
  Chỉnh sửa trực tiếp • Quản lý hình ảnh • Xuất PNG chất lượng cao • Deploy tự động với GitHub Pages
</p>

<p align="center">
  <a href="https://giasinguyen.github.io/Price-Table-Editor/">
    <strong>🚀 Live Demo</strong>
  </a>
  &nbsp;•&nbsp;
  <a href="https://github.com/giasinguyen/Price-Table-Editor">
    <strong>📦 GitHub Repository</strong>
  </a>
</p>

---

## 📖 Giới thiệu

**Price Table Editor** là ứng dụng web hỗ trợ tạo, chỉnh sửa và quản lý bảng báo giá sản phẩm trực tiếp trên trình duyệt.

Ứng dụng được thiết kế nhằm đơn giản hóa quá trình xây dựng bảng giá: người dùng có thể chỉnh sửa thông tin sản phẩm, quản lý hình ảnh và xuất toàn bộ bảng báo giá thành **file PNG chất lượng cao** để in ấn, gửi khách hàng hoặc chia sẻ trên các nền tảng trực tuyến.

### Điểm nổi bật

* ✏️ Chỉnh sửa thông tin sản phẩm trực tiếp trên bảng
* ➕ Thêm và xóa sản phẩm nhanh chóng
* 🖼️ Upload, thay đổi và xóa hình ảnh sản phẩm
* 👀 Xem trước hình ảnh ngay lập tức
* 📥 Xuất bảng báo giá thành PNG chất lượng cao
* 🏢 Tự động hiển thị thông tin doanh nghiệp trong file xuất
* 📱 Giao diện hiện đại, trực quan và dễ sử dụng
* 🚀 Tự động deploy lên GitHub Pages bằng GitHub Actions

---

## 🌐 Demo trực tuyến

Bạn có thể trải nghiệm ứng dụng tại:

👉 **https://giasinguyen.github.io/Price-Table-Editor/**

---

## ✨ Tính năng

### 🛍️ Quản lý sản phẩm

| Tính năng              | Mô tả                                              |
| ---------------------- | -------------------------------------------------- |
| ✏️ Chỉnh sửa trực tiếp | Nhấp vào ô dữ liệu để chỉnh sửa thông tin sản phẩm |
| ➕ Thêm sản phẩm        | Thêm sản phẩm mới vào cuối bảng                    |
| 🗑️ Xóa sản phẩm       | Loại bỏ các sản phẩm không còn cần thiết           |
| 💾 Lưu thay đổi        | Xác nhận và cập nhật dữ liệu trực tiếp             |
| ❌ Hủy chỉnh sửa        | Khôi phục dữ liệu trước khi chỉnh sửa              |

### 🖼️ Quản lý hình ảnh

| Tính năng       | Mô tả                                  |
| --------------- | -------------------------------------- |
| 📤 Upload ảnh   | Nhấp hoặc kéo thả ảnh để tải lên       |
| 👀 Xem trước    | Hiển thị hình ảnh ngay sau khi tải lên |
| 🔄 Thay đổi ảnh | Cập nhật hình ảnh cho từng sản phẩm    |
| 🗑️ Xóa ảnh     | Xóa hình ảnh khi không còn sử dụng     |

### 📥 Xuất bảng báo giá

Ứng dụng sử dụng **Canvas API** để render bảng báo giá thành hình ảnh PNG.

File xuất bao gồm:

* Header và thông tin doanh nghiệp
* Danh sách sản phẩm
* Hình ảnh sản phẩm
* Giá bán và thông tin liên quan
* Thông tin liên hệ
* Layout tối ưu cho việc chia sẻ và in ấn

---

## 🛠️ Công nghệ sử dụng

| Công nghệ          | Vai trò                                 |
| ------------------ | --------------------------------------- |
| **React 19**       | Xây dựng giao diện và quản lý component |
| **Vite**           | Development server và build tool        |
| **Tailwind CSS**   | Styling giao diện                       |
| **Lucide React**   | Icon system                             |
| **Canvas API**     | Render và xuất bảng báo giá thành PNG   |
| **GitHub Actions** | CI/CD và tự động deploy                 |
| **GitHub Pages**   | Hosting ứng dụng                        |

---

## 📦 Cài đặt

### Yêu cầu

Đảm bảo máy đã cài đặt:

* **Node.js 18+**
* **npm** hoặc **yarn**
* **Git**

### 1. Clone repository

```bash
git clone https://github.com/giasinguyen/Price-Table-Editor.git
```

Di chuyển vào thư mục project:

```bash
cd Price-Table-Editor/PriceList
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

### 4. Mở ứng dụng

Truy cập:

```text
http://localhost:5173
```

---

## ⚙️ Các lệnh thường dùng

### Development

```bash
npm run dev
```

Khởi chạy development server.

### Production Build

```bash
npm run build
```

Build ứng dụng để deploy production.

### Preview Production Build

```bash
npm run preview
```

Chạy thử bản production build trên local.

### Lint

```bash
npm run lint
```

Kiểm tra coding convention và các vấn đề liên quan đến source code.

---

## 📁 Cấu trúc dự án

```text
PriceList/
├── src/
│   ├── PriceTableEditor.jsx    # Component chính của Price Table Editor
│   ├── App.jsx                 # Root application component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
│
├── public/
│   └── vite.svg                # Static asset / favicon
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
│
├── package.json                # Dependencies và scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

---

## 🎯 Hướng dẫn sử dụng

### 1. Chỉnh sửa sản phẩm

Nhấp vào ô thông tin cần thay đổi trong bảng.

Sau khi chỉnh sửa:

* Nhấn **✅** để lưu thay đổi
* Nhấn **❌** để hủy chỉnh sửa

---

### 2. Thêm sản phẩm

Nhấn:

```text
➕ Thêm sản phẩm
```

Một sản phẩm mới sẽ được thêm vào cuối bảng và có thể chỉnh sửa trực tiếp.

---

### 3. Quản lý hình ảnh sản phẩm

#### Thêm hình ảnh

Nhấp vào vùng:

```text
Tải ảnh
```

hoặc kéo và thả file hình ảnh vào vùng upload.

#### Thay đổi hình ảnh

Di chuột vào hình ảnh hiện tại và chọn nút chỉnh sửa.

#### Xóa hình ảnh

Di chuột vào hình ảnh và chọn nút xóa.

---

### 4. Xuất bảng báo giá

Nhấn:

```text
📥 Xuất PNG
```

Ứng dụng sẽ render toàn bộ bảng báo giá và tự động tải file PNG xuống thiết bị.

Tên file được tạo kèm timestamp để hạn chế trùng lặp.

---

## 🎨 Tùy chỉnh

### Thay đổi thông tin doanh nghiệp

Thông tin doanh nghiệp hiển thị trong file PNG có thể được chỉnh sửa tại:

```text
src/PriceTableEditor.jsx
```

Ví dụ:

```javascript
// Tên doanh nghiệp
ctx.fillText(
  'OANH NGUYỄN - Phân Phối Bỉm Sữa',
  canvasWidth / 2,
  currentY + 65
);

// Thông tin liên hệ
ctx.fillText(
  'FB: OANH NGUYỄN - SĐT: 036.7373.498',
  canvasWidth / 2,
  currentY + 165
);
```

---

### Thay đổi màu giao diện

Một số màu chính được định nghĩa thông qua Tailwind CSS:

```text
bg-green-600
text-green-700
bg-blue-600
```

Ví dụ:

| Class            | Mục đích                    |
| ---------------- | --------------------------- |
| `bg-green-600`   | Background chính của header |
| `text-green-700` | Màu hiển thị giá            |
| `bg-blue-600`    | Màu của nút xuất file       |

Bạn có thể thay đổi các class này để điều chỉnh theme theo nhận diện thương hiệu.

---

## 🚀 Deployment

Project sử dụng **GitHub Actions** kết hợp với **GitHub Pages** để tự động build và deploy ứng dụng.

### Automatic Deployment

Quy trình deploy:

```text
Push code → main
        ↓
GitHub Actions
        ↓
npm install
        ↓
npm run build
        ↓
GitHub Pages
```

Chỉ cần push code lên branch:

```text
main
```

GitHub Actions sẽ tự động thực hiện quá trình build và deploy.

---

### Manual Build

Nếu muốn build thủ công:

```bash
npm run build
```

Sau khi hoàn tất, production files sẽ được tạo trong:

```text
dist/
```

Có thể deploy thư mục `dist/` lên các nền tảng hosting hỗ trợ static site.

---

## 🤝 Đóng góp

Mọi đóng góp cho project đều được hoan nghênh.

### Quy trình đóng góp

1. **Fork repository**

2. **Tạo feature branch**

```bash
git checkout -b feature/AmazingFeature
```

3. **Commit thay đổi**

```bash
git commit -m "Add some AmazingFeature"
```

4. **Push branch**

```bash
git push origin feature/AmazingFeature
```

5. **Tạo Pull Request**

Sau đó mở Pull Request trên GitHub để review và merge thay đổi.

---

## 📝 License

Project được phân phối theo **MIT License**.

Xem file `LICENSE` để biết thêm chi tiết.

---

## 👨‍💻 Tác giả

### Nguyễn Trần Gia Sĩ

📧 **Email:** [giasinguyentran@gmail.com](mailto:giasinguyentran@gmail.com)
🔗 **GitHub:** https://github.com/giasinguyen
📦 **Repository:** https://github.com/giasinguyen/Price-Table-Editor
🌐 **Live Demo:** https://giasinguyen.github.io/Price-Table-Editor/

---

## 🙏 Acknowledgements

Project được xây dựng với sự hỗ trợ của các công nghệ và công cụ mã nguồn mở:

* [React](https://react.dev/)
* [Vite](https://vite.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Lucide](https://lucide.dev/)
* [GitHub Actions](https://github.com/features/actions)
* [GitHub Pages](https://pages.github.com/)

---

<p align="center">
  Made with ❤️ by <strong>Nguyễn Trần Gia Sĩ</strong>
</p>

<p align="center">
  ⭐ Nếu project hữu ích, hãy cân nhắc <strong>Star</strong> repository để ủng hộ dự án!
</p>
