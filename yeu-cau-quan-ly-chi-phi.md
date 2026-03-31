# YÊU CẦU HỆ THỐNG QUẢN LÝ CHI PHÍ & GIÁM SÁT GIÁ THÀNH

> Tổng hợp từ: *Câu hỏi khảo sát HT quản lý Chi phí (1).xlsx* – Q&A lần 1 + Q&A bổ sung 10.2

---

## I. TỔNG QUAN DỰ ÁN

| Hạng mục | Nội dung |
|---|---|
| **Tên hệ thống** | Hệ thống Quản lý Chi phí & Giám sát Giá thành |
| **Khách hàng** | Công ty Khai thác Than (Thành viên TKV) |
| **Quy mô người dùng** | ~200 người |
| **Triển khai** | 2026: Thử nghiệm · 2027: Vận hành chính thức |
| **Nền tảng** | Web-based, On-premise Server nội bộ |
| **Ngôn ngữ** | Tiếng Việt |

---

## II. NGƯỜI DÙNG & PHÂN QUYỀN

### 2.1 Đối tượng người dùng
- **Ban Giám đốc**: Xem báo cáo tổng hợp, phê duyệt cấp cao
- **Trưởng phòng**: Phòng Đầu tư, KHTH, KTTK-TC, Vật tư
- **Cán bộ nghiệp vụ**: Phòng Kế hoạch, Kế toán, Vật tư
- **Phân xưởng**: Quản đốc + nhân viên kinh tế phân xưởng

### 2.2 Cơ chế phân quyền
- **Theo cấp quản lý**: BGĐ → Phòng ban → Phân xưởng
- **Theo nhiệm vụ**: Nhập liệu / Kiểm tra / Phê duyệt / Xem báo cáo
- **Theo phạm vi dữ liệu**: Phân xưởng chỉ thấy chi phí phân xưởng mình; Phòng Đầu tư thấy toàn bộ chi phí dự án đầu tư
- **Theo diện sản xuất**: Phân quyền theo loại hình sản xuất

---

## III. VẤN ĐỀ HIỆN TẠI

| # | Vấn đề | Mô tả chi tiết |
|---|---|---|
| 1 | **Dữ liệu phân mảnh** | Chi phí nằm rải rác ở Excel, phần mềm kế toán, báo cáo sản xuất; mỗi phần mềm chỉ quản lý riêng lĩnh vực của mình |
| 2 | **Độ trễ báo cáo** | Cuối tháng/quý mới có báo cáo → khi phát hiện vượt định mức thì sự đã rồi |
| 3 | **Nhập liệu thủ công** | Phân xưởng theo dõi sản lượng trên Excel, dễ sai sót, tổng hợp chậm |
| 4 | **Rủi ro pháp lý** | Khó kiểm soát tuân thủ định mức TKV → dễ sai sót trong quyết toán dự án đầu tư |
| 5 | **Thiếu liên thông** | Phải thu thập thủ công từ các phòng ban để tổng hợp trên Excel |

---

## IV. PHẠM VI NGHIỆP VỤ CẦN QUẢN LÝ

### 4.1 Các yếu tố chi phí cần quản lý
1. **Chi phí vật tư trực tiếp** (nguyên, nhiên liệu)
2. **Chi phí nhân công** (theo từng phân xưởng)
3. **Chi phí máy móc, thiết bị** (khấu hao + sửa chữa)
4. **Chi phí điện năng**
5. **Chi phí chung khác** (phân xưởng, dịch vụ...)

### 4.2 Cơ cấu chi phí theo mô hình
- **Cost Center** (Trung tâm chi phí): Theo từng phân xưởng + toàn Công ty
- **Công đoạn sản xuất**: Chi tiết theo từng công đoạn
- **Đơn vị sản phẩm**: Giá thành theo **tấn than**, **mét lò**

### 4.3 Kết nối nghiệp vụ liên quan
- Kế hoạch sản xuất
- Quản lý vật tư
- Quản lý thiết bị (khấu hao, sửa chữa)
- Quản lý dự án đầu tư (tiến độ giải ngân)

---

## V. YÊU CẦU CHỨC NĂNG CHI TIẾT

### 5.1 Quản trị Hệ thống & Danh mục

