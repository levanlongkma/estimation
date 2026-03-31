# YÊU CẦU CRM
## HỆ THỐNG CRM TRUNG TÂM XỬ LÝ DỮ LIỆU
**Khách hàng - Đặt lịch - CRM - Nhân viên - Đánh giá**

---

## I. TỔNG QUAN TỪ HÌNH ẢNH

Hình ảnh thể hiện một luồng dịch vụ khép kín gồm 5 mắt xích chính:

1. **Khách hàng**
- Đăng ký và đăng nhập
- Quản lý tài khoản

2. **Đặt lịch**
- Chọn dịch vụ online
- Tạo booking
- Áp dụng voucher

3. **Hệ thống CRM**
- Trung tâm xử lý dữ liệu
- Lưu hồ sơ bệnh án / hồ sơ dịch vụ
- Phân loại khách hàng
- Tự động điều phối

4. **Nhân viên**
- Tiếp nhận công việc
- Thực hiện dịch vụ
- Sử dụng portal web nội bộ

5. **Đánh giá**
- Khách hàng đánh giá sau khi hoàn tất dịch vụ
- Bộ phận CSKH tiếp nhận phản hồi

=> Đây là mô hình CRM cho dịch vụ đặt lịch, có yếu tố hồ sơ khách hàng, điều phối nhân sự, theo dõi thực hiện và đo chất lượng sau dịch vụ.

---

## II. MỤC TIÊU HỆ THỐNG

Hệ thống cần giải quyết 6 mục tiêu chính:

- Tập trung toàn bộ dữ liệu khách hàng, lịch hẹn, lịch sử dịch vụ và phản hồi về một nơi
- Cho phép khách hàng tự đăng ký, đăng nhập, đặt lịch và theo dõi trạng thái dịch vụ
- Hỗ trợ điều phối nhân viên phù hợp theo khu vực, kỹ năng, ca làm và tải công việc
- Cho phép nhân viên nhận việc, cập nhật tiến độ và hoàn tất dịch vụ trên web
- Thu thập đánh giá sau dịch vụ để phục vụ CSKH và cải tiến vận hành
- Tạo dữ liệu nền cho báo cáo, chăm sóc lại, upsell, remarketing và quản trị chất lượng

---

## III. ĐỐI TƯỢNG NGƯỜI DÙNG

### 1. Khách hàng
Có thể:
- Đăng ký / đăng nhập
- Cập nhật hồ sơ cá nhân
- Chọn dịch vụ
- Đặt lịch
- Sử dụng voucher
- Xem lịch hẹn
- Theo dõi trạng thái xử lý
- Xem lịch sử dịch vụ
- Gửi đánh giá và phản hồi

### 2. Nhân viên thực hiện
Có thể:
- Nhận công việc được phân công
- Xem thông tin khách hàng và lịch hẹn
- Xem ghi chú chuyên môn / hồ sơ liên quan
- Cập nhật trạng thái: đã nhận, đang di chuyển, đang thực hiện, hoàn tất
- Ghi chú kết quả dịch vụ
- Đính kèm hình ảnh / biên bản nếu cần

### 3. Điều phối / vận hành
Có thể:
- Xem tất cả booking
- Phân công nhân viên thủ công hoặc tự động
- Quản lý lịch làm việc
- Xử lý đổi lịch, hủy lịch, quá tải, trễ hẹn
- Theo dõi năng suất nhân viên

### 4. CSKH
Có thể:
- Xem đánh giá sau dịch vụ
- Xử lý khiếu nại
- Chăm sóc lại khách hàng
- Tạo tác vụ follow-up

### 5. Quản lý / admin
Có thể:
- Quản lý dịch vụ, bảng giá, voucher
- Quản lý người dùng và phân quyền
- Xem dashboard doanh thu, booking, hiệu suất, chất lượng
- Cấu hình rule điều phối

---

## IV. LUỒNG NGHIỆP VỤ CỐT LÕI

```text
Khách hàng đăng ký / đăng nhập
  -> chọn dịch vụ
  -> chọn ngày giờ / địa điểm / ghi chú
  -> áp dụng voucher
  -> tạo booking
  -> CRM tiếp nhận
  -> kiểm tra dữ liệu khách hàng + lịch sử dịch vụ
  -> phân loại khách hàng
  -> tự động hoặc thủ công điều phối nhân viên
  -> nhân viên nhận việc
  -> thực hiện dịch vụ
  -> cập nhật kết quả
  -> hoàn tất ca dịch vụ
  -> hệ thống gửi yêu cầu đánh giá
  -> khách hàng đánh giá
  -> CSKH xử lý phản hồi nếu có vấn đề
```

