# YÊU CẦU BRIEF
## INTERNAL OPERATION SYSTEM
**KPI – Payroll – Check-in – Roster – Performance**

---

## I. TỔNG QUAN SẢN PHẨM
Hệ thống là một **web app nội bộ, mobile-first** dành cho mô hình vận hành F&B, giúp quản lý tập trung các nghiệp vụ:

- Check-in / check-out nhân viên
- KPI cá nhân và KPI team
- Payroll và thu nhập
- Complaint / waste / vi phạm
- Roster và phân ca
- Duyệt dữ liệu và khóa dữ liệu
- Báo cáo vận hành cho quản lý, GM và HR

### Mục tiêu chính
- Minh bạch dữ liệu vận hành
- Nhập liệu nhanh, dễ tra cứu
- Tự động hóa lương theo hiệu suất
- Giảm phụ thuộc Excel thủ công
- Tăng khả năng kiểm soát toàn hệ thống

---

## II. MỤC TIÊU NGƯỜI DÙNG

### 1. Nhân viên
Có thể:
- Check-in đúng địa điểm
- Xem KPI cá nhân
- Xem lương / thu nhập dự kiến
- Xem vi phạm và lý do bị trừ điểm

### 2. Supervisor / Manager
Có thể:
- Nhập dữ liệu cuối ca
- Quản lý team
- Theo dõi KPI team
- Quản lý roster / đổi ca / xác nhận attendance

### 3. General Manager
Có thể:
- Theo dõi toàn bộ hệ thống
- Duyệt complaint / waste / điều chỉnh điểm
- Chấm KPI quản lý
- Khóa dữ liệu theo ngày / tháng

### 4. HR / Payroll
Có thể:
- Xem payroll dashboard
- Xem chi tiết lương từng nhân viên
- Xuất Excel / PDF
- Chốt payroll theo kỳ

---

## III. ĐỊNH HƯỚNG THIẾT KẾ

### 1. Tone & Feel
- Premium nhưng không corporate
- Tối giản, rõ ràng, dễ hiểu
- Mang vibe F&B hiện đại
- Calm nhưng sắc
- High contrast, dễ đọc trên mobile

### 2. Keyword hình ảnh
- Clean
- Dark + neutral
- Card-based
- Mobile-first
- Premium minimal

### 3. Color System
- **Primary:** `#1A1A1A`
- **Secondary:** `#F5F5F5`
- **Success:** xanh lá muted
- **Danger:** đỏ muted
- **Warning:** vàng nhạt

### 4. Typography
- **Heading:** serif nhẹ, editorial feel
- **Body:** sans (Inter / Satoshi)

### 5. Nguyên tắc layout
- Mobile-first (90% thao tác trên điện thoại)
- Card-based UI
- Không scroll dài vô tận
- Mỗi màn hình chỉ phục vụ 1 mục tiêu rõ ràng
- Ưu tiên thao tác nhanh hơn nhồi nhiều thông tin

---

## IV. KIẾN TRÚC MODULE

### 1. MODULE NHÂN VIÊN

#### 1.1 Home
Hiển thị:
- KPI hiện tại
- Thu nhập dự kiến
- Rank
- Alert / warning

#### 1.2 Check-in
Chức năng:
- Check-in / check-out
- GPS bắt buộc
- Hiển thị giờ, vị trí, trạng thái hợp lệ
- Optional: selfie check-in

#### 1.3 KPI cá nhân
Hiển thị:
- KPI breakdown: AOV / speed / feedback / etc.
- Điểm KPI chi tiết
- Lý do cộng / trừ điểm
- Xu hướng theo tuần / tháng

#### 1.4 Lương
Hiển thị:
- Base salary
- KPI bonus
- Tips
- Penalty
- Tổng thu nhập

#### 1.5 Vi phạm
Hiển thị:
- Complaint
- Waste
- Đi trễ / sai ca
- Trạng thái: pending / approved / rejected

---

### 2. MODULE SUPERVISOR / MANAGER

#### 2.1 Dashboard ca
Hiển thị:
- Doanh thu ca
- KPI team
- Cảnh báo nhân viên
- Attendance issue

#### 2.2 Nhập liệu cuối ca (module quan trọng nhất)
Form gồm:

**A. Doanh thu**
- Tổng doanh thu ca
- Theo nhân viên

**B. KPI mềm**
- Speed
- Thái độ
- Teamwork
- Các tiêu chí mềm khác

**C. Complaint**
- Chọn nhân viên
- Level: L1 / L2 / L3
- Note
- Attachment optional

**D. Waste**
- Item
- Giá trị
- Loại lỗi: cá nhân / hệ thống