| # | Chức năng | Mô tả |
|---|---|---|
| 1 | Quản lý người dùng & phân quyền | Phân quyền 3 cấp: BGĐ → Phòng → Phân xưởng; theo nhiệm vụ & phạm vi dữ liệu |
| 2 | Danh mục Trung tâm Chi phí | CRUD Cost Center theo phân xưởng, phòng ban, toàn công ty |
| 3 | Danh mục Yếu tố Chi phí | CRUD yếu tố chi phí (vật tư, nhân công, điện, khấu hao, ...) |
| 4 | Danh mục Công đoạn Sản xuất | CRUD công đoạn SX; liên kết với Cost Center |
| 5 | Danh mục Phân xưởng & Đơn vị | CRUD phân xưởng, đơn vị tổ chức |

### 5.2 Quản lý Định mức Kỹ thuật

| # | Chức năng | Mô tả |
|---|---|---|
| 1 | Định mức vật tư / nhiên liệu | CRUD định mức theo công đoạn SX; nhập đơn giá |
| 2 | Định mức nhân công | CRUD định mức lao động theo công đoạn / phân xưởng |
| 3 | Định mức điện năng | CRUD định mức tiêu thụ điện theo phân xưởng |
| 4 | Lịch sử & phiên bản định mức | Lưu lịch sử thay đổi; xem định mức theo thời điểm |
| 5 | Cảnh báo vượt định mức | Cấu hình ngưỡng cảnh báo (%); thông báo tự động khi vượt |

### 5.3 Kế hoạch Chi phí

| # | Chức năng | Mô tả |
|---|---|---|
| 1 | Lập kế hoạch chi phí năm/quý/tháng | Nhập kế hoạch chi phí tổng thể; phân kỳ |
| 2 | Phân bổ kế hoạch theo Cost Center & yếu tố | Phân bổ chi tiết xuống từng phân xưởng, từng yếu tố chi phí |
| 3 | Workflow phê duyệt kế hoạch | Luồng phê duyệt đa cấp (phòng → BGĐ) |
| 4 | Theo dõi tỷ lệ thực hiện kế hoạch | So sánh thực tế vs kế hoạch theo kỳ |

### 5.4 Tập hợp Chi phí Thực tế

| # | Chức năng | Mô tả |
|---|---|---|
| 1 | Thu thập chi phí vật tư từ Esoft | Lấy dữ liệu xuất kho vật tư từ phần mềm vật tư Esoft |
| 2 | Thu thập chi phí lương từ ISA | Lấy dữ liệu lương phân xưởng từ phần mềm lương ISA |
| 3 | Thu thập chi phí khấu hao / sửa chữa thiết bị | Lấy từ phần mềm kế toán; tính khấu hao tự động |
| 4 | Thu thập chi phí điện năng | Nhập hoặc lấy từ hệ thống điện; phân bổ theo phân xưởng |
| 5 | Nhập bổ sung chi phí chung | Form nhập thủ công chi phí chung phân xưởng |
| 6 | Phân bổ chi phí chung | Phân bổ theo tiêu thức (sản lượng, diện tích, nhân công...) |
| 7 | Đối soát & điều chỉnh cuối kỳ | Ghi nhận bút toán điều chỉnh; phê duyệt |

### 5.5 Tính Giá thành Sản phẩm

| # | Chức năng | Mô tả |
|---|---|---|
| 1 | Tập hợp chi phí theo phân xưởng / công đoạn | Tổng hợp toàn bộ yếu tố chi phí theo đối tượng |
| 2 | Tính giá thành theo tấn than | Giá thành đơn vị = Tổng chi phí / Sản lượng than |
| 3 | Tính giá thành theo mét lò | Giá thành đơn vị = Tổng chi phí / Mét lò đào |
| 4 | Phân tích biến động giá thành | So sánh thực tế vs định mức vs kế hoạch; phân tích nguyên nhân |

### 5.6 Tích hợp Hệ thống Ngoài

| # | Hệ thống nguồn | Dữ liệu cần lấy | Phương thức |
|---|---|---|---|
| 1 | **Phần mềm Kế toán Esoft** | Hạch toán chi phí, khấu hao, giá thành | Database Link (SQL Server/Oracle) |
| 2 | **Phần mềm Lương ISA** | Chi phí nhân công theo phân xưởng | Database Link |
| 3 | **Phần mềm Vật tư Esoft** | Chi phí xuất kho vật tư, nhiên liệu | Database Link |
| 4 | **Phần mềm HMO** | Khối lượng mỏ, sản lượng (tấn than, mét lò) | Database Link |
| - | **Tần suất đồng bộ** | Hàng ca / hàng ngày | Scheduled Job |
| - | **Master Data** | Mã vật tư, mã nhân viên cơ bản đã thống nhất | Cần mapping |

