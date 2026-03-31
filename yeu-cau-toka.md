# KIẾN TRÚC TOKA APP
### Nền tảng Công nghệ Quản trị Hệ sinh thái · Nội thất – Xây dựng – Bất động sản – Tài chính

> **CÔNG TY CỔ PHẦN TOKA HOLDING** · IPO-Ready Ecosystem Structure  
> Người sáng lập: KS. Đỗ Văn Nhẫm · Thái Nguyên, 03/2026

---

## TỔNG QUAN

> **TOKA App không được xây như một app bán hàng.**  
> Nó phải là **hạ tầng điều phối dòng tiền + dữ liệu + vận hành + tăng trưởng** của toàn hệ sinh thái TOKA.

- **TOKA Tech** được định vị là: `Data Engine` + `Valuation Engine`
- **Platform** có 3 lớp: `Internal Platform` · `Ecosystem Platform` · `Commercial Platform`

---

## 1. TƯ TƯỞNG GỐC CỦA TOKA APP

TOKA App phải phục vụ cùng lúc **4 việc**:

| # | Mục tiêu | Mô tả |
|---|---|---|
| 1 | **Kiểm soát khách hàng** | Từ lead, báo giá, chốt sale, chăm sóc sau bán, bảo hành, upsell → Xương sống của Commerce & Customer Engine |
| 2 | **Kiểm soát vận hành toàn chuỗi** | Từ sản xuất, tồn kho, giao hàng, thi công, nghiệm thu, bảo hành → Hạ tầng nội bộ bắt buộc |
| 3 | **Kiểm soát dữ liệu tập đoàn** | Sản phẩm, khách hàng, công trình, đại lý, đối tác, dòng tiền, hiệu suất → Data là **tài sản chiến lược** |
| 4 | **Thương mại hoá nền tảng về sau** | CRM ngành nội thất, app quản lý công trình, marketplace nội thất – xây dựng |

---

## 2. KIẾN TRÚC CHIẾN LƯỢC (3 TẦNG)

---

### Tầng A – INTERNAL PLATFORM *(dùng cho nội bộ TOKA)*

#### A1. CRM Khách hàng
- Lead từ: Facebook, TikTok, Zalo, Website, Showroom
- Phân loại khách: sofa / nội thất / thi công / nhà ở
- Lịch sử chăm sóc · Báo giá · Chốt đơn
- Chăm sóc sau bán · Remarketing

> **Module phải làm đầu tiên.** Không có CRM = mất tiền ngu.

#### A2. ERP Vận hành
- SKU sản phẩm · Giá chuẩn · Định mức
- Tồn kho · Lệnh sản xuất · Mua hàng
- Giao hàng · Công nợ · Bảo hành · Tiến độ đơn hàng

> Mỗi sản phẩm phải có mã SKU, biên lợi nhuận rõ, hạn chế custom quá nhiều.

#### A3. Project / Construction Management
- Công trình · Thiết kế · Dự toán
- Tiến độ thi công · Vật tư · Nhân sự công trình
- Nghiệm thu · Bảo hành · Nhà thầu phụ

> Cầu nối sống còn giữa Building ↔ Factory ↔ Commerce.

#### A4. Treasury & Cash Control
- Dòng tiền vào/ra · Công nợ phải thu/phải trả
- Đối chiếu dòng tiền từng công ty · Cash pooling
- Cảnh báo nghẽn tiền
- Hiệu suất vốn theo showroom / công trình / xưởng

> Mọi tiền phải về một chỗ. TOKA Capital là bộ máy phân bổ vốn.

#### A5. KPI Dashboard *(Realtime)*
| Nhóm KPI | Chỉ số |
|---|---|
| Tài chính | Doanh thu · EBITDA · FCF |
| Vận hành | Tồn kho · Hiệu suất showroom · Hiệu suất xưởng · Hiệu suất thi công |
| Khách hàng | CAC · LTV · Tỷ lệ chốt · Tỷ lệ quay lại |
| Số hoá | Data size · Tỷ lệ số hoá |

> Không ra quyết định nếu không có số.

#### A6. Admin & Governance
- Phân quyền · Quy trình phê duyệt
- Hồ sơ pháp lý · Hợp đồng · ESOP
- Nhật ký thao tác · Kiểm soát nội bộ

---

### Tầng B – ECOSYSTEM PLATFORM *(kết nối hệ sinh thái mở rộng)*

#### B1. Cổng Khách hàng
- Xem sản phẩm / combo / báo giá
- Xem tiến độ đơn hàng / thi công
- Xem lịch bảo hành · Đặt lịch khảo sát · Yêu cầu hỗ trợ

#### B2. Cổng Showroom / Đại lý / CTV
- Nhận lead · Tạo đơn · Kiểm tra tồn · Đặt hàng
- Theo dõi thưởng & doanh số
- Lấy tài liệu bán hàng · Xem giá sỉ / chính sách

