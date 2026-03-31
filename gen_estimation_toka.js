const ExcelJS = require('exceljs');

// ============================================================
// COLOR PALETTE (matching ERP_Estimation_v2)
// ============================================================
const C = {
  titleBg:    '1F3864', titleFg:   'FFFFFF',
  headerBg:   '2E75B6', headerFg:  'FFFFFF',
  moduleHd:   'D6E4F7', moduleFg:  '1F3864',
  groupBg:    'DEEAF1', groupFg:   '1F3864',
  altRow:     'F2F7FB',
  totalBg:    'FCE4D6', totalFg:   'C00000',
  summaryHd:  'ED7D31', summaryFg: 'FFFFFF',
  green:      '70AD47', yellow:    'FFD966', red: 'FF0000',
};

const complexColor = {
  'Simple':       { bg: 'E2EFDA', fg: '375623' },
  'Medium':       { bg: 'FFEB9C', fg: '9C5700' },
  'Complex':      { bg: 'FFC7CE', fg: '9C0006' },
  'Very Complex': { bg: 'FF0000', fg: 'FFFFFF' },
};

// ============================================================
// DATA — TOKA APP PLATFORM ESTIMATION
// ============================================================
const modules = [
  // ── TẦNG A: INTERNAL PLATFORM ──────────────────────────
  {
    module: 'A1. CUSTOMER CRM',
    groups: [
      {
        group: '1. Quản lý Lead & Pipeline',
        tasks: [
          { task: 'Thu thập lead đa kênh (Facebook, TikTok, Zalo, Website, Showroom)', detail: 'Webhook / API tích hợp các nền tảng; tự động tạo lead; gắn nguồn (UTM); chống trùng', complexity: 'Complex', effort: 6 },
          { task: 'Quản lý pipeline bán hàng (Kanban)', detail: 'Kéo thả lead qua stages; cấu hình pipeline theo loại KH (sofa, nội thất, thi công, nhà ở)', complexity: 'Complex', effort: 5 },
          { task: 'Phân loại & scoring lead tự động', detail: 'Gán điểm theo hành vi (xem SP, nhắn tin, đến showroom); phân loại hot/warm/cold', complexity: 'Complex', effort: 5 },
          { task: 'Phân phối lead cho Sales tự động (round-robin / rule)', detail: 'Cấu hình rule phân lead theo showroom, khu vực, loại SP; cân bằng tải', complexity: 'Medium', effort: 4 },
          { task: 'Lịch sử tương tác & timeline KH', detail: 'Ghi log toàn bộ: gọi, nhắn tin, email, gặp, xem SP; timeline theo dòng thời gian', complexity: 'Medium', effort: 3 },
        ]
      },
      {
        group: '2. Telesales & Chăm sóc KH',
        tasks: [
          { task: 'Quản lý danh sách gọi (Call list) & script telesales', detail: 'Tạo call campaign; gán danh sách KH; script mẫu theo loại SP; ghi kết quả gọi', complexity: 'Medium', effort: 4 },
          { task: 'Lịch hẹn & nhắc nhở tự động', detail: 'Tạo lịch hẹn; nhắc nhở qua app/email/Zalo; đồng bộ Google Calendar', complexity: 'Medium', effort: 3 },
          { task: 'CSKH sau bán hàng (ticket / yêu cầu hỗ trợ)', detail: 'Tạo ticket hỗ trợ; phân loại; workflow xử lý; SLA theo dõi thời gian phản hồi', complexity: 'Complex', effort: 5 },
          { task: 'Quản lý bảo hành sản phẩm', detail: 'Đăng ký bảo hành theo đơn hàng; lịch sử bảo hành; cảnh báo hết hạn; ticket bảo hành', complexity: 'Medium', effort: 4 },
        ]
      },
      {
        group: '3. Marketing Automation & Loyalty',
        tasks: [
          { task: 'Remarketing & automation workflow (email/Zalo/SMS)', detail: 'Workflow tự động: sinh nhật, mua lại, upsell theo segment; trigger theo sự kiện', complexity: 'Complex', effort: 6 },
          { task: 'Chương trình loyalty & tích điểm', detail: 'Tích điểm theo đơn hàng; hạng thành viên; đổi ưu đãi; dashboard KH', complexity: 'Complex', effort: 5 },
          { task: 'Phân khúc KH & cohort analysis', detail: 'Segment theo hành vi, giá trị, tần suất; cohort theo tháng; retention analysis', complexity: 'Complex', effort: 5 },
        ]
      },
    ]
  },
  {
    module: 'A2. PRODUCT HUB',
    groups: [
      {
        group: '1. Quản lý sản phẩm & SKU',
        tasks: [
          { task: 'CRUD sản phẩm & mã SKU', detail: 'Thêm/sửa/xóa SP; mã SKU duy nhất; thông tin: tên, mô tả, hình ảnh, kích thước, chất liệu', complexity: 'Medium', effort: 4 },
          { task: 'Catalog & bộ sưu tập sản phẩm', detail: 'Tạo catalog theo mùa/phong cách; gom SP vào bộ sưu tập; sắp xếp thứ tự', complexity: 'Medium', effort: 3 },
          { task: 'Quản lý combo / giải pháp nội thất', detail: 'Tạo combo từ nhiều SKU; giá combo; biên lợi nhuận; đề xuất combo thông minh', complexity: 'Medium', effort: 4 },
          { task: 'Asset product (sản phẩm đầu tư / nhà ở)', detail: 'Danh mục SP bất động sản; hồ sơ pháp lý; trạng thái; giá; vị trí', complexity: 'Medium', effort: 3 },
        ]
      },
      {
        group: '2. Chính sách giá & BOM',
        tasks: [
          { task: 'Chính sách giá bán (bán lẻ / sỉ / đại lý / CTV)', detail: 'Bảng giá theo nhóm KH; giá theo số lượng; giá theo thời gian; phê duyệt thay đổi giá', complexity: 'Complex', effort: 5 },
          { task: 'BOM (Bill of Material) theo sản phẩm', detail: 'Cấu trúc BOM đa cấp; NVL, nhân công, chi phí SX; tính giá vốn tự động', complexity: 'Complex', effort: 6 },
          { task: 'Quản lý biên lợi nhuận theo SKU', detail: 'Tính margin theo SP/combo; dashboard profitability; cảnh báo margin thấp', complexity: 'Medium', effort: 4 },
        ]
      },
    ]
  },
  {
    module: 'A3. SALES ENGINE',
    groups: [
      {
        group: '1. Báo giá & Đơn hàng',
        tasks: [
          { task: 'Tạo báo giá (Quotation)', detail: 'Chọn SP/combo; áp giá; chiết khấu; ghi chú; in/xuất PDF; gửi email/Zalo cho KH', complexity: 'Medium', effort: 4 },
          { task: 'Chuyển báo giá thành đơn hàng (Sales Order)', detail: 'Convert quotation → SO; điều chỉnh; xác nhận đơn hàng; tự động đẩy xuống Factory/Kho', complexity: 'Medium', effort: 4 },
          { task: 'Quản lý hợp đồng bán hàng', detail: 'CRUD hợp đồng; đính kèm file scan; điều khoản TT; tiến độ TH; workflow phê duyệt', complexity: 'Complex', effort: 5 },
          { task: 'Quản lý POS bán tại showroom', detail: 'Bán hàng tại quầy; quét barcode; thanh toán; in hoá đơn; ca làm việc', complexity: 'Complex', effort: 6 },
        ]
      },
      {
        group: '2. Cross-sell / Upsell & Showroom Performance',
        tasks: [
          { task: 'Đề xuất upsell / cross-sell tự động', detail: 'Gợi ý SP liên quan khi tạo đơn; rule: mua sofa → gợi bàn, thảm, đèn', complexity: 'Complex', effort: 5 },
          { task: 'Đo hiệu suất showroom (Showroom Performance)', detail: 'Doanh thu, lượt KH, tỷ lệ chốt, AOV theo showroom/ngày/tuần/tháng', complexity: 'Complex', effort: 5 },
          { task: 'Đo hiệu suất nhân viên sales', detail: 'KPI theo sales: lead xử lý, tỷ lệ chốt, doanh thu, số KH quay lại', complexity: 'Medium', effort: 4 },
          { task: 'Báo cáo doanh số theo kỳ / KH / SP / showroom', detail: 'Báo cáo đa chiều; so sánh kỳ; top SP; top KH; xuất Excel/PDF', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
  {
    module: 'A4. FACTORY OS',
    groups: [
      {
        group: '1. Quản lý Sản xuất',
        tasks: [
          { task: 'Lệnh sản xuất (Production Order) từ đơn hàng', detail: 'Tự động hoặc thủ công tạo PO từ SO; phân xưởng; ngày bắt đầu/hoàn thành dự kiến', complexity: 'Complex', effort: 5 },
          { task: 'Theo dõi tiến độ sản xuất theo công đoạn', detail: 'Cập nhật % hoàn thành; cảnh báo trễ; Gantt view; mobile cập nhật tại xưởng', complexity: 'Complex', effort: 6 },
          { task: 'Quản lý định mức & chi phí sản xuất', detail: 'Định mức NVL, nhân công, máy móc theo SP; so sánh thực tế vs định mức', complexity: 'Medium', effort: 4 },
          { task: 'QC – Kiểm tra chất lượng sản phẩm', detail: 'Checklist QC theo SP; chụp ảnh lỗi; đánh giá Pass/Fail; thống kê tỷ lệ lỗi', complexity: 'Medium', effort: 4 },
        ]
      },
      {
        group: '2. Quản lý Kho & Giao nhận',
        tasks: [
          { task: 'Quản lý tồn kho đa kho (xưởng, showroom, transit)', detail: 'Tồn kho realtime; điều chuyển kho; min/max stock; barcode/QR; kiểm kê', complexity: 'Complex', effort: 6 },
          { task: 'Phiếu nhập kho (NVL / thành phẩm)', detail: 'Nhập kho từ PO mua hàng hoặc hoàn thành SX; liên kết PO; QC đầu vào', complexity: 'Medium', effort: 3 },
          { task: 'Phiếu xuất kho & đóng gói', detail: 'Xuất kho theo SO; packing list; scan barcode; in tem/nhãn', complexity: 'Medium', effort: 3 },
          { task: 'Quản lý giao hàng & vận chuyển', detail: 'Tạo đơn giao hàng; chọn đơn vị vận chuyển; theo dõi tình trạng; xác nhận giao thành công', complexity: 'Complex', effort: 5 },
          { task: 'Quản lý mua hàng NVL (Purchase Order)', detail: 'Tạo PO mua NVL; nhà cung cấp; đối chiếu nhận hàng; công nợ phải trả NCC', complexity: 'Medium', effort: 4 },
        ]
      },
    ]
  },
  {
    module: 'A5. BUILDING OS',
    groups: [
      {
        group: '1. Quản lý Công trình & Dự toán',
        tasks: [
          { task: 'CRUD dự án / công trình', detail: 'Thông tin công trình: tên, địa chỉ, KH, loại (nội thất/xây dựng/nhà ở); trạng thái; team', complexity: 'Medium', effort: 3 },
          { task: 'Quản lý khảo sát hiện trạng', detail: 'Lịch khảo sát; ghi chú; ảnh/video hiện trạng; đo đạc; checklist; gán KTS/Builder', complexity: 'Medium', effort: 4 },
          { task: 'Quản lý thiết kế & bản vẽ', detail: 'Upload bản vẽ 2D/3D; phiên bản; phê duyệt KH; lưu trữ tập trung; comment/markup', complexity: 'Medium', effort: 4 },
          { task: 'BOQ – Dự toán chi phí công trình', detail: 'Bảng khối lượng; đơn giá; tổng dự toán; so sánh phiên bản; phê duyệt; xuất Excel/PDF', complexity: 'Complex', effort: 6 },
        ]
      },
      {
        group: '2. Thi công & Nghiệm thu',
        tasks: [
          { task: 'Lập & theo dõi tiến độ thi công (Gantt)', detail: 'Phân chia giai đoạn; milestone; cập nhật tiến độ hàng ngày; cảnh báo trễ hạn; Gantt chart', complexity: 'Complex', effort: 6 },
          { task: 'Quản lý nhân sự & nhà thầu phụ công trình', detail: 'Gán đội thi công; theo dõi công; hợp đồng nhà thầu phụ; đánh giá hiệu suất', complexity: 'Medium', effort: 4 },
          { task: 'Quản lý vật tư công trình', detail: 'Đề nghị cấp VT; xuất kho theo công trình; theo dõi tiêu hao vs dự toán; cảnh báo vượt', complexity: 'Medium', effort: 4 },
          { task: 'Nghiệm thu & bàn giao', detail: 'Checklist nghiệm thu theo hạng mục; ảnh trước/sau; biên bản nghiệm thu; chữ ký KH', complexity: 'Medium', effort: 4 },
          { task: 'Hậu mãi & bảo hành công trình', detail: 'Ticket bảo hành theo công trình; lịch sử sửa chữa; SLA; đánh giá KH sau thi công', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
  {
    module: 'A6. FINANCE & TREASURY',
    groups: [
      {
        group: '1. Quản lý Dòng tiền & Công nợ',
        tasks: [
          { task: 'Quản lý dòng tiền vào/ra (Cash Flow)', detail: 'Ghi nhận thu/chi; phân loại nguồn; đối chiếu tài khoản; dự báo dòng tiền', complexity: 'Complex', effort: 5 },
          { task: 'Công nợ phải thu (AR) theo KH / đơn hàng / HĐ', detail: 'Theo dõi số phải thu; aging report; nhắc nợ; lịch sử thanh toán; đối chiếu', complexity: 'Medium', effort: 4 },
          { task: 'Công nợ phải trả (AP) theo NCC / nhà thầu', detail: 'Theo dõi số phải trả; lịch thanh toán; duyệt đề nghị thanh toán; đối chiếu', complexity: 'Medium', effort: 4 },
          { task: 'Cash pooling & đối chiếu dòng tiền từng công ty con', detail: 'Tập trung dòng tiền toàn tập đoàn; đối chiếu inter-company; báo cáo consolidation', complexity: 'Very Complex', effort: 8 },
        ]
      },
      {
        group: '2. Ngân sách & Hiệu suất Vốn',
        tasks: [
          { task: 'Lập ngân sách (Budget) theo công ty / phòng / dự án', detail: 'Budget plan năm/quý/tháng; phân bổ; so sánh actual vs budget; cảnh báo vượt', complexity: 'Complex', effort: 5 },
          { task: 'Cảnh báo nghẽn tiền & thanh khoản', detail: 'Cảnh báo tự động khi tiền mặt dưới ngưỡng; dự báo thiếu hụt; đề xuất xử lý', complexity: 'Complex', effort: 4 },
          { task: 'ROI theo dự án / showroom / xưởng', detail: 'Tính ROI đầu tư theo từng đơn vị; so sánh; xếp hạng hiệu suất vốn', complexity: 'Complex', effort: 5 },
          { task: 'Báo cáo tài chính tổng hợp tập đoàn', detail: 'P&L / BS / CF consolidation; dashboard tài chính; xuất Excel/PDF cho BGĐ & NĐT', complexity: 'Very Complex', effort: 8 },
        ]
      },
    ]
  },
  {
    module: 'A7. ADMIN & GOVERNANCE',
    groups: [
      {
        group: '1. Quản trị Hệ thống',
        tasks: [
          { task: 'Quản lý người dùng & phân quyền role-based', detail: '6 nhóm user; phân quyền theo role, phòng ban, công ty con; kế thừa quyền', complexity: 'Complex', effort: 5 },
          { task: 'Quy trình phê duyệt (Approval Workflow Engine)', detail: 'Cấu hình workflow đa cấp linh hoạt; áp dụng cho mọi module; phê duyệt trên mobile', complexity: 'Very Complex', effort: 7 },
          { task: 'Nhật ký thao tác & audit trail', detail: 'Log mọi hành động: tạo/sửa/xóa/duyệt; lọc theo user/module/thời gian; xuất báo cáo', complexity: 'Medium', effort: 3 },
          { task: 'Quản lý hồ sơ pháp lý & hợp đồng', detail: 'Lưu trữ hồ sơ pháp lý tập trung; hợp đồng lao động/KH/NCC; nhắc hết hạn; phiên bản', complexity: 'Medium', effort: 4 },
          { task: 'Quản lý ESOP (Employee Stock Option Plan)', detail: 'Danh sách ESOP; vesting schedule; giá trị; lịch sử thay đổi; báo cáo', complexity: 'Medium', effort: 3 },
        ]
      },
      {
        group: '2. Notification & Cấu hình',
        tasks: [
          { task: 'Hệ thống thông báo đa kênh (In-app, Email, Zalo)', detail: 'Template thông báo; trigger theo sự kiện; cấu hình kênh theo loại thông báo', complexity: 'Complex', effort: 5 },
          { task: 'Cấu hình hệ thống & tham số dùng chung', detail: 'Cấu hình: công ty, chi nhánh, showroom, đơn vị tiền tệ, múi giờ, mẫu in...', complexity: 'Simple', effort: 2 },
        ]
      },
    ]
  },
  {
    module: 'A8. KPI DASHBOARD & DATA BI',
    groups: [
      {
        group: '1. Dashboard Realtime',
        tasks: [
          { task: 'Dashboard tổng quan Holding (EBITDA, FCF, doanh thu)', detail: 'Tổng hợp realtime từ tất cả công ty con; biểu đồ trend; so sánh kỳ; drill-down', complexity: 'Very Complex', effort: 8 },
          { task: 'Dashboard CRM & Sales', detail: 'Leads/ngày, tỷ lệ chốt, doanh thu, AOV, top sales, top showroom; conversion funnel', complexity: 'Complex', effort: 6 },
          { task: 'Dashboard Factory (tiến độ SX, tồn kho, QC)', detail: 'SL đơn đang SX, tỷ lệ hoàn thành, tỷ lệ lỗi QC, tồn kho critical; cảnh báo', complexity: 'Complex', effort: 5 },
          { task: 'Dashboard Building (tiến độ công trình)', detail: 'Số công trình đang thi công; % hoàn thành; cảnh báo trễ; chi phí vs dự toán', complexity: 'Complex', effort: 5 },
          { task: 'Dashboard Treasury (dòng tiền, công nợ)', detail: 'Cash position realtime; AR/AP aging; cash forecast; cảnh báo nghẽn tiền', complexity: 'Complex', effort: 5 },
        ]
      },
      {
        group: '2. BI & Phân tích Nâng cao',
        tasks: [
          { task: 'Cohort analysis khách hàng', detail: 'Phân tích retention theo tháng đầu mua; LTV theo cohort; churn prediction', complexity: 'Very Complex', effort: 7 },
          { task: 'Heatmap sản phẩm & profitability by SKU', detail: 'Biên lợi nhuận theo từng SKU; volume vs margin matrix; đề xuất cắt/push SP', complexity: 'Complex', effort: 5 },
          { task: 'Profitability by Region / Showroom', detail: 'Phân tích lợi nhuận theo khu vực, showroom; chi phí vận hành vs doanh thu', complexity: 'Complex', effort: 5 },
          { task: 'CAC & LTV analysis', detail: 'Chi phí thu hút KH theo kênh; giá trị vòng đời; CAC:LTV ratio; đề xuất tối ưu', complexity: 'Complex', effort: 5 },
          { task: 'Tỷ lệ số hoá & adoption report', detail: 'Đo tỷ lệ dùng app; số user active; % quy trình số hoá; doanh thu hỗ trợ bởi nền tảng', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },

  // ── TẦNG B: ECOSYSTEM PLATFORM ──────────────────────────
  {
    module: 'B1. CỔNG KHÁCH HÀNG (Customer Portal)',
    groups: [
      {
        group: '1. Tính năng Cổng KH',
        tasks: [
          { task: 'Xem sản phẩm / combo / báo giá online', detail: 'Catalog public; tìm kiếm; bộ lọc; xem chi tiết; yêu cầu báo giá; responsive web', complexity: 'Medium', effort: 4 },
          { task: 'Theo dõi tiến độ đơn hàng & thi công', detail: 'KH login xem trạng thái đơn hàng, tiến độ thi công, ảnh cập nhật; push notification', complexity: 'Medium', effort: 4 },
          { task: 'Đặt lịch khảo sát & yêu cầu hỗ trợ', detail: 'Form đặt lịch khảo sát; chọn ngày/giờ; tạo ticket hỗ trợ; xem lịch sử', complexity: 'Medium', effort: 3 },
          { task: 'Xem lịch bảo hành & yêu cầu bảo hành', detail: 'Danh sách SP đã mua; thời hạn BH; tạo yêu cầu BH; theo dõi tiến trình xử lý', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
  {
    module: 'B2. CỔNG SHOWROOM / ĐẠI LÝ / CTV',
    groups: [
      {
        group: '1. Tính năng Cổng Đại lý',
        tasks: [
          { task: 'Nhận lead & tạo đơn hàng', detail: 'Đại lý tiếp nhận lead từ hệ thống; tạo đơn hàng; chọn SP; giá sỉ tự động áp', complexity: 'Medium', effort: 4 },
          { task: 'Kiểm tra tồn kho & đặt hàng (B2B)', detail: 'Xem tồn kho realtime; tạo đơn đặt hàng cho showroom; theo dõi giao hàng', complexity: 'Medium', effort: 4 },
          { task: 'Theo dõi doanh số & hoa hồng / thưởng', detail: 'Dashboard doanh số cá nhân/showroom; hoa hồng tích luỹ; chính sách thưởng', complexity: 'Medium', effort: 4 },
          { task: 'Tài liệu bán hàng & chính sách giá sỉ', detail: 'Download tài liệu SP, hình ảnh, video; xem bảng giá sỉ hiện hành; tin tức nội bộ', complexity: 'Simple', effort: 2 },
        ]
      },
    ]
  },
  {
    module: 'B3. CỔNG NHÀ CUNG CẤP / XƯỞNG VỆ TINH',
    groups: [
      {
        group: '1. Tính năng Cổng NCC',
        tasks: [
          { task: 'Nhận PO & xác nhận đơn hàng mua', detail: 'NCC nhận PO online; xác nhận/từ chối; cập nhật ngày giao dự kiến', complexity: 'Medium', effort: 3 },
          { task: 'Cập nhật tiến độ sản xuất & giao nhận', detail: 'NCC/xưởng vệ tinh cập nhật % hoàn thành; xác nhận giao hàng; đính kèm ảnh', complexity: 'Medium', effort: 3 },
          { task: 'Đối soát chất lượng & xử lý bảo hành', detail: 'Báo cáo QC đầu vào; claim lỗi; xử lý đổi trả; lưu tiêu chuẩn kỹ thuật', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
  {
    module: 'B4. CỔNG THẦU / ĐỘI THI CÔNG / KTS',
    groups: [
      {
        group: '1. Tính năng Cổng Builder',
        tasks: [
          { task: 'Tiếp nhận dự án & cộng tác báo giá', detail: 'Builder/KTS nhận dự án; xem bản vẽ; cộng tác BOQ; gửi báo giá thi công', complexity: 'Medium', effort: 4 },
          { task: 'Quản lý checklist & tiến độ thi công', detail: 'Checklist theo hạng mục; cập nhật tiến độ; upload ảnh; đối soát nghiệm thu', complexity: 'Medium', effort: 4 },
          { task: 'Tải bản vẽ / tiêu chuẩn & đối soát nghiệm thu', detail: 'Download file kỹ thuật; biên bản nghiệm thu online; chữ ký số', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
  {
    module: 'B5. CỔNG NHÀ ĐẦU TƯ / ĐỐI TÁC VỐN (IR Portal)',
    groups: [
      {
        group: '1. Tính năng IR Portal',
        tasks: [
          { task: 'Dashboard tổng quan cho nhà đầu tư', detail: 'Tổng quan tình hình kinh doanh; KPI chủ chốt; biểu đồ xu hướng; phân quyền xem', complexity: 'Complex', effort: 5 },
          { task: 'Quản lý dự án SPV & tiến độ vốn', detail: 'Danh sách SPV; số vốn đã huy động; tiến độ giải ngân; kết quả kinh doanh SPV', complexity: 'Complex', effort: 5 },
          { task: 'Tài liệu IR & Deal Room', detail: 'Upload tài liệu investor; cap table view; pitch deck; deal room bảo mật', complexity: 'Medium', effort: 4 },
        ]
      },
    ]
  },

  // ── TẦNG C: COMMERCIAL PLATFORM ─────────────────────────
  {
    module: 'C1. CRM NGÀNH NỘI THẤT (SaaS)',
    groups: [
      {
        group: '1. Multi-tenant CRM SaaS',
        tasks: [
          { task: 'Multi-tenant architecture & onboarding', detail: 'Kiến trúc multi-tenant; đăng ký; cấu hình tenant; billing; data isolation', complexity: 'Very Complex', effort: 10 },
          { task: 'CRM core cho showroom / xưởng ngoài', detail: 'Lead, pipeline, đơn hàng, CSKH dạng SaaS; custom field; branding tenant', complexity: 'Complex', effort: 6 },
          { task: 'Subscription & billing management', detail: 'Gói dịch vụ; thanh toán recurring; hoá đơn; nâng/hạ gói; trial period', complexity: 'Complex', effort: 5 },
        ]
      },
    ]
  },
  {
    module: 'C2. APP QUẢN LÝ CÔNG TRÌNH (SaaS)',
    groups: [
      {
        group: '1. Construction Management SaaS',
        tasks: [
          { task: 'Multi-tenant construction project management', detail: 'Kiến trúc SaaS; quản lý dự án; BOQ; tiến độ; checklist; mobile-first', complexity: 'Very Complex', effort: 10 },
          { task: 'Template BOQ & checklist theo ngành', detail: 'Bộ template chuẩn cho nội thất, xây dựng, MEP; tuỳ chỉnh theo tenant', complexity: 'Complex', effort: 5 },
        ]
      },
    ]
  },
  {
    module: 'C3. MARKETPLACE NỘI THẤT – XÂY DỰNG',
    groups: [
      {
        group: '1. Marketplace Platform',
        tasks: [
          { task: 'Đăng sản phẩm / dịch vụ & storefront', detail: 'NCC/showroom đăng SP; trang shop; quản lý đơn hàng marketplace; review/rating', complexity: 'Very Complex', effort: 10 },
          { task: 'Matching cung cầu (KH ↔ NCC / Builder / KTS)', detail: 'Thuật toán matching theo khu vực, ngành hàng, giá; đề xuất thông minh; chat/nhắn tin', complexity: 'Very Complex', effort: 8 },
          { task: 'Thanh toán & phí giao dịch (Escrow)', detail: 'Tích hợp payment gateway; escrow cho giao dịch lớn; hoa hồng marketplace; reconciliation', complexity: 'Very Complex', effort: 8 },
          { task: 'Đánh giá uy tín & trust score', detail: 'Hệ thống review; trust score theo lịch sử giao dịch; badge; xác minh NCC', complexity: 'Complex', effort: 5 },
        ]
      },
    ]
  },

  // ── DATA SPINE & HẠ TẦNG ────────────────────────────────
  {
    module: 'D. DATA SPINE & HẠ TẦNG KỸ THUẬT',
    groups: [
      {
        group: '1. Master Data & Data Spine',
        tasks: [
          { task: 'Master Customer (KH, hộ gia đình, DN, NĐT)', detail: 'Unified customer profile; merge/dedup; golden record; sync across modules', complexity: 'Complex', effort: 6 },
          { task: 'Master Product (SKU, combo, BOM, giá)', detail: 'Product information management; đồng bộ giá/BOM toàn hệ thống', complexity: 'Complex', effort: 5 },
          { task: 'Master Partner (đại lý, CTV, builder, KTS, NCC)', detail: 'Unified partner profile; hợp đồng; chính sách; đánh giá', complexity: 'Medium', effort: 4 },
          { task: 'Master Project (công trình, SPV)', detail: 'Dữ liệu dự án tập trung; liên kết finance, resource, timeline', complexity: 'Medium', effort: 4 },
          { task: 'Master Transaction (đơn hàng, HĐ, thanh toán, công nợ)', detail: 'Dữ liệu giao dịch xuyên suốt; traceability từ lead → thanh toán cuối', complexity: 'Complex', effort: 5 },
          { task: 'Master Finance (ngân sách, dòng tiền, phân bổ vốn)', detail: 'Dữ liệu tài chính consolidation; intercompany; treasury', complexity: 'Complex', effort: 5 },
        ]
      },
      {
        group: '2. Hạ tầng & DevOps',
        tasks: [
          { task: 'API Gateway & Microservice Architecture', detail: 'API Gateway; service mesh; load balancing; rate limiting; API documentation (Swagger)', complexity: 'Very Complex', effort: 8 },
          { task: 'Authentication & Authorization (SSO / OAuth2)', detail: 'Single sign-on; OAuth2/OIDC; JWT; social login; 2FA; session management', complexity: 'Complex', effort: 5 },
          { task: 'File storage & CDN (hình ảnh, bản vẽ, tài liệu)', detail: 'Object storage (S3-compatible); CDN cho hình SP; upload/download; quota', complexity: 'Medium', effort: 3 },
          { task: 'CI/CD pipeline & monitoring', detail: 'Build/test/deploy tự động; staging/production; health check; alerting; log aggregation', complexity: 'Complex', effort: 5 },
          { task: 'Database design & migration framework', detail: 'Schema design cho multi-tenant; migration versioning; backup/restore; replication', complexity: 'Complex', effort: 5 },
        ]
      },
    ]
  },
];

// ============================================================
// HELPERS (same as ERP_Estimation_v2)
// ============================================================
const fill  = bg => ({ type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + bg } });
const font  = (color, bold = false, size = 10) => ({ name: 'Calibri', size, bold, color: { argb: 'FF' + color } });
const align = (h = 'left', v = 'middle', wrap = true) => ({ horizontal: h, vertical: v, wrapText: wrap });
const border = () => ({
  top:    { style: 'thin', color: { argb: 'FFB8CCE4' } },
  left:   { style: 'thin', color: { argb: 'FFB8CCE4' } },
  bottom: { style: 'thin', color: { argb: 'FFB8CCE4' } },
  right:  { style: 'thin', color: { argb: 'FFB8CCE4' } },
});

// ============================================================
// BUILD (matching ERP_Estimation_v2 structure)
// ============================================================
async function build() {
  const wb = new ExcelJS.Workbook();
  wb.creator  = 'TOKA EST Tool';
  wb.modified = new Date();

  // ─────────────────────────────────────────────────────────
  // SHEET 1: ESTIMATION DETAIL
  // ─────────────────────────────────────────────────────────
  const ws = wb.addWorksheet('ESTIMATION DETAIL');
  ws.columns = [
    { width: 2  },   // A padding
    { width: 6  },   // B No
    { width: 8  },   // C Code
    { width: 38 },   // D Name (Module/Group)
    { width: 40 },   // E Name (Task)
    { width: 55 },   // F Description
    { width: 2  },   // G gap
    { width: 14 },   // H Complex Level
    { width: 12 },   // I Coding Effort
    { width: 10 },   // J %Reuse
    { width: 12 },   // K Total Effort
    { width: 28 },   // L Note
    { width: 2  },   // M padding
  ];

  // --- Row 1: Title ---
  const r1 = ws.addRow(['', 'TOKA APP – Nền tảng Quản trị Hệ sinh thái Nội thất – Xây dựng – BĐS – Tài chính', '', '', '', '', '', '', '', '', '', '', '']);
  ws.mergeCells('B1:L1');
  r1.height = 32;
  r1.getCell('B').fill      = fill(C.titleBg);
  r1.getCell('B').font      = font('FFFFFF', true, 14);
  r1.getCell('B').alignment = align('center', 'middle');

  // --- Row 2: unit note ---
  const r2 = ws.addRow(['', '', '', '', '', '', '', '', '', '', '', 'Coding effort unit: person.days', '']);
  r2.height = 16;
  r2.getCell('L').font      = font('595959', false, 10);
  r2.getCell('L').alignment = align('right', 'middle', false);

  // --- Row 3: main headers ---
  const r3 = ws.addRow([
    '', 'No', 'Requirement List', '', '', '', '',
    'Complex\nLevel', 'Coding\nEffort', '%Reuse',
    'TOTAL\nCODING\nEFFORT', 'Note', ''
  ]);
  ws.mergeCells('C3:F3');
  r3.height = 36;
  ['B','C','H','I','J','K','L'].forEach(col => {
    r3.getCell(col).fill      = fill(C.headerBg);
    r3.getCell(col).font      = font(C.headerFg, true, 11);
    r3.getCell(col).alignment = align('center', 'middle');
    r3.getCell(col).border    = border();
  });

  // --- Row 4: sub-header ---
  const r4 = ws.addRow(['', '', 'Code', 'Name (Module / Group)', 'Name (Task)', 'Description / Detail Work', '', '', '', '', '', '', '']);
  r4.height = 18;
  ['C','D','E','F'].forEach(col => {
    r4.getCell(col).fill      = fill('BDD7EE');
    r4.getCell(col).font      = font('1F3864', true, 10);
    r4.getCell(col).alignment = align('center', 'middle', false);
    r4.getCell(col).border    = border();
  });
  ['H','I','J','K','L'].forEach(col => {
    r4.getCell(col).fill      = fill('BDD7EE');
    r4.getCell(col).font      = font('1F3864', true, 10);
    r4.getCell(col).border    = border();
    r4.getCell(col).alignment = align('center', 'middle', false);
  });

  ws.views = [{ state: 'frozen', ySplit: 4 }];

  // ── DATA ROWS ──
  let seqNo = 1;
  let codeNo = 1;
  let oddRow = false;

  for (const mod of modules) {
    const mCode = String(codeNo++).padStart(3, '0');
    const mRow = ws.addRow(['', seqNo++, mCode, mod.module, '', '', '', '', '', '', '', '', '']);
    ws.mergeCells(`D${mRow.number}:F${mRow.number}`);
    mRow.height = 20;
    ['B','C','D','H','I','J','K','L'].forEach(col => {
      mRow.getCell(col).fill      = fill(C.moduleHd);
      mRow.getCell(col).font      = font(C.moduleFg, true, 11);
      mRow.getCell(col).border    = border();
      mRow.getCell(col).alignment = align(col === 'B' || col === 'C' || col === 'I' || col === 'J' || col === 'K' ? 'center' : 'left', 'middle', false);
    });

    for (const grp of mod.groups) {
      const gCode = String(codeNo++).padStart(3, '0');
      const gRow = ws.addRow(['', seqNo++, gCode, grp.group, '', '', '', '', '', '', '', '', '']);
      ws.mergeCells(`D${gRow.number}:F${gRow.number}`);
      gRow.height = 18;
      ['B','C','D','H','I','J','K','L'].forEach(col => {
        gRow.getCell(col).fill      = fill(C.groupBg);
        gRow.getCell(col).font      = font(C.groupFg, true, 10);
        gRow.getCell(col).border    = border();
        gRow.getCell(col).alignment = align(col === 'B' || col === 'C' ? 'center' : 'left', 'middle', false);
      });

      for (const t of grp.tasks) {
        const tCode = String(codeNo++).padStart(3, '0');
        const rowBg = oddRow ? C.altRow : 'FFFFFF';
        oddRow = !oddRow;
        const cc = complexColor[t.complexity] || {};

        const tRow = ws.addRow([
          '', seqNo++, tCode, '', t.task, t.detail,
          '', t.complexity, t.effort, '', t.effort, '', ''
        ]);
        tRow.height = 32;

        tRow.getCell('B').fill      = fill(rowBg);
        tRow.getCell('B').font      = font('404040', false, 10);
        tRow.getCell('B').alignment = align('center', 'middle', false);
        tRow.getCell('B').border    = border();

        tRow.getCell('C').fill      = fill(rowBg);
        tRow.getCell('C').font      = font('404040', false, 10);
        tRow.getCell('C').alignment = align('center', 'middle', false);
        tRow.getCell('C').border    = border();

        tRow.getCell('E').fill      = fill(rowBg);
        tRow.getCell('E').font      = font('1F3864', false, 10);
        tRow.getCell('E').alignment = align('left', 'middle', true);
        tRow.getCell('E').border    = border();

        tRow.getCell('F').fill      = fill(rowBg);
        tRow.getCell('F').font      = font('404040', false, 9);
        tRow.getCell('F').alignment = align('left', 'middle', true);
        tRow.getCell('F').border    = border();

        tRow.getCell('H').fill      = cc.bg ? fill(cc.bg) : fill(rowBg);
        tRow.getCell('H').font      = cc.fg ? font(cc.fg, true, 10) : font('404040', false, 10);
        tRow.getCell('H').alignment = align('center', 'middle', false);
        tRow.getCell('H').border    = border();

        tRow.getCell('I').fill      = fill(rowBg);
        tRow.getCell('I').font      = font('404040', true, 10);
        tRow.getCell('I').alignment = align('center', 'middle', false);
        tRow.getCell('I').border    = border();
        tRow.getCell('I').numFmt    = '0.0';

        tRow.getCell('J').fill      = fill(rowBg);
        tRow.getCell('J').font      = font('404040', false, 10);
        tRow.getCell('J').alignment = align('center', 'middle', false);
        tRow.getCell('J').border    = border();

        tRow.getCell('K').fill      = fill('E2EFDA');
        tRow.getCell('K').font      = font('375623', true, 10);
        tRow.getCell('K').alignment = align('center', 'middle', false);
        tRow.getCell('K').border    = border();
        tRow.getCell('K').numFmt    = '0.0';

        tRow.getCell('L').fill      = fill(rowBg);
        tRow.getCell('L').font      = font('595959', false, 9);
        tRow.getCell('L').alignment = align('left', 'middle', true);
        tRow.getCell('L').border    = border();
      }
    }
  }

  // TOTAL row
  const allEffort = modules.reduce((s, m) => s + m.groups.reduce((ss, g) => ss + g.tasks.reduce((sss, t) => sss + t.effort, 0), 0), 0);
  const totRow = ws.addRow(['', '', '', 'TOTAL', '', '', '', '', '', '', allEffort, '', '']);
  ws.mergeCells(`C${totRow.number}:F${totRow.number}`);
  totRow.height = 22;
  ['B','C','H','I','J','K','L'].forEach(col => {
    totRow.getCell(col).fill   = fill(C.totalBg);
    totRow.getCell(col).border = border();
  });
  totRow.getCell('C').fill      = fill(C.totalBg);
  totRow.getCell('C').font      = font(C.totalFg, true, 12);
  totRow.getCell('C').alignment = align('center', 'middle', false);
  totRow.getCell('C').border    = border();
  totRow.getCell('K').font      = font(C.totalFg, true, 12);
  totRow.getCell('K').alignment = align('center', 'middle', false);
  totRow.getCell('K').numFmt    = '0.0';

  // ─────────────────────────────────────────────────────────
  // SHEET 2: ESTIMATION SUMMARY
  // ─────────────────────────────────────────────────────────
  const ws2 = wb.addWorksheet('ESTIMATION SUMMARY');
  ws2.columns = [
    { width: 2  },
    { width: 6  },
    { width: 50 },
    { width: 16 },
    { width: 18 },
    { width: 20 },
    { width: 28 },
    { width: 4  },
  ];

  const s1 = ws2.addRow(['', 'TOKA APP – WBS Estimation Summary', '', '', '', '', '', '']);
  ws2.mergeCells('B1:G1');
  s1.height = 28;
  s1.getCell('B').fill      = fill(C.titleBg);
  s1.getCell('B').font      = font('FFFFFF', true, 14);
  s1.getCell('B').alignment = align('center', 'middle');

  ws2.addRow([]);

  const s3 = ws2.addRow(['', 'No', 'Work Content', 'Effort\n(person.days)', 'Man.months\n(1mm=22days)', 'Unit Cost\n(VND/mm)', 'Total Cost\n(VND)', '']);
  s3.height = 36;
  ['B','C','D','E','F','G'].forEach(col => {
    s3.getCell(col).fill      = fill(C.summaryHd);
    s3.getCell(col).font      = font('FFFFFF', true, 11);
    s3.getCell(col).alignment = align('center', 'middle');
    s3.getCell(col).border    = border();
  });

  ws2.addRow([]);

  let sNo = 1;
  for (const mod of modules) {
    const modEffort = mod.groups.reduce((s, g) => s + g.tasks.reduce((ss, t) => ss + t.effort, 0), 0);
    const mr = ws2.addRow(['', sNo++, mod.module, modEffort, (modEffort / 22).toFixed(2), '', '', '']);
    mr.height = 18;
    ['B','C','D','E'].forEach(col => {
      mr.getCell(col).fill      = fill(C.moduleHd);
      mr.getCell(col).font      = font(C.moduleFg, true, 11);
      mr.getCell(col).border    = border();
      mr.getCell(col).alignment = align(col === 'D' || col === 'E' ? 'center' : 'left', 'middle', false);
    });
    ['F','G'].forEach(col => {
      mr.getCell(col).fill   = fill(C.moduleHd);
      mr.getCell(col).border = border();
    });
    mr.getCell('D').numFmt = '0.0';

    for (const grp of mod.groups) {
      const gEffort = grp.tasks.reduce((s, t) => s + t.effort, 0);
      const gr = ws2.addRow(['', sNo++, '  ' + grp.group, gEffort, (gEffort / 22).toFixed(2), '', '', '']);
      gr.height = 16;
      ['B','C','D','E','F','G'].forEach(col => {
        gr.getCell(col).fill      = fill(C.groupBg);
        gr.getCell(col).font      = font(C.groupFg, false, 10);
        gr.getCell(col).border    = border();
        gr.getCell(col).alignment = align(col === 'D' || col === 'E' ? 'center' : 'left', 'middle', false);
      });
      gr.getCell('D').numFmt = '0.0';
    }
  }

  ws2.addRow([]);
  const tR = ws2.addRow(['', '', 'TOTAL CODING EFFORT', allEffort, (allEffort / 22).toFixed(2), '', '', '']);
  tR.height = 22;
  ['B','C','D','E','F','G'].forEach(col => {
    tR.getCell(col).fill      = fill(C.totalBg);
    tR.getCell(col).font      = font(C.totalFg, true, 12);
    tR.getCell(col).border    = border();
    tR.getCell(col).alignment = align(col === 'D' || col === 'E' ? 'center' : 'left', 'middle', false);
  });
  tR.getCell('D').numFmt = '0.0';

  // ─────────────────────────────────────────────────────────
  // SHEET 3: GUIDELINE
  // ─────────────────────────────────────────────────────────
  const ws3 = wb.addWorksheet('GUIDELINE');
  ws3.columns = [{ width: 2 }, { width: 14 }, { width: 80 }, { width: 4 }];

  const g1 = ws3.addRow(['', 'Estimation Guideline', '', '']);
  ws3.mergeCells('B1:C1');
  g1.height = 24;
  g1.getCell('B').fill      = fill(C.titleBg);
  g1.getCell('B').font      = font('FFFFFF', true, 13);
  g1.getCell('B').alignment = align('center', 'middle');

  ws3.addRow([]);
  const g3 = ws3.addRow(['', 'Complex Level', 'Criteria / Description', '']);
  g3.height = 20;
  ['B','C'].forEach(col => {
    g3.getCell(col).fill      = fill(C.headerBg);
    g3.getCell(col).font      = font('FFFFFF', true, 11);
    g3.getCell(col).alignment = align('center', 'middle');
    g3.getCell(col).border    = border();
  });

  const levels = [
    { level: 'Very Simple', bg: 'E2EFDA', fg: '375623', desc: '~ Static content < 1 trang A4 hoặc hiển thị single data < 5 items' },
    { level: 'Simple',      bg: 'E2EFDA', fg: '375623', desc: 'Chức năng xử lý view data < 10 items. Ví dụ: danh mục CRUD đơn giản, in báo cáo tĩnh' },
    { level: 'Medium',      bg: 'FFEB9C', fg: '9C5700', desc: 'Chức năng xử lý input/update/delete hoặc search simple < 10 items. Ví dụ: form nhập liệu, báo cáo tổng hợp đơn giản' },
    { level: 'Complex',     bg: 'FFC7CE', fg: '9C0006', desc: 'Chức năng view/input/update/delete, search advance, có table/chart phức tạp. Ví dụ: workflow phê duyệt, dashboard KPI, báo cáo phân tích' },
    { level: 'Very Complex',bg: 'FF0000', fg: 'FFFFFF', desc: 'Chức năng có nghiệp vụ phức tạp, tổng hợp nhiều data, tích hợp ngoài. Ví dụ: multi-tenant SaaS, marketplace, cash pooling, ETL pipeline' },
  ];
  for (const lv of levels) {
    const lr = ws3.addRow(['', lv.level, lv.desc, '']);
    lr.height = 24;
    lr.getCell('B').fill      = fill(lv.bg);
    lr.getCell('B').font      = font(lv.fg, true, 10);
    lr.getCell('B').alignment = align('center', 'middle', false);
    lr.getCell('B').border    = border();
    lr.getCell('C').font      = font('404040', false, 10);
    lr.getCell('C').alignment = align('left', 'middle', true);
    lr.getCell('C').border    = border();
  }

  // ─── SAVE ───
  const outPath = 'C:\\Users\\LongLV\\Downloads\\TOKA_APP_Estimation.xlsx';
  await wb.xlsx.writeFile(outPath);

  const totalTasks = modules.reduce((s, m) => s + m.groups.reduce((ss, g) => ss + g.tasks.length, 0), 0);
  console.log('✅ Done! Saved to:', outPath);
  console.log('   Modules     :', modules.length);
  console.log('   Total tasks :', totalTasks);
  console.log('   Total effort:', allEffort, 'person.days =', (allEffort / 22).toFixed(1), 'man.months');
  console.log('');
  console.log('── Breakdown by module ──');
  for (const mod of modules) {
    const e = mod.groups.reduce((s, g) => s + g.tasks.reduce((ss, t) => ss + t.effort, 0), 0);
    console.log(`   ${mod.module}: ${e} days (${(e/22).toFixed(1)} mm)`);
  }
}

build().catch(console.error);