> **Lưu ý kỹ thuật**: Các phần mềm hiện tại chưa hỗ trợ API. Phương thức ưu tiên là **Webservice** hoặc **Database Link**. Dữ liệu nhập **1 lần duy nhất**, tự động kết chuyển sang các phần mềm liên quan.

### 5.7 Báo cáo & Phân tích Chi phí

| # | Báo cáo | Mô tả |
|---|---|---|
| 1 | Dashboard tổng quan chi phí | KPI chi phí theo ca/ngày; biểu đồ biến động |
| 2 | Báo cáo chi phí theo Cost Center | Chi phí từng phân xưởng, phòng ban theo kỳ |
| 3 | Báo cáo chi phí theo yếu tố | Vật tư / Nhân công / Khấu hao / Điện / Chi phí chung |
| 4 | Báo cáo biến động chi phí | Thực tế vs Kế hoạch vs Định mức; phân tích chênh lệch |
| 5 | Báo cáo giá thành sản phẩm | Giá thành tấn than, mét lò theo kỳ / phân xưởng |
| 6 | Báo cáo cảnh báo vượt định mức | Danh sách vượt định mức; % vượt; nguyên nhân |
| 7 | Xuất báo cáo Excel / PDF | Tất cả báo cáo hỗ trợ xuất Excel & PDF |

---

## VI. YÊU CẦU KỸ THUẬT

| Hạng mục | Yêu cầu |
|---|---|
| **Nền tảng** | Web-based (không cần mobile) |
| **Hạ tầng** | On-premise Server nội bộ |
| **Tích hợp** | Database Link (SQL Server / Oracle) → Webservice |
| **Tần suất đồng bộ** | Hàng ca / hàng ngày (không cần real-time) |
| **Bảo mật** | Phân quyền theo cấp; dữ liệu phân xưởng cô lập |
| **Hiệu năng** | Tổng ~200 người dùng đồng thời |
| **Master Data** | Mã định danh cơ bản đã thống nhất giữa các phần mềm |
| **Cập nhật định mức** | Định mức vật tư cố định; tự động tính lại khi dữ liệu đầu vào thay đổi |

---

## VII. QUY TRÌNH PHÊ DUYỆT

- **Có nhiều cấp phê duyệt**, cần đơn giản hóa để linh hoạt và thuận tiện
- Luồng phê duyệt mẫu: **Nhập liệu → Kiểm tra → Phê duyệt cấp phòng → Phê duyệt BGĐ**
- Workflow cấu hình linh hoạt, không cứng nhắc

---

## VIII. TIMELINE & TRIỂN KHAI

| Giai đoạn | Thời gian | Nội dung |
|---|---|---|
| **Thử nghiệm** | 2026 | Triển khai pilot tại 1-2 phân xưởng |
| **Vận hành chính thức** | 2027 | Roll-out toàn công ty |

**Quy trình lựa chọn nhà thầu**: Lập dự toán → Thẩm định → Phê duyệt dự toán → Đấu thầu theo quy định TKV  
**Phòng ban tham gia thẩm định**: KHTH, KTTK-TC, Vật tư, TCLĐ, CĐVT, ĐKSX, KTM, ĐTM

---

## IX. KẾT LUẬN & ĐỀ XUẤT PHẠM VI

### Phạm vi đề xuất triển khai (Phase 1 - 2026)

| Module | Ưu tiên |
|---|---|
| Quản trị hệ thống & Danh mục | P0 - Bắt buộc |
| Quản lý Định mức Kỹ thuật | P0 - Bắt buộc |
| Tập hợp Chi phí Thực tế | P0 - Bắt buộc |
| Tính Giá thành Sản phẩm | P0 - Bắt buộc |
| Kế hoạch Chi phí | P1 - Quan trọng |
| Báo cáo & Phân tích Chi phí | P1 - Quan trọng |
| Tích hợp Hệ thống Ngoài | P1 - Quan trọng |