---

## V. MODULE BẮT BUỘC

### 1. Portal khách hàng
Chức năng:
- Đăng ký / đăng nhập / quên mật khẩu
- Quản lý hồ sơ cá nhân
- Quản lý địa chỉ
- Xem danh mục dịch vụ
- Tạo booking
- Áp voucher
- Thanh toán nếu có
- Xem trạng thái booking
- Xem lịch sử dịch vụ
- Gửi đánh giá

### 2. Booking & lịch hẹn
Chức năng:
- Chọn dịch vụ
- Chọn chi nhánh / khu vực / hình thức phục vụ
- Chọn ngày giờ
- Kiểm tra slot còn trống
- Xác nhận lịch hẹn
- Đổi lịch / hủy lịch
- Gửi thông báo nhắc lịch

### 3. CRM trung tâm
Chức năng:
- Lưu hồ sơ khách hàng
- Lưu hồ sơ bệnh án / hồ sơ dịch vụ / lịch sử sử dụng
- Gắn tag phân loại khách hàng
- Lưu lịch sử booking
- Lưu lịch sử tương tác CSKH
- Tạo note nội bộ
- Theo dõi tần suất sử dụng dịch vụ
- Phục vụ remarketing và chăm sóc lại

### 4. Điều phối nhân sự
Chức năng:
- Quản lý danh sách nhân viên
- Quản lý ca làm việc
- Quản lý khu vực phụ trách
- Quản lý kỹ năng / chuyên môn
- Tự động gợi ý nhân viên phù hợp
- Cảnh báo trùng lịch / quá tải / thiếu người
- Cho phép điều phối lại khi phát sinh

### 5. Cổng web nhân viên
Chức năng:
- Đăng nhập
- Xem việc được giao
- Xem lịch trong ngày
- Xem thông tin khách hàng
- Check-in khi bắt đầu
- Cập nhật tiến độ
- Hoàn tất dịch vụ
- Ghi chú kết quả
- Tải ảnh minh chứng / hồ sơ đính kèm

### 6. Đánh giá & CSKH
Chức năng:
- Gửi form đánh giá sau dịch vụ
- Chấm điểm hài lòng
- Để lại nhận xét
- Phân loại phản hồi tốt / xấu / khiếu nại
- Tạo ticket CSKH nếu điểm thấp
- Theo dõi xử lý phản hồi

### 7. Voucher & khuyến mại
Chức năng:
- Tạo voucher
- Giới hạn số lần sử dụng
- Quy định thời gian hiệu lực
- Áp dụng theo dịch vụ / nhóm khách hàng / kênh
- Theo dõi hiệu quả voucher

### 8. Dashboard & báo cáo
Chức năng:
- Số lượng booking theo ngày / tuần / tháng
- Tỷ lệ hoàn tất
- Tỷ lệ hủy / đổi lịch
- Hiệu suất nhân viên
- Điểm hài lòng khách hàng
- Doanh thu theo dịch vụ
- Tỷ lệ khách quay lại

---

## VI. DỮ LIỆU CỐT LÕI CẦN CÓ

### 1. Khách hàng
- Mã khách hàng
- Họ tên
- Số điện thoại
- Email
- Ngày sinh
- Giới tính
- Địa chỉ
- Nguồn khách hàng
- Nhóm khách hàng
- Trạng thái hoạt động

### 2. Hồ sơ dịch vụ / hồ sơ bệnh án
- Mã hồ sơ
- Thuộc khách hàng nào
- Loại dịch vụ
- Lịch sử sử dụng
- Ghi chú chuyên môn
- Tệp đính kèm
- Cảnh báo / lưu ý đặc biệt

### 3. Booking
- Mã booking
- Khách hàng
- Dịch vụ
- Chi nhánh / khu vực
- Ngày giờ hẹn
- Trạng thái booking
- Voucher áp dụng
- Nhân viên được phân công
- Ghi chú khách hàng

### 4. Nhân viên
- Mã nhân viên
- Họ tên
- Vai trò
- Kỹ năng / chuyên môn
- Khu vực phụ trách
- Ca làm việc
- Trạng thái sẵn sàng

