Dưới đây là **toàn bộ nội dung file `README.md` hoàn chỉnh** cho dự án của bạn (cả backend và frontend), bao gồm:

* Mô tả dự án
* Hướng dẫn cài đặt từng phần
* Hướng dẫn sử dụng Swagger
* Danh sách tính năng
* Các công nghệ được sử dụng

---

### 📄 `README.md` hoàn chỉnh:

```markdown
# 📞 VN-CONNECT - Video Call & Chat Application

VN-CONNECT là một ứng dụng web hỗ trợ người dùng nhắn tin, gửi lời mời kết bạn và gọi video trực tuyến thời gian thực, được xây dựng với **Node.js (Express)** ở backend và **ReactJS (Vite)** ở frontend.

---

## 🚀 TÍNH NĂNG NỔI BẬT

- Đăng ký & đăng nhập người dùng
- Gửi/huỷ lời mời kết bạn
- Chấp nhận kết bạn và hiển thị danh sách bạn bè
- Nhắn tin thời gian thực (socket.io)
- Gọi video peer-to-peer (WebRTC)
- Swagger UI để test API dễ dàng

---

## 📁 CẤU TRÚC DỰ ÁN

```

VN-CONNECT/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── docs/
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── ...

````

---

## 🛠️ CÀI ĐẶT DỰ ÁN

### 1. ⚙️ Backend (Node.js + Express + MongoDB)

#### 📦 Cài đặt thư viện
```bash
cd backend
npm install
````

#### 📄 Tạo file `.env`

Tạo file `.env` trong thư mục `backend` với nội dung:

```
PORT=5001
MONGO_URI=mongodb://localhost:27017/vn-connect
JWT_SECRET=your_jwt_secret_key
```

> Bạn có thể thay đổi `MONGO_URI` theo cấu hình MongoDB cá nhân hoặc dùng MongoDB Atlas.

#### ▶️ Chạy server

```bash
npm run dev
```

Server sẽ khởi động tại: `http://localhost:5001`

---

### 🔍 Swagger API Documentation

Sau khi chạy backend, truy cập API Docs tại:

```
http://localhost:5001/api-chating-video-call/
```

Tại đây, bạn có thể test các API như:

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/user/getAll`
* DELETE `/api/user/:id`

---

### 2. 🎨 Frontend (ReactJS + Vite)

#### 📦 Cài đặt thư viện

```bash
cd frontend
npm install
```

#### ▶️ Chạy ứng dụng React

```bash
npm run dev
```

Mặc định chạy tại: `http://localhost:5173`

---

## 📚 THƯ VIỆN SỬ DỤNG

### Backend:

* `express` - Web framework
* `mongoose` - ORM cho MongoDB
* `bcryptjs` - Mã hoá mật khẩu
* `jsonwebtoken` - Quản lý token
* `socket.io` - Giao tiếp realtime
* `swagger-ui-express` - Swagger API docs
* `dotenv` - Biến môi trường

### Frontend:

* `react` - UI Library
* `vite` - Build tool
* `axios` - Gọi API
* `socket.io-client` - Kết nối socket realtime
* `react-router-dom` - Điều hướng frontend

---

## ✅ TODO

* [x] Đăng ký/Đăng nhập người dùng
* [x] Gửi lời mời kết bạn
* [x] Nhắn tin realtime
* [x] Gọi video
* [ ] Thông báo người dùng online/offline
* [ ] Gửi ảnh/chat media

---

## 💡 GHI CHÚ

* Đảm bảo MongoDB đang chạy trước khi khởi động backend
* Đổi cổng nếu bị xung đột trong `.env`
* Hãy kiểm tra kết nối socket ở cả backend và frontend (cổng, namespace...)

---

## 📬 LIÊN HỆ

* **Tác giả:** \[Tên bạn]
* **Email:** \[email của bạn]
* **Zalo/GitHub:** \[tuỳ chọn]

```

---

Bạn có muốn mình tạo và lưu file này trực tiếp vào thư mục `backend/README.md` cho bạn không?
```