> Bám đúng logic: scale qua showroom + đại lý + CTV.

#### B3. Cổng Nhà cung cấp / Xưởng vệ tinh
- Nhận PO (Đơn đặt hàng) · Cập nhật tiến độ
- Giao nhận · Đối soát chất lượng
- Xử lý bảo hành · Lưu tiêu chuẩn kỹ thuật

> Phù hợp mô hình xưởng vệ tinh, OEM/ODM – giảm CAPEX, giữ tiêu chuẩn.

#### B4. Cổng Thầu / Đội thi công / Kiến trúc sư
Đối tượng: Builder · Kiến trúc sư · Đội thi công liên kết · Môi giới nhà ở
- Tiếp nhận dự án · Cộng tác báo giá
- Quản lý checklist công trình
- Tải bản vẽ / tiêu chuẩn · Đối soát nghiệm thu

#### B5. Cổng Nhà đầu tư nội bộ / Đối tác vốn
- Dashboard tổng quan · Dự án SPV
- Tiến độ vốn · Kết quả kinh doanh
- Tài liệu IR (Investor Relations)

> Ăn thẳng vào logic: TOKA Capital · IR Office · SPV Platform.

---

### Tầng C – COMMERCIAL PLATFORM *(cú nổ định giá)*

> Sau khi TOKA dùng nội bộ ngon → bán ra ngoài thị trường.

| Module | Đối tượng mua |
|---|---|
| **C1. CRM ngành nội thất** | Showroom nội thất · Xưởng sofa · Cửa hàng vật liệu · Đơn vị thi công nhỏ |
| **C2. App quản lý công trình** | Đội thi công dân dụng · Đơn vị nội thất · Tổng thầu nhỏ · KTS / Builder |
| **C3. Marketplace nội thất – xây dựng** | Nhà máy ↔ Showroom ↔ Builder ↔ KTS ↔ Nhà cung cấp ↔ Khách hàng cuối |

> Nguồn thu dài hạn: **Subscription + Phí giao dịch + Data Monetization**.

---

## 3. CẤU TRÚC NGƯỜI DÙNG (ROLE-BASED PLATFORM)

| Nhóm | Đối tượng |
|---|---|
| **1. Nội bộ Holding** | Chủ tịch / Ban chiến lược · Tài chính tập đoàn · TOKA Capital · Kiểm soát nội bộ · Chuyển đổi số |
| **2. Nội bộ Công ty con** | Factory · Commerce · Building · Real Estate · Tech |
| **3. Kênh bán** | Showroom · Sales · Đại lý · CTV · Affiliate |
| **4. Đối tác thực thi** | Nhà cung cấp · Xưởng vệ tinh · Thầu phụ · Đội thi công · KTS |
| **5. Khách hàng** | Khách mua lẻ · Khách combo · Khách thi công · Khách nhà ở · Khách bảo hành |
| **6. Nhà đầu tư / Đối tác vốn** | Angel · Strategic Partner · SPV Partner · IR Viewer |

---

## 4. 10 MODULE NỀN TẢNG BẮT BUỘC

| # | Module | Tính năng chính |
|---|---|---|
| 1 | **Product Hub** | SKU · Catalog · Bộ sưu tập · Combo · Asset product · Chính sách giá |
| 2 | **Customer CRM** | Lead · Pipeline · Telesales · CSKH · Automation · Loyalty · Bảo hành |
| 3 | **Sales Engine** | POS / Đơn hàng · Báo giá · Hợp đồng · Upsell/Cross-sell · Showroom performance |
| 4 | **Factory OS** | BOM · Lệnh sản xuất · Theo dõi tiến độ · QC · Kho · Giao nhận |
| 5 | **Building OS** | Khảo sát · Thiết kế · BOQ · Thi công · Nghiệm thu · Hậu mãi |
| 6 | **Partner Hub** | Đại lý · CTV · Builder · KTS · OEM/ODM · Xưởng vệ tinh |
| 7 | **Finance & Treasury** | Dòng tiền · Công nợ · Treasury · Cash pooling · Budget · ROI theo dự án |
| 8 | **Data & BI Center** | Dashboard · Cohort KH · Heatmap SP · Conversion funnel · Profitability by SKU/Region |
| 9 | **Marketplace Layer** | Đăng SP/dịch vụ · Matching cung cầu · Thanh toán · Phí giao dịch · Đánh giá uy tín |
| 10 | **IR / Capital Layer** | SPV room · Dữ liệu gọi vốn · Investor report · Cap table view · Deal room |

---

## 5. LUỒNG DỮ LIỆU CHUẨN