### 5. Kết quả dịch vụ
- Thời gian bắt đầu / kết thúc
- Người thực hiện
- Kết quả ghi nhận
- Hình ảnh / tài liệu đính kèm
- Trạng thái hoàn tất

### 6. Đánh giá
- Mã đánh giá
- Booking liên quan
- Điểm số
- Nội dung phản hồi
- Mức độ hài lòng
- Trạng thái CSKH xử lý

---

## VII. TRẠNG THÁI NGHIỆP VỤ CẦN CHUẨN HÓA

### 1. Trạng thái booking
- Mới tạo
- Chờ xác nhận
- Đã xác nhận
- Đã phân công
- Nhân viên đã nhận việc
- Đang thực hiện
- Hoàn tất
- Khách hủy
- Hệ thống hủy
- Không thành công

### 2. Trạng thái đánh giá
- Chưa gửi
- Đã gửi
- Đã phản hồi
- Cần CSKH xử lý
- Đã xử lý xong

### 3. Trạng thái nhân viên
- Rảnh
- Đang bận
- Nghỉ ca
- Tạm khóa

---

## VIII. LOGIC CRM QUAN TRỌNG

### 1. Phân loại khách hàng
Hệ thống nên hỗ trợ phân loại theo:
- Khách mới
- Khách quay lại
- Khách VIP
- Khách theo gói
- Khách có khiếu nại
- Khách theo khu vực
- Khách theo nhu cầu dịch vụ

### 2. Điều phối tự động
Rule gợi ý phân công nên dựa trên:
- Khu vực phục vụ
- Kỹ năng phù hợp
- Lịch trống
- Mức tải hiện tại
- Độ ưu tiên khách hàng
- Loại dịch vụ

### 3. Chăm sóc lại
CRM cần tự động tạo danh sách:
- Khách lâu chưa quay lại
- Khách đánh giá thấp
- Khách đủ điều kiện upsell
- Khách từng dùng voucher
- Khách cần nhắc lịch tái khám / tái sử dụng dịch vụ

---

## IX. PHÂN QUYỀN TỐI THIỂU

### 1. Customer
- Chỉ xem dữ liệu của chính mình
- Tạo và quản lý booking của mình
- Gửi đánh giá

### 2. Staff
- Chỉ xem công việc được giao
- Chỉ cập nhật kết quả trong phạm vi booking của mình

### 3. Dispatcher / Operation
- Xem toàn bộ booking thuộc phạm vi vận hành
- Được phân công, đổi người thực hiện, đổi lịch

### 4. CSKH
- Xem hồ sơ khách hàng
- Xem đánh giá, phản hồi, ticket hậu mãi

### 5. Admin / Manager
- Full quyền cấu hình hệ thống
- Xem báo cáo và dashboard tổng

---

## X. MÀN HÌNH MVP CẦN CÓ

### Khách hàng
- Đăng nhập / đăng ký
- Trang danh sách dịch vụ
- Màn hình đặt lịch
- Màn hình áp voucher
- Danh sách lịch hẹn
- Chi tiết lịch hẹn
- Lịch sử dịch vụ
- Màn hình đánh giá

### Vận hành / CRM
- Dashboard tổng quan
- Danh sách booking
- Chi tiết booking
- Trang hồ sơ khách hàng
- Màn hình điều phối
- Màn hình quản lý voucher
- Màn hình quản lý dịch vụ

### Nhân viên
- Danh sách công việc
- Lịch làm việc
- Chi tiết ca dịch vụ
- Màn hình cập nhật trạng thái
- Màn hình nhập kết quả

### CSKH / Quản lý
- Danh sách đánh giá
- Danh sách phản hồi tiêu cực
- Ticket xử lý khiếu nại
- Dashboard chất lượng dịch vụ

---

## XI. KPI CẦN THEO DÕI

- Số booking mới
- Tỷ lệ xác nhận booking
- Tỷ lệ hoàn tất dịch vụ
- Tỷ lệ hủy lịch
- Thời gian chờ từ đặt lịch đến phục vụ
- Tỷ lệ phân công thành công ngay lần đầu
- Số booking trên mỗi nhân viên
- Điểm đánh giá trung bình
- Tỷ lệ khách hàng quay lại
- Doanh thu theo dịch vụ
- Doanh thu theo nhân viên / chi nhánh / khu vực
- Tỷ lệ sử dụng voucher

