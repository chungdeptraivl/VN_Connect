# 🎥 Chatting & Video Call Application

Ứng dụng hỗ trợ **chat** và **gọi video** theo thời gian thực, sử dụng công nghệ hiện đại với kiến trúc tách biệt **Frontend** và **Backend**.

---

## 🚀 Demo API (Swagger)

Bạn có thể xem tài liệu API tại:

👉 [http://localhost:5001/api-chating-video-call/](http://localhost:5001/api-chating-video-call/)

---

## 📦 Backend

### Cài đặt và chạy:

```bash
npm install
npm run dev
```

- Chạy trên cổng `5001` mặc định (hoặc theo cấu hình của bạn).
- Kiểm tra API tại link Swagger phía trên.

---

## 💻 Frontend

### Cài đặt và chạy:

```bash
npm install
npm run dev
```

- Ứng dụng sẽ chạy tại `http://localhost:5173` (hoặc port bạn cấu hình).
- Giao diện thân thiện, dễ sử dụng, hỗ trợ gọi video trực tuyến.

---

## 📁 Cấu trúc dự án

```
project-root/
│
├── backend/       # Thư mục chứa mã nguồn backend (Node.js, Express, Socket.IO, v.v.)
└── frontend/      # Thư mục giao diện người dùng (React, Vite, Tailwind CSS, v.v.)
```

---

## 📌 Ghi chú

- Đảm bảo bạn đã cài **Node.js** (phiên bản mới nhất khuyến khích).
- Cần kết nối internet nếu ứng dụng sử dụng WebRTC/STUN/TURN servers bên ngoài.
- Hãy kiểm tra tường lửa hoặc quyền camera/micro nếu không thể kết nối video call.

---