**E. Attendance confirm**
- Ai đi đủ / thiếu
- Ai sai ca / quên check-out

Yêu cầu:
- Nhập nhanh
- Không quá 3–5 phút / ca
- Nên dùng wizard / step form thay vì form dài

#### 2.3 Roster
- Xem lịch ca
- Assign ca
- Approve đổi ca
- Kiểm soát thiếu / dư nhân sự

---

### 3. MODULE GENERAL MANAGER

#### 3.1 Dashboard tổng
Hiển thị:
- Doanh thu toàn hệ thống
- KPI toàn hệ thống
- Top / bottom performer
- Cảnh báo vận hành
- Dữ liệu chờ duyệt

#### 3.2 Duyệt dữ liệu
Bao gồm:
- Complaint
- Waste
- Điều chỉnh điểm nếu cần

Action:
- Approve
- Reject
- Request edit

#### 3.3 Chấm KPI quản lý
Các tiêu chí gợi ý:
- Training
- Turnover
- Ownership
- Compliance
- Team performance

#### 3.4 Khóa dữ liệu
- Khóa ngày
- Khóa tháng
- Sau khi khóa: không ai được sửa dữ liệu

---

### 4. MODULE HR / PAYROLL

#### 4.1 Payroll dashboard
Hiển thị:
- Tổng lương
- Breakdown từng nhân viên
- Trạng thái kỳ lương

#### 4.2 Payroll detail
Hiển thị:
- Base
- KPI bonus
- Tips
- Penalty
- Adjustment
- Total payout

#### 4.3 Export
- Excel
- PDF

Mục tiêu:
- HR không cần Excel thủ công
- Dữ liệu final lấy từ processed layer, không lấy trực tiếp từ raw input

---

## V. DATABASE CORE SYSTEM

### Các bảng bắt buộc
- Users
- Employees
- Roles
- Locations
- Rosters
- AttendanceLogs
- ShiftReports
- RevenueLogs
- FeedbackLogs
- ComplaintLogs
- WasteLogs
- KPIResults
- PayrollPeriods
- PayrollDetails
- ApprovalLogs

### Đề xuất bổ sung
- AuditLogs
- DataLocks
- KPIRules
- PayrollRules
- Attachments

### Phân lớp dữ liệu

#### 1. Identity & Org
- Users
- Employees
- Roles
- Locations

#### 2. Raw Operational Input
- Rosters
- AttendanceLogs
- ShiftReports
- RevenueLogs
- FeedbackLogs
- ComplaintLogs
- WasteLogs

#### 3. Processed Data
- KPIResults
- PayrollPeriods
- PayrollDetails

#### 4. Governance
- ApprovalLogs
- AuditLogs
- DataLocks

---

## VI. PHÂN QUYỀN

### Nhân viên
- Chỉ thấy dữ liệu của mình
- Không được sửa KPI / payroll / logs

### Supervisor
- Thấy team mình
- Được nhập dữ liệu
- Không được tự duyệt dữ liệu do mình nhập

### Manager
- Thấy bộ phận phụ trách
- Có quyền duyệt trong phạm vi được phân
- Không có full payroll access

### GM
- Full access hệ thống
- Approve + lock data

### HR
- Chỉ payroll và export
- Không sửa raw operational data nếu không có quyền riêng

---

## VII. FLOW VẬN HÀNH

### Trước ca
- Roster được assign
- Nhân viên biết ca làm

### Đầu ca
- Nhân viên check-in
- Hệ thống xác minh GPS / thời gian / ca làm

### Cuối ca
- Supervisor / Manager nhập dữ liệu cuối ca

### Cuối ngày
- GM hoặc role được phân quyền duyệt dữ liệu

### Cuối tháng / kỳ lương
- HR chốt payroll
- Xuất bảng lương

---

## VIII. NGUYÊN TẮC HỆ THỐNG

### 1. Không ai vừa nhập vừa duyệt
- Tách role nhập và role duyệt
- Người tạo dữ liệu không được tự approve chính dữ liệu đó

### 2. Có audit log
- Ghi lại ai tạo / sửa / duyệt
- Lưu thay đổi trước / sau
- Có timestamp đầy đủ

### 3. Có lock data
- Lock theo ngày / tháng
- Sau khi lock không sửa ngược được

### 4. KPI phải explainable
- Có nguồn dữ liệu
- Có rule tính
- Có lý do cộng / trừ
- Có trạng thái approved / pending

---

## IX. KPI & PAYROLL LOGIC

### 1. KPI Engine
Nên tách thành 3 lớp:

#### A. Raw Input
- Check-in
- Doanh thu
- Feedback
- Complaint
- Waste
- Attendance