---

## XII. GỢI Ý KIẾN TRÚC HỆ THỐNG

### 1. Cổng khách hàng
- Web app cho khách hàng

### 2. Backoffice CRM
- Web app cho điều phối, CSKH, quản lý

### 3. Cổng nhân viên
- Web app cho nhân viên thực hiện

### 4. Backend
- Auth
- API nghiệp vụ
- Rule điều phối
- Notification service
- Reporting service

### 5. Database
Các bảng chính nên có:
- Users
- Customers
- CustomerProfiles
- ServiceCatalogs
- Bookings
- BookingStatusLogs
- Employees
- EmployeeSkills
- EmployeeSchedules
- Assignments
- ServiceResults
- Vouchers
- Reviews
- SupportTickets
- Notifications
- AuditLogs

---

## XIII. TÍNH NĂNG NÊN CÓ Ở GIAI ĐOẠN SAU

- Thanh toán online
- Nhắc lịch qua Zalo / SMS / Email
- AI gợi ý phân công tối ưu
- AI tóm tắt hồ sơ khách hàng
- Chat nội bộ giữa điều phối và nhân viên
- Loyalty / điểm thưởng
- Gói dịch vụ định kỳ
- Tích hợp tổng đài / chatbot / landing page
- Tích hợp kế toán / hóa đơn điện tử

---

## XIV. ROADMAP TRIỂN KHAI ĐỀ XUẤT

### Phase 1 - MVP
- Đăng ký / đăng nhập
- Quản lý khách hàng
- Danh mục dịch vụ
- Tạo booking
- Voucher cơ bản
- CRM lưu lịch sử khách hàng
- Điều phối thủ công
- Portal web nhân viên nhận việc và hoàn tất việc
- Đánh giá sau dịch vụ
- Dashboard cơ bản

### Phase 2 - Tối ưu vận hành
- Rule điều phối tự động
- Quản lý ca làm / khu vực / kỹ năng
- Nhắc lịch tự động
- Xử lý đổi lịch / hủy lịch tốt hơn
- Ticket CSKH
- Báo cáo nâng cao

### Phase 3 - Tăng trưởng
- Marketing automation
- Chăm sóc lại tự động
- Loyalty
- Thanh toán online
- Tích hợp đa kênh

---

## XV. RỦI RO NẾU XÂY HỆ THỐNG KHÔNG ĐÚNG

### 1. Chỉ làm lịch hẹn mà không có CRM
Rủi ro:
- Có booking nhưng không tích lũy dữ liệu khách hàng
- Không chăm sóc lại được
- Không upsell được

### 2. Không chuẩn hóa hồ sơ dịch vụ / bệnh án
Rủi ro:
- Nhân viên không có đủ thông tin trước khi thực hiện
- Chất lượng dịch vụ không đồng đều

### 3. Không có engine điều phối
Rủi ro:
- Xếp lịch thủ công dễ sai
- Trùng lịch, quá tải, bỏ sót khách

### 4. Không có vòng phản hồi sau dịch vụ
Rủi ro:
- Không biết chất lượng thực tế
- Không phát hiện sớm khiếu nại

### 5. Không có audit log
Rủi ro:
- Khó truy vết ai đổi lịch, ai phân công, ai sửa dữ liệu

---

## XVI. KẾT LUẬN

Từ hình ảnh, hệ thống cần được hiểu không chỉ là web đặt lịch mà là một **CRM dịch vụ có trung tâm dữ liệu**, nơi:

- khách hàng đi từ đăng ký đến đặt lịch
- CRM lưu toàn bộ hồ sơ và lịch sử
- hệ thống điều phối đúng nhân viên
- nhân viên thực hiện và cập nhật kết quả
- khách hàng đánh giá để CSKH và quản lý kiểm soát chất lượng

Tóm gọn:

**CRM này phải gồm 5 lớp chính:**
- Cổng khách hàng
- Booking engine
- CRM data center
- Điều phối và cổng web nhân viên
- Đánh giá và CSKH

Nếu cần dựng thật, nên bắt đầu từ **MVP booking + CRM hồ sơ khách hàng + điều phối + cổng web nhân viên + đánh giá sau dịch vụ**, sau đó mới mở rộng sang tự động hóa và tăng trưởng.
