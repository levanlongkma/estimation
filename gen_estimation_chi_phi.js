const ExcelJS = require('exceljs');

// ============================================================
// COLOR PALETTE
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
// DATA – HỆ THỐNG QUẢN LÝ CHI PHÍ & GIÁM SÁT GIÁ THÀNH
// ============================================================
const modules = [
  {
    module: 'I. QUẢN TRỊ HỆ THỐNG & DANH MỤC DÙNG CHUNG',
    groups: [
      {
        group: '1. Quản lý người dùng & phân quyền',
        tasks: [
          { task: 'CRUD tài khoản người dùng', detail: 'Thêm, sửa, xóa tài khoản; gán vai trò; đặt lại mật khẩu', complexity: 'Simple', effort: 2 },
          { task: 'Phân quyền theo cấp quản lý (BGĐ → Phòng → Phân xưởng)', detail: 'Cấu hình cấp bậc tổ chức; gán người dùng vào cấp tương ứng', complexity: 'Complex', effort: 5 },
          { task: 'Phân quyền theo nhiệm vụ (Nhập liệu / Kiểm tra / Phê duyệt / Xem)', detail: 'Ma trận phân quyền chức năng; kế thừa quyền theo vai trò', complexity: 'Complex', effort: 5 },
          { task: 'Phân quyền theo phạm vi dữ liệu (phân xưởng)', detail: 'Người dùng phân xưởng chỉ thấy dữ liệu phân xưởng mình', complexity: 'Complex', effort: 4 },
          { task: 'Quản lý phiên đăng nhập & nhật ký hệ thống', detail: 'Log đăng nhập, hoạt động người dùng; khóa tài khoản sai mật khẩu', complexity: 'Medium', effort: 3 },
        ]
      },
      {
        group: '2. Danh mục hệ thống',
        tasks: [
          { task: 'Danh mục Trung tâm Chi phí (Cost Center)', detail: 'CRUD Cost Center; liên kết với phân xưởng, phòng ban, toàn công ty', complexity: 'Simple', effort: 2 },
          { task: 'Danh mục Yếu tố Chi phí', detail: 'CRUD yếu tố: vật tư, nhân công, điện, khấu hao, chi phí chung...', complexity: 'Simple', effort: 2 },
          { task: 'Danh mục Công đoạn Sản xuất', detail: 'CRUD công đoạn; liên kết với Cost Center và yếu tố chi phí', complexity: 'Simple', effort: 2 },
          { task: 'Danh mục Phân xưởng & Đơn vị tổ chức', detail: 'CRUD phân xưởng, đơn vị hành chính; cây cấu trúc tổ chức', complexity: 'Simple', effort: 2 },
          { task: 'Danh mục Đơn vị tính & Hệ số quy đổi', detail: 'CRUD đơn vị tính; hệ số quy đổi tấn than, mét lò...', complexity: 'Simple', effort: 1 },
        ]
      },
    ]
  },
  {
    module: 'II. QUẢN LÝ ĐỊNH MỨC KỸ THUẬT',
    groups: [
      {
        group: '1. Định mức vật tư / nhiên liệu',
        tasks: [
          { task: 'CRUD định mức vật tư theo công đoạn sản xuất', detail: 'Nhập định mức tiêu hao vật tư, nhiên liệu theo từng công đoạn SX; liên kết mã vật tư Esoft', complexity: 'Medium', effort: 4 },
          { task: 'Cập nhật đơn giá định mức', detail: 'Cập nhật đơn giá vật tư; tính giá trị định mức tự động', complexity: 'Medium', effort: 3 },
          { task: 'Lịch sử thay đổi & phiên bản định mức vật tư', detail: 'Lưu log thay đổi; xem định mức theo thời điểm hiệu lực', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '2. Định mức nhân công & điện năng',
        tasks: [
          { task: 'CRUD định mức nhân công theo công đoạn / phân xưởng', detail: 'Số công / ca / tổ theo công đoạn; đơn giá tiền lương bình quân', complexity: 'Medium', effort: 3 },
          { task: 'CRUD định mức tiêu thụ điện năng', detail: 'Định mức kWh theo phân xưởng / máy móc; liên kết với Cost Center', complexity: 'Medium', effort: 3 },
          { task: 'Lịch sử thay đổi định mức nhân công & điện', detail: 'Lưu log; tra cứu định mức tại thời điểm bất kỳ', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '3. Cảnh báo vượt định mức',
        tasks: [
          { task: 'Cấu hình ngưỡng cảnh báo vượt định mức (%)', detail: 'Thiết lập % vượt cảnh báo theo từng yếu tố / phân xưởng', complexity: 'Medium', effort: 3 },
          { task: 'Hệ thống thông báo cảnh báo tự động', detail: 'Push notification / email khi chi phí thực tế vượt định mức theo ngưỡng đã cấu hình', complexity: 'Complex', effort: 4 },
          { task: 'Danh sách cảnh báo & xác nhận xử lý', detail: 'Màn hình theo dõi cảnh báo; ghi chú nguyên nhân; xác nhận đã xử lý', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
  {
    module: 'III. KẾ HOẠCH CHI PHÍ',
    groups: [
      {
        group: '1. Lập & phân bổ kế hoạch',
        tasks: [
          { task: 'Lập kế hoạch chi phí năm / quý / tháng', detail: 'Form nhập kế hoạch tổng thể; phân kỳ tháng/quý từ kế hoạch năm', complexity: 'Complex', effort: 5 },
          { task: 'Phân bổ kế hoạch xuống Cost Center & yếu tố chi phí', detail: 'Phân bổ chi tiết kế hoạch xuống từng phân xưởng, từng yếu tố chi phí', complexity: 'Complex', effort: 5 },
          { task: 'Nhập kế hoạch sản lượng (tấn than / mét lò)', detail: 'Nhập kế hoạch sản lượng theo kỳ; làm cơ sở tính định mức', complexity: 'Medium', effort: 3 },
        ]
      },
      {
        group: '2. Phê duyệt & theo dõi kế hoạch',
        tasks: [
          { task: 'Workflow phê duyệt kế hoạch chi phí đa cấp', detail: 'Luồng: Phòng lập → Phòng thẩm định → BGĐ phê duyệt; thông báo email', complexity: 'Complex', effort: 5 },
          { task: 'Điều chỉnh kế hoạch chi phí giữa kỳ', detail: 'Tạo phiên bản kế hoạch điều chỉnh; lưu lịch sử phiên bản', complexity: 'Medium', effort: 3 },
          { task: 'Theo dõi tỷ lệ thực hiện kế hoạch theo kỳ', detail: 'Bảng so sánh kế hoạch vs thực tế; % hoàn thành; cảnh báo chênh lệch', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
  {
    module: 'IV. TẬP HỢP CHI PHÍ THỰC TẾ',
    groups: [
      {
        group: '1. Thu thập chi phí từ hệ thống tích hợp',
        tasks: [
          { task: 'Thu thập chi phí vật tư từ phần mềm Vật tư Esoft', detail: 'Lấy dữ liệu phiếu xuất kho theo phân xưởng; phân loại theo yếu tố chi phí; mapping Cost Center', complexity: 'Complex', effort: 6 },
          { task: 'Thu thập chi phí lương từ phần mềm Lương ISA', detail: 'Lấy dữ liệu lương theo phân xưởng / tổ; mapping vào yếu tố chi phí nhân công', complexity: 'Complex', effort: 5 },
          { task: 'Thu thập dữ liệu khấu hao / sửa chữa từ Kế toán Esoft', detail: 'Lấy chi phí khấu hao TSCĐ theo phân xưởng; chi phí sửa chữa lớn/thường xuyên', complexity: 'Complex', effort: 5 },
          { task: 'Thu thập sản lượng thực tế từ HMO (tấn than, mét lò)', detail: 'Lấy số liệu khối lượng khai thác thực tế theo ca/ngày từ HMO', complexity: 'Complex', effort: 5 },
        ]
      },
      {
        group: '2. Nhập bổ sung & điều chỉnh chi phí',
        tasks: [
          { task: 'Nhập chi phí điện năng thực tế theo phân xưởng', detail: 'Form nhập kWh thực tế / tiền điện theo phân xưởng / ca; liên kết Cost Center', complexity: 'Medium', effort: 3 },
          { task: 'Nhập bổ sung chi phí chung phân xưởng', detail: 'Form nhập các chi phí chung khác chưa từ hệ thống tích hợp; phê duyệt trước ghi nhận', complexity: 'Medium', effort: 3 },
          { task: 'Phân bổ chi phí chung theo tiêu thức', detail: 'Cấu hình tiêu thức phân bổ (sản lượng, nhân công, diện tích...); tự động tính phân bổ', complexity: 'Complex', effort: 5 },
          { task: 'Đối soát & điều chỉnh chi phí cuối kỳ', detail: 'Ghi nhận bút toán điều chỉnh; phê duyệt; lưu lịch sử điều chỉnh', complexity: 'Medium', effort: 4 },
          { task: 'Khóa & mở kỳ chi phí', detail: 'Khóa kỳ sau khi xác nhận số liệu; ngăn thay đổi dữ liệu đã khóa', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
  {
    module: 'V. TÍNH GIÁ THÀNH SẢN PHẨM',
    groups: [
      {
        group: '1. Tập hợp & tính toán giá thành',
        tasks: [
          { task: 'Tập hợp chi phí theo phân xưởng / công đoạn sản xuất', detail: 'Tổng hợp toàn bộ yếu tố chi phí theo từng phân xưởng và công đoạn SX trong kỳ', complexity: 'Complex', effort: 6 },
          { task: 'Tính giá thành đơn vị theo tấn than', detail: 'Giá thành / tấn = Tổng chi phí phân xưởng / Sản lượng than thực tế; phân tách theo yếu tố', complexity: 'Complex', effort: 6 },
          { task: 'Tính giá thành đơn vị theo mét lò', detail: 'Giá thành / m = Tổng chi phí đào lò / Số mét lò thực tế; phân tách theo yếu tố', complexity: 'Complex', effort: 6 },
          { task: 'Xử lý sản phẩm dở dang cuối kỳ', detail: 'Nhập / tính tỷ lệ hoàn thành sản phẩm dở dang; phân bổ chi phí tương ứng', complexity: 'Complex', effort: 5 },
        ]
      },
      {
        group: '2. Phân tích biến động giá thành',
        tasks: [
          { task: 'Phân tích biến động giá thành: thực tế vs định mức', detail: 'Chênh lệch theo từng yếu tố chi phí; phân tích nguyên nhân (lượng / giá)', complexity: 'Complex', effort: 6 },
          { task: 'Phân tích biến động giá thành: thực tế vs kế hoạch', detail: 'So sánh giá thành thực tế với kế hoạch theo kỳ / phân xưởng', complexity: 'Complex', effort: 5 },
          { task: 'Báo cáo giá thành chi tiết theo đối tượng', detail: 'Báo cáo giá thành chi tiết từng phân xưởng, công đoạn, đối tượng tập hợp; xuất Excel/PDF', complexity: 'Medium', effort: 4 },
        ]
      },
    ]
  },
  {
    module: 'VI. TÍCH HỢP HỆ THỐNG NGOÀI',
    groups: [
      {
        group: '1. Kết nối & mapping dữ liệu',
        tasks: [
          { task: 'Thiết kế kiến trúc tích hợp & ETL Pipeline', detail: 'Thiết kế luồng dữ liệu tổng thể; xây dựng ETL job; xử lý lỗi; log đồng bộ', complexity: 'Very Complex', effort: 8 },
          { task: 'Kết nối & mapping phần mềm Kế toán Esoft', detail: 'Database Link SQL/Oracle; mapping bảng dữ liệu kế toán; test dữ liệu', complexity: 'Very Complex', effort: 7 },
          { task: 'Kết nối & mapping phần mềm Lương ISA', detail: 'Database Link; mapping dữ liệu lương theo phân xưởng; xử lý ngoại lệ', complexity: 'Complex', effort: 6 },
          { task: 'Kết nối & mapping phần mềm Vật tư Esoft', detail: 'Database Link; mapping phiếu xuất kho, mã vật tư; đồng bộ master data', complexity: 'Complex', effort: 6 },
          { task: 'Kết nối & mapping phần mềm HMO (Khối lượng Mỏ)', detail: 'Database Link / file export; mapping sản lượng tấn than, mét lò theo phân xưởng/ca', complexity: 'Complex', effort: 6 },
        ]
      },
      {
        group: '2. Vận hành đồng bộ',
        tasks: [
          { task: 'Cơ chế đồng bộ tự động theo ca / ngày', detail: 'Scheduled job chạy tự động; cấu hình lịch đồng bộ; retry khi lỗi', complexity: 'Complex', effort: 5 },
          { task: 'Màn hình theo dõi trạng thái đồng bộ', detail: 'Dashboard trạng thái job; log lỗi; cảnh báo khi đồng bộ thất bại', complexity: 'Medium', effort: 4 },
          { task: 'Xử lý xung đột & chuẩn hóa master data', detail: 'Mapping mã vật tư, mã nhân viên giữa các hệ thống; xử lý trùng lặp / thiếu', complexity: 'Complex', effort: 5 },
        ]
      },
    ]
  },
  {
    module: 'VII. BÁO CÁO & PHÂN TÍCH CHI PHÍ',
    groups: [
      {
        group: '1. Dashboard & báo cáo tổng quan',
        tasks: [
          { task: 'Dashboard chi phí tổng quan (cập nhật theo ca/ngày)', detail: 'KPI: tổng chi phí, % thực hiện kế hoạch, top yếu tố vượt định mức; biểu đồ xu hướng', complexity: 'Complex', effort: 6 },
          { task: 'Dashboard chi phí theo phân xưởng', detail: 'Drill-down từ công ty → phân xưởng → công đoạn; so sánh giữa các phân xưởng', complexity: 'Complex', effort: 5 },
        ]
      },
      {
        group: '2. Báo cáo chi tiết chi phí',
        tasks: [
          { task: 'Báo cáo chi phí theo Cost Center (tháng/quý/năm)', detail: 'Tổng hợp chi phí từng Cost Center theo kỳ; so sánh kỳ trước', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo chi phí theo yếu tố (vật tư / nhân công / điện / khấu hao / chung)', detail: 'Phân tích cơ cấu chi phí theo yếu tố; tỷ lệ % từng yếu tố', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo biến động chi phí (thực tế vs kế hoạch vs định mức)', detail: 'Ma trận so sánh 3 chiều; phân tích chênh lệch; xuất Excel', complexity: 'Complex', effort: 5 },
          { task: 'Báo cáo giá thành sản phẩm (tấn than / mét lò theo kỳ)', detail: 'Giá thành đơn vị theo kỳ; so sánh nhiều kỳ; phân tích xu hướng', complexity: 'Medium', effort: 4 },
          { task: 'Báo cáo cảnh báo vượt định mức', detail: 'Danh sách vượt định mức; % vượt; phân xưởng; nguyên nhân; trạng thái xử lý', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo tổng hợp toàn công ty theo yêu cầu BGĐ', detail: 'Các báo cáo tổng hợp cấp công ty; xuất Excel/PDF theo mẫu', complexity: 'Medium', effort: 4 },
        ]
      },
      {
        group: '3. Xuất & chia sẻ báo cáo',
        tasks: [
          { task: 'Xuất báo cáo Excel / PDF', detail: 'Tất cả báo cáo hỗ trợ xuất Excel và PDF; định dạng theo mẫu doanh nghiệp', complexity: 'Simple', effort: 2 },
          { task: 'Lập lịch gửi báo cáo tự động qua email', detail: 'Cấu hình báo cáo tự động gửi email theo lịch (ngày/tuần/tháng)', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
];

// ============================================================
// HELPERS
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
// BUILD
// ============================================================
async function build() {
  const wb = new ExcelJS.Workbook();
  wb.creator  = 'EST Tool';
  wb.modified = new Date();

  // ─────────────────────────────────────────────────────────
  // SHEET 1: ESTIMATION DETAIL
  // ─────────────────────────────────────────────────────────
  const ws = wb.addWorksheet('ESTIMATION DETAIL');
  ws.views = [{ state: 'frozen', xSplit: 0, ySplit: 3 }];
  ws.columns = [
    { width: 2  },   // A padding
    { width: 6  },   // B STT
    { width: 40 },   // C Task
    { width: 55 },   // D Detail
    { width: 14 },   // E Complexity
    { width: 14 },   // F Effort (days)
    { width: 4  },   // G padding
  ];

  // --- Title row ---
  const t1 = ws.addRow(['', 'HỆ THỐNG QUẢN LÝ CHI PHÍ & GIÁM SÁT GIÁ THÀNH – Estimation Detail', '', '', '', '', '']);
  ws.mergeCells('B1:F1');
  t1.height = 30;
  t1.getCell('B').fill      = fill(C.titleBg);
  t1.getCell('B').font      = font('FFFFFF', true, 13);
  t1.getCell('B').alignment = align('center', 'middle');

  // --- Subtitle ---
  const t2 = ws.addRow(['', 'Dự án: Phần mềm Quản lý Chi phí On-premise | Khách hàng: Công ty Than (TKV) | Ngày: ' + new Date().toLocaleDateString('vi-VN'), '', '', '', '', '']);
  ws.mergeCells('B2:F2');
  t2.height = 18;
  t2.getCell('B').font      = font('2E75B6', false, 10);
  t2.getCell('B').alignment = align('left', 'middle', false);

  // --- Header row ---
  const hd = ws.addRow(['', 'STT', 'Chức năng / Task', 'Chi tiết nghiệp vụ', 'Complexity', 'Effort\n(person.days)', '']);
  hd.height = 36;
  ['B','C','D','E','F'].forEach(col => {
    hd.getCell(col).fill      = fill(C.headerBg);
    hd.getCell(col).font      = font('FFFFFF', true, 11);
    hd.getCell(col).alignment = align('center', 'middle');
    hd.getCell(col).border    = border();
  });

  let allEffort = 0;
  let rowNo = 1;

  for (const mod of modules) {
    const modEffort = mod.groups.reduce((s, g) => s + g.tasks.reduce((ss, t) => ss + t.effort, 0), 0);
    allEffort += modEffort;

    // Module header row
    const mr = ws.addRow(['', '', mod.module, '', '', modEffort, '']);
    ws.mergeCells(`C${mr.number}:E${mr.number}`);
    mr.height = 22;
    ['B','C','E','F'].forEach(col => {
      mr.getCell(col).fill      = fill(C.moduleHd);
      mr.getCell(col).font      = font(C.moduleFg, true, 11);
      mr.getCell(col).border    = border();
      mr.getCell(col).alignment = align('left', 'middle', false);
    });
    mr.getCell('F').alignment = align('center', 'middle', false);
    mr.getCell('F').numFmt    = '0.0';

    for (const grp of mod.groups) {
      const gEffort = grp.tasks.reduce((s, t) => s + t.effort, 0);

      // Group header row
      const gr = ws.addRow(['', '', '  ' + grp.group, '', '', gEffort, '']);
      ws.mergeCells(`C${gr.number}:E${gr.number}`);
      gr.height = 18;
      ['B','C','E','F'].forEach(col => {
        gr.getCell(col).fill      = fill(C.groupBg);
        gr.getCell(col).font      = font(C.groupFg, true, 10);
        gr.getCell(col).border    = border();
        gr.getCell(col).alignment = align('left', 'middle', false);
      });
      gr.getCell('F').alignment = align('center', 'middle', false);
      gr.getCell('F').numFmt    = '0.0';

      let isAlt = false;
      for (const t of grp.tasks) {
        const tr = ws.addRow(['', rowNo++, t.task, t.detail, t.complexity, t.effort, '']);
        tr.height = 30;

        const rowBg = isAlt ? C.altRow : 'FFFFFF';
        isAlt = !isAlt;

        ['B','C','D'].forEach(col => {
          tr.getCell(col).fill      = fill(rowBg);
          tr.getCell(col).font      = font('404040', false, 10);
          tr.getCell(col).border    = border();
          tr.getCell(col).alignment = align(col === 'B' ? 'center' : 'left', 'middle', col !== 'B');
        });

        // Complexity cell – colored
        const cc = complexColor[t.complexity] || { bg: 'FFFFFF', fg: '000000' };
        tr.getCell('E').fill      = fill(cc.bg);
        tr.getCell('E').font      = font(cc.fg, true, 10);
        tr.getCell('E').border    = border();
        tr.getCell('E').alignment = align('center', 'middle', false);

        // Effort cell
        tr.getCell('F').fill      = fill(rowBg);
        tr.getCell('F').font      = font('404040', true, 10);
        tr.getCell('F').border    = border();
        tr.getCell('F').alignment = align('center', 'middle', false);
        tr.getCell('F').numFmt    = '0.0';
      }
    }
  }

  // Total row
  const totalRow = ws.addRow(['', '', 'TOTAL EFFORT', '', '', allEffort, '']);
  ws.mergeCells(`C${totalRow.number}:E${totalRow.number}`);
  totalRow.height = 24;
  ['B','C','E','F'].forEach(col => {
    totalRow.getCell(col).fill      = fill(C.totalBg);
    totalRow.getCell(col).font      = font(C.totalFg, true, 12);
    totalRow.getCell(col).border    = border();
    totalRow.getCell(col).alignment = align(col === 'F' ? 'center' : 'left', 'middle', false);
  });
  totalRow.getCell('F').numFmt = '0.0';

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

  const s1 = ws2.addRow(['', 'HT Quản lý Chi phí & Giám sát Giá thành – WBS Estimation Summary', '', '', '', '', '', '']);
  ws2.mergeCells('B1:G1');
  s1.height = 28;
  s1.getCell('B').fill      = fill(C.titleBg);
  s1.getCell('B').font      = font('FFFFFF', true, 13);
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
    { level: 'Simple',       bg: 'E2EFDA', fg: '375623', desc: 'Danh mục CRUD đơn giản, hiển thị dữ liệu tĩnh, báo cáo đơn giản. Effort: 1–3 ngày.' },
    { level: 'Medium',       bg: 'FFEB9C', fg: '9C5700', desc: 'Form nhập liệu có logic xử lý, báo cáo tổng hợp, workflow đơn giản. Effort: 3–5 ngày.' },
    { level: 'Complex',      bg: 'FFC7CE', fg: '9C0006', desc: 'Workflow đa cấp, dashboard KPI, tích hợp hệ thống, tính toán nghiệp vụ phức tạp. Effort: 5–7 ngày.' },
    { level: 'Very Complex', bg: 'FF0000', fg: 'FFFFFF', desc: 'ETL pipeline, kiến trúc tích hợp đa hệ thống, tính giá thành tự động, báo cáo tài chính. Effort: 7–10 ngày.' },
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
  const outPath = 'C:\\Users\\LongLV\\Downloads\\EST_QuanLyChiPhi.xlsx';
  await wb.xlsx.writeFile(outPath);

  const totalTasks  = modules.reduce((s, m) => s + m.groups.reduce((ss, g) => ss + g.tasks.length, 0), 0);
  console.log('✅ Done! Saved to:', outPath);
  console.log('   Total tasks  :', totalTasks);
  console.log('   Total effort :', allEffort, 'person.days =', (allEffort / 22).toFixed(1), 'man.months');
}

build().catch(console.error);