#### B. Processed KPI
- Tính điểm theo rule
- Weight theo role
- Cộng / trừ từ approved logs

#### C. Payroll Output
- Tính bonus
- Tính penalty
- Ra bảng lương cuối

### 2. Payroll Formula
**Final Salary = Base + KPI Bonus + Tips - Penalty + Adjustments**

Trong đó:
- KPI Bonus lấy từ KPIResults đã approved
- Penalty chỉ lấy dữ liệu vi phạm đã approved
- Tips có thể nhập tay hoặc sync nguồn khác
- Adjustments bắt buộc có lý do và audit log

---

## X. MÀN HÌNH MVP CẦN CÓ

### Employee
- Login
- Home
- Check-in / Check-out
- KPI Detail
- Salary Detail
- Violations
- Profile

### Supervisor / Manager
- Shift Dashboard
- End-of-Shift Entry Wizard
- Team KPI
- Team Attendance
- Roster
- Shift Detail

### GM
- System Dashboard
- Approval Queue
- Manager KPI
- Data Lock Center
- Reports

### HR
- Payroll Dashboard
- Payroll Detail
- Export Center

---

## XI. MVP PHASE ĐỀ XUẤT

### Phase 1 – Core Operation
- Login + role-based access
- Check-in / check-out with GPS
- Roster basic
- End-of-shift entry
- Complaint / waste logging
- Basic dashboards

### Phase 2 – KPI Engine
- KPI breakdown
- Explainable scoring
- Team ranking
- Alerts

### Phase 3 – Payroll Automation
- Payroll periods
- Payroll details
- Auto bonus / penalty
- Export Excel / PDF

### Phase 4 – Governance
- Lock day / month
- Advanced audit trails
- Adjustment workflow
- Optional selfie check-in

---

## XII. TECH STACK ĐỀ XUẤT

### Frontend
- FlutterFlow

### Backend
- Supabase

### Gợi ý triển khai
- Dùng Supabase Auth
- Dùng PostgreSQL làm core database
- Dùng Row Level Security để chặn truy cập sai quyền
- Dùng Storage cho attachment / selfie / export files
- Dùng Edge Functions / cron jobs cho KPI và payroll processing

---

## XIII. RỦI RO CHÍNH

### 1. Build giống Excel
Rủi ro:
- Giao diện rối
- Khó dùng trên mobile
- Tăng thời gian nhập liệu

Giải pháp:
- Wizard flow
- Progressive disclosure
- Card summary + detail

### 2. Phân quyền không chặt
Rủi ro:
- Dữ liệu mất tin cậy
- Dễ tranh cãi nội bộ

Giải pháp:
- Permission matrix rõ
- Không self-approve
- Audit bắt buộc

### 3. KPI không explainable
Rủi ro:
- Nhân viên không hiểu cách chấm điểm
- Mất niềm tin hệ thống

Giải pháp:
- KPI breakdown
- Lý do cộng / trừ
- Link về source logs

### 4. Payroll lấy từ raw data chưa duyệt
Rủi ro:
- Sai lương
- Khó kiểm tra lại

Giải pháp:
- Chỉ tính từ approved + locked processed data

---

## XIV. TIÊU CHÍ THÀNH CÔNG
App phải đạt:
- Dùng tốt 100% trên mobile
- Nhập liệu cuối ca < 5 phút / ca
- Nhân viên hiểu ngay KPI của mình
- HR không cần Excel thủ công
- GM kiểm soát được toàn hệ thống
- Có audit log và data lock đầy đủ

---

## XV. NOTE CHO DEV
- Không build giống Excel
- Không nhồi tất cả vào 1 màn hình
- Ưu tiên UX trước logic phức tạp
- Tách rõ dữ liệu:
  - raw input
  - processed KPI
  - payroll
- Mọi dữ liệu quan trọng phải có audit trail
- Mọi dữ liệu final cần qua flow approve / lock trước khi payroll

---

## XVI. KẾT LUẬN
Đây không phải app HR thông thường mà là **hệ thống vận hành nội bộ cho F&B**, nơi:

- dữ liệu ca làm được ghi nhận theo thời gian thực
- hiệu suất được chấm minh bạch
- vi phạm được kiểm soát qua phê duyệt
- lương được tính từ dữ liệu đã chuẩn hóa
- toàn bộ hệ thống có audit log và data lock

🧭 TỔNG QUAN FLOW TOÀN HỆ THỐNG
4 dòng chính chạy song song mỗi ngày:
Nhân viên → Check-in → Làm việc → Xem KPI
Supervisor → Nhập ca → Gửi dữ liệu
GM → Duyệt → Lock
HR → Payroll → Chi lương