```
Lead vào
  → CRM tiếp nhận
  → Sales tư vấn
  → Chốt đơn / Khảo sát
      ├─ Hàng lẻ       → Commerce + Factory
      ├─ Giải pháp     → Building
      └─ Nhà ở/Dự án   → Real Estate / SPV
  → Tiền thu về Treasury
  → Dashboard cập nhật realtime
  → Data quay lại Remarketing / Upsell / Phân bổ vốn
```

> **Chu trình:**  
> `Factory → Commerce → Building → Real Estate → Capital → Scale`

---

## 6. CẤU TRÚC CƠ SỞ DỮ LIỆU LÕI (DATA SPINE)

| Cụm dữ liệu | Nội dung |
|---|---|
| **Master Customer** | Khách hàng · Hộ gia đình · Doanh nghiệp · Nhà đầu tư |
| **Master Product** | SKU · Combo · BOM · Giá · Biên lợi nhuận |
| **Master Partner** | Đại lý · CTV · Builder · KTS · Supplier · Xưởng vệ tinh |
| **Master Project** | Công trình · Nhà ở · Thi công · SPV |
| **Master Transaction** | Đơn hàng · Hợp đồng · Thanh toán · Công nợ |
| **Master Asset** | Tài sản · Quỹ đất · Sản phẩm nhà ở · Hồ sơ pháp lý |
| **Master Finance** | Ngân sách · Dòng tiền · Phân bổ vốn · Treasury |
| **Master Performance** | KPI · Conversion · Retention · Hiệu suất vận hành |

> Không có data spine → app đẹp chỉ là app "để nhìn", không phải app "để điều hành".

---

## 7. ROADMAP XÂY DỰNG TOKA APP

### Giai đoạn 1: 0 – 6 tháng *(Cứu Commerce trước)*
- CRM lead
- Quản lý sản phẩm SKU
- Báo giá / Đơn hàng
- CSKH
- Dashboard sale cơ bản

> **Mục tiêu:** Commerce fail là chết thật.

### Giai đoạn 2: 6 – 12 tháng *(Build vận hành)*
- ERP kho / đơn / giao hàng
- Quản lý showroom & đại lý / CTV
- Remarketing
- Quản lý thi công cơ bản

### Giai đoạn 3: 12 – 24 tháng *(Build hệ sinh thái)*
- App khách hàng
- App đại lý
- App đối tác thi công
- Treasury dashboard
- BI nâng cao
- App quản lý công trình hoàn chỉnh

### Giai đoạn 4: Sau 24 tháng *(Thương mại hoá)*
- SaaS
- Marketplace
- Investor room / SPV room
- External API

---

## 8. KIẾN TRÚC TỔ CHỨC VẬN HÀNH

| Vai trò | Người / Số lượng |
|---|---|
| Product Owner | Đỗ Nhẫm (hoặc người giữ tư duy hệ) |
| Business Analyst | Bóc quy trình sale, factory, building |
| Tech Lead | 1 người |
| Developer | 2–4 người |
| UI/UX | 1 người |
| Data / BI | 1 người |
| Triển khai & đào tạo | 1 người |
| Key User từng công ty con | Mỗi công ty con 1 đầu mối |

> **TOKA App phải do business kéo, không phải dev kéo.**

---

## 9. 12 KPI CHÍNH CỦA TOKA APP

| # | KPI | Ý nghĩa |
|---|---|---|
| 1 | Số lead/ngày | Đo lường đầu vào Marketing |
| 2 | Tỷ lệ chuyển đổi lead → đơn | Hiệu quả Sales |
| 3 | CAC (Chi phí thu hút KH) | Hiệu quả Marketing spend |
| 4 | LTV (Giá trị vòng đời KH) | Chất lượng khách hàng |
| 5 | Tỷ lệ khách quay lại | Loyalty & CSKH |
| 6 | Doanh thu theo showroom | Hiệu suất kênh bán |
| 7 | Doanh thu theo sales | Hiệu suất cá nhân |
| 8 | Biên lợi nhuận theo SKU | Sức khoẻ sản phẩm |
| 9 | Tiến độ giao hàng đúng hạn | Chất lượng vận hành |
| 10 | Tỷ lệ số hoá quy trình | Mức độ chuyển đổi số |
| 11 | Số user hoạt động | Adoption rate |
| 12 | Tỷ lệ doanh thu hỗ trợ bởi nền tảng số | ROI của toàn hệ thống |

---

## 10. KẾT LUẬN

> **TOKA App = CRM + ERP + Project Management + Treasury + Data BI + Ecosystem Connector + Marketplace + IR/Capital Layer**

---

**TOKA App không phải app bán nội thất.**  
**TOKA App là hệ điều hành của TOKA Holding.**

Nó phải giúp TOKA:
- Giữ **khách**
- Giữ **dữ liệu**
- Giữ **dòng tiền**
- Giữ **tiêu chuẩn**
- Giữ **quyền điều phối hệ sinh thái**

**→ Và về sau bán chính cái nền tảng đó ra thị trường.**
