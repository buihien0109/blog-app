## Trang web blog chia sẻ kiến thức lập trình

**Link demo**: 
- USER: http://103.237.147.34:8885
- ADMIN: http://103.237.147.34:8886/admin

**Trang đăng nhập admin**: http://103.237.147.34:8886/admin/login

```
Email : admin@gmail.com
Password : 123
```

### Triển khai ứng dụng

Sau khi clone source về máy, có thể triển khai ứng dụng theo 2 cách:

#### 1. Chạy ứng dụng trên máy local

Tại thư mục `root` của project, chạy các câu lệnh sau:

Chạy ứng dụng `USER Frontend`

```bash
cd ./blog-UI-user
npm install
npm run dev
```

Chạy ứng dụng `ADMIN Frontend`

```bash
cd ./blog-UI-admin
npm install
npm run dev
```

Chạy ứng dụng `Backend`

```bash
cd ./blog-backend
mvn spring-boot:run
```

#### 2. Triển khai ứng dụng với Docker Compose

Tại thư mục `root` của project, chạy câu lệnh sau:

```
docker-compose up -d
```

### Công nghệ sử dụng

- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL
- Docker
- Docker Compose
- ReactJS, Ant Design, Tailwind CSS
- Redux, Redux Tookit, RTK Query
- ...

### Các chức năng chính

#### 1. Người dùng

- Danh sách bài viết, các bài viết nổi bật, bài viết mới nhất
- Danh sách danh mục bài viết, tìm kiếm bài viết theo danh mục
- Chi tiết bài viết, các bài viết liên quan
- Các dự án cá nhân của tác giả

#### 2. Quản trị viên

- Xem các thông số thống kê tổng quan
- Quản lý bài viết, danh mục bài viết
- Quản lý người dùng
- Quản lý dự án cá nhân
- Quản lý ảnh trong bài viết, dự án cá nhân, người dùng, ...
- ...
