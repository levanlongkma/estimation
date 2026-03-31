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
};

const complexColor = {
  'Simple':       { bg: 'E2EFDA', fg: '375623' },
  'Medium':       { bg: 'FFEB9C', fg: '9C5700' },
  'Complex':      { bg: 'FFC7CE', fg: '9C0006' },
  'Very Complex': { bg: 'FF0000', fg: 'FFFFFF' },
};

// ============================================================
// DATA – F&B INTERNAL OPERATION SYSTEM  [~172 days]
// Chiến lược: merge task nhỏ · trust Supabase/FlutterFlow built-ins
//             giữ toàn bộ core business logic · tối giản effort
// ============================================================
const modules = [

  // ── MODULE 1: HỆ THỐNG & PHÂN QUYỀN  [13d] ─────────────
  {
    module: 'I. HỆ THỐNG & PHÂN QUYỀN',
    groups: [
      {
        group: '1. Auth & User Management',
        tasks: [
          {
            task: 'Supabase Auth + User / Employee CRUD + Profile + Location',
            detail: 'Login/logout email/phone; session + refresh token; CRUD user gắn Employee profile; role assignment; đổi mật khẩu; Location CRUD (tọa độ GPS tâm + bán kính check-in)',
            complexity: 'Medium', effort: 3
          },
          {
            task: 'Role-based access (5 roles) + No-self-approve policy',
            detail: '5 role: Employee / Supervisor / Manager / GM / HR; permission matrix theo màn hình & action; middleware chặn tự approve dữ liệu do mình nhập; test từng role',
            complexity: 'Complex', effort: 3
          },
          {
            task: 'Notification setup (in-app + push)',
            detail: 'FCM push notification + in-app alert; template theo loại event (KPI update, complaint, ca mới, lương); badge count; mark-as-read',
            complexity: 'Simple', effort: 1
          },
        ]
      },
      {
        group: '2. Row Level Security (RLS)',
        tasks: [
          {
            task: 'RLS policies toàn hệ thống (20+ bảng, 5 roles)',
            detail: 'NV chỉ thấy data mình; Supervisor thấy team mình; Manager thấy bộ phận; GM full access; HR chỉ payroll; test từng role + edge cases; kiểm tra bằng Supabase SQL editor',
            complexity: 'Very Complex', effort: 6
          },
        ]
      },
    ]
  },

  // ── MODULE 2: NHÂN VIÊN  [18d] ──────────────────────────
  {
    module: 'II. MODULE NHÂN VIÊN',
    groups: [
      {
        group: '1. Home + Check-in / Check-out',
        tasks: [
          {
            task: 'Home screen (KPI tổng quan, thu nhập dự kiến, rank, alerts)',
            detail: 'Card: điểm KPI kỳ hiện tại, thu nhập dự kiến, rank trong team, số vi phạm pending; cảnh báo ca sắp tới; mobile-first; load < 1s',
            complexity: 'Medium', effort: 2
          },
          {
            task: 'Check-in / Check-out với GPS bắt buộc',
            detail: 'Lấy GPS thiết bị; validate trong bán kính location cấu hình; ghi timestamp; check-out tính tổng giờ làm; ghi AttendanceLog; cảnh báo nếu quên check-out; lịch sử 7 ngày',
            complexity: 'Complex', effort: 4
          },
        ]
      },
      {
        group: '2. KPI Cá nhân',
        tasks: [
          {
            task: 'KPI tổng quan + Breakdown chi tiết theo từng tiêu chí',
            detail: 'Tổng điểm KPI kỳ hiện tại; progress ring % vs target; rank team; breakdown từng tiêu chí (AOV, speed, feedback, attendance, KPI mềm); điểm đạt / trọng số; màu theo mức; so sánh kỳ trước',
            complexity: 'Complex', effort: 3
          },
          {
            task: 'Explainable KPI – timeline lý do cộng/trừ điểm',
            detail: 'Timeline sự kiện ảnh hưởng KPI: complaint trừ điểm, feedback cộng, chấm KPI mềm; link về source log; trạng thái approved/pending; giải thích công thức tính',
            complexity: 'Complex', effort: 3
          },
        ]
      },
      {
        group: '3. Lương + Vi phạm',
        tasks: [
          {
            task: 'Màn hình lương (breakdown đầy đủ + lịch sử các kỳ)',
            detail: 'Breakdown: Base + KPI Bonus + Tips - Penalty + Adjustments = Tổng; trạng thái kỳ (đang tính/đã chốt/đã trả); lịch sử các kỳ đã thanh toán; download PDF payslip',
            complexity: 'Medium', effort: 3
          },
          {
            task: 'Màn hình vi phạm cá nhân',
            detail: 'Danh sách complaint/waste/đi trễ; trạng thái pending/approved/rejected; level L1/L2/L3; lý do; điểm bị trừ tương ứng',
            complexity: 'Medium', effort: 3
          },
        ]
      },
    ]
  },

  // ── MODULE 3: SUPERVISOR / MANAGER  [27d] ───────────────
  {
    module: 'III. MODULE SUPERVISOR / MANAGER',
    groups: [
      {
        group: '1. Shift Dashboard',
        tasks: [
          {
            task: 'Shift Dashboard (doanh thu ca, KPI team, danh sách NV realtime)',
            detail: 'Card: doanh thu ca, KPI team TB, số NV check-in / chưa / trễ cập nhật realtime (Supabase Realtime); top/bottom performer ca; cảnh báo attendance issue',
            complexity: 'Complex', effort: 4
          },
        ]
      },
      {
        group: '2. End-of-Shift Entry Wizard (module cốt lõi)',
        tasks: [
          {
            task: 'Wizard Step 1 + 2: Nhập doanh thu ca + Chấm KPI mềm',
            detail: 'Step 1: tổng doanh thu ca; validation không âm; ghi RevenueLogs. Step 2: danh sách NV trong ca; chấm từng tiêu chí KPI mềm (speed/thái độ/teamwork) bằng rating slider; ghi chú per person; batch submit',
            complexity: 'Complex', effort: 4
          },
          {
            task: 'Wizard Step 3 + 4: Complaint + Waste logging',
            detail: 'Step 3: chọn NV, level L1/L2/L3, mô tả, đính kèm ảnh → pending approval; Step 4: chọn item waste, giá trị, phân loại lỗi cá nhân/hệ thống, NV liên quan nếu có',
            complexity: 'Complex', effort: 3
          },
          {
            task: 'Wizard Step 5: Xác nhận Attendance + Submit shift report',
            detail: 'Danh sách NV ca: xác nhận đủ / thiếu / quên check-out / sai ca; Supervisor override giờ có lý do; Summary screen review toàn bộ 5 bước → Submit → ghi ShiftReport → notify GM',
            complexity: 'Complex', effort: 3
          },
          {
            task: 'Lịch sử Shift Report + trạng thái + re-edit',
            detail: 'Danh sách ca đã nhập; trạng thái draft/submitted/approved/rejected; xem chi tiết; re-edit nếu bị reject với note lý do',
            complexity: 'Simple', effort: 2
          },
        ]
      },
      {
        group: '3. Team & Roster',
        tasks: [
          {
            task: 'Team KPI + Attendance overview',
            detail: 'Bảng KPI từng NV team; sort/filter top/bottom; tổng hợp attendance (trễ/vắng) theo tuần/tháng; highlight NV có vấn đề; xuất Excel nhanh',
            complexity: 'Medium', effort: 3
          },
          {
            task: 'Roster – Calendar view + Assign ca + Copy pattern',
            detail: 'Calendar view tuần/tháng; assign ca cho NV; copy pattern tuần trước; cảnh báo conflict (trùng ca); màu sắc theo loại ca sáng/chiều/tối; filter theo bộ phận',
            complexity: 'Complex', effort: 6
          },
          {
            task: 'Roster – Approve đổi ca (Swap Request)',
            detail: 'NV gửi swap request; Supervisor nhận notification; approve/reject; hệ thống tự cập nhật roster; ghi ApprovalLog; notify cả 2 NV liên quan',
            complexity: 'Medium', effort: 2
          },
        ]
      },
    ]
  },

  // ── MODULE 4: GENERAL MANAGER  [26d] ────────────────────
  {
    module: 'IV. MODULE GENERAL MANAGER',
    groups: [
      {
        group: '1. System Dashboard',
        tasks: [
          {
            task: 'Dashboard tổng quan (KPI, doanh thu, top/bottom, operational alerts)',
            detail: 'KPI TB toàn hệ thống; doanh thu ngày/tuần/tháng; top 5 / bottom 5 performer; số item pending duyệt; cảnh báo: ca chưa submit, NV vắng, KPI tụt ngưỡng, waste bất thường',
            complexity: 'Complex', effort: 4
          },
        ]
      },
      {
        group: '2. Approval Queue',
        tasks: [
          {
            task: 'Duyệt Complaint + Waste (Approve / Reject / Request Edit)',
            detail: 'Queue complaint & waste pending; xem chi tiết (NV, level, ảnh đính kèm, supervisor, ca); Approve/Reject/Request Edit với note bắt buộc; trigger KPI recalculate tự động sau approve',
            complexity: 'Complex', effort: 4
          },
          {
            task: 'Duyệt Shift Report + Điều chỉnh KPI thủ công (Manual Adjustment)',
            detail: 'Queue shift report pending; Approve/Reject với note; Manual KPI Adj: chọn NV, tiêu chí, nhập điểm +/-, bắt buộc lý do, ghi AuditLog, trigger recalculate',
            complexity: 'Complex', effort: 4
          },
        ]
      },
      {
        group: '3. Data Lock Center',
        tasks: [
          {
            task: 'Daily Lock + Monthly Lock + Calendar trạng thái',
            detail: 'Lock ngày: cảnh báo pending items còn lại trước khi lock; lock tất cả write operations ngày đó. Lock tháng: chỉ khi tất cả ngày locked. Calendar: màu trạng thái lock/open, số pending/ngày',
            complexity: 'Complex', effort: 6
          },
        ]
      },
      {
        group: '4. Manager KPI + Báo cáo',
        tasks: [
          {
            task: 'Chấm KPI Manager / Supervisor định kỳ',
            detail: '5 tiêu chí: Training, Turnover, Ownership, Compliance, Team Performance; rating 1-5 + ghi chú từng tiêu chí; submit → lock KPI quản lý tháng; lịch sử các kỳ + so sánh',
            complexity: 'Complex', effort: 4
          },
          {
            task: 'Báo cáo vận hành tổng hợp (KPI + Complaint/Waste + Attendance) – xuất Excel/PDF',
            detail: 'Báo cáo KPI tổng hợp theo kỳ/location; top vi phạm; tỷ lệ chuyên cần; doanh thu theo ca; filter theo kỳ và location; xuất Excel (pivot) và PDF',
            complexity: 'Medium', effort: 4
          },
        ]
      },
    ]
  },

  // ── MODULE 5: HR / PAYROLL  [14d] ───────────────────────
  {
    module: 'V. MODULE HR / PAYROLL',
    groups: [
      {
        group: '1. Payroll Dashboard + Detail',
        tasks: [
          {
            task: 'Payroll Dashboard + Danh sách NV kỳ hiện tại',
            detail: 'Tổng quỹ lương kỳ; breakdown base/bonus/tips/penalty; trạng thái kỳ; danh sách NV: tên/role/tổng lương/trạng thái; search/filter; highlight bất thường (tăng/giảm > 20%)',
            complexity: 'Medium', effort: 3
          },
          {
            task: 'Payroll Detail per NV + Tips nhập tay + Adjustment có audit',
            detail: 'Breakdown đầy đủ từng dòng: KPI bonus (từng tiêu chí), penalty (từng vi phạm có link), adjustment (lý do + AuditLog); HR nhập tips từng NV hoặc import Excel',
            complexity: 'Complex', effort: 4
          },
        ]
      },
      {
        group: '2. Chốt Payroll + Export',
        tasks: [
          {
            task: 'Finalize Payroll + Approval flow (HR submit → GM approve)',
            detail: 'Chỉ finalize khi Monthly Lock; HR preview và submit → GM approve → locked; preview flag lương bất thường; ghi ApprovalLog đầy đủ',
            complexity: 'Complex', effort: 4
          },
          {
            task: 'Export Excel bảng lương tổng + PDF payslip từng NV',
            detail: 'Excel: tổng hợp + sheet chi tiết từng NV; PDF payslip: logo, tên NV, kỳ, breakdown đầy đủ, tổng; lịch sử kỳ cũ download lại được',
            complexity: 'Medium', effort: 3
          },
        ]
      },
    ]
  },

  // ── MODULE 6: KPI ENGINE  [19d] ─────────────────────────
  {
    module: 'VI. KPI ENGINE',
    groups: [
      {
        group: '1. KPI & Payroll Rules Configuration',
        tasks: [
          {
            task: 'CRUD KPI Rules (tiêu chí, trọng số, nguồn, ngưỡng cảnh báo)',
            detail: 'Admin tạo/sửa tiêu chí KPI: tên, weight (%), nguồn data (attendance/revenue/feedback/complaint/KPI mềm); effective date; ngưỡng cảnh báo per role; version history',
            complexity: 'Complex', effort: 4
          },
          {
            task: 'CRUD Payroll Rules (bonus % theo điểm KPI, penalty theo level vi phạm)',
            detail: 'Map dải điểm KPI → % bonus; map complaint level L1/L2/L3 → penalty (VND); công thức Final Salary; version lưu theo thời gian để tính đúng kỳ cũ',
            complexity: 'Complex', effort: 3
          },
        ]
      },
      {
        group: '2. KPI Calculation Engine (Edge Functions)',
        tasks: [
          {
            task: 'Edge Function: tính điểm KPI tự động (event trigger + cron daily)',
            detail: 'Trigger sau approve event + cron cuối ngày; tổng hợp attendance, revenue, feedback, complaint đã approved; tính điểm từng tiêu chí theo rule + weight; ghi KPIResults; retry on fail; idempotent',
            complexity: 'Very Complex', effort: 7
          },
          {
            task: 'KPI Recalculation khi approve/reject complaint hoặc waste',
            detail: 'Database trigger → edge function recalculate KPI NV liên quan ngay lập tức; cập nhật KPIResults real-time; log kết quả trước/sau; notify NV nếu điểm thay đổi',
            complexity: 'Complex', effort: 3
          },
        ]
      },
      {
        group: '3. KPI Display',
        tasks: [
          {
            task: 'Team KPI Ranking (leaderboard realtime)',
            detail: 'Bảng xếp hạng NV theo KPI trong team/location; Supabase Realtime live update; badge top 3; trend arrow so với hôm qua; filter theo kỳ',
            complexity: 'Medium', effort: 2
          },
        ]
      },
    ]
  },

  // ── MODULE 7: PAYROLL ENGINE  [16d] ─────────────────────
  {
    module: 'VII. PAYROLL ENGINE',
    groups: [
      {
        group: '1. Payroll Calculation Engine (Edge Functions)',
        tasks: [
          {
            task: 'Edge Function: Payroll formula engine (Base + KPI Bonus + Tips - Penalty + Adj)',
            detail: 'Chỉ chạy trên data đã approved & locked; tính per NV; ghi PayrollDetails với version snapshot; idempotent; log chi tiết từng dòng; có thể trigger thủ công bởi HR',
            complexity: 'Very Complex', effort: 8
          },
          {
            task: 'Auto Bonus + Auto Penalty từ approved logs',
            detail: 'Map KPIResults đã approved → bonus theo PayrollRule version tại kỳ; tổng hợp complaint/waste approved → penalty; gắn source link vào từng dòng payroll detail',
            complexity: 'Complex', effort: 4
          },
        ]
      },
      {
        group: '2. Payroll Period Management',
        tasks: [
          {
            task: 'Quản lý kỳ lương + Preview bất thường + Approval flow',
            detail: 'Tạo/đóng kỳ lương (tháng/2 tuần); chỉ 1 kỳ open tại 1 thời điểm; preview trước finalize với flag tăng/giảm > X%; HR submit → GM approve → locked; ghi ApprovalLog',
            complexity: 'Complex', effort: 4
          },
        ]
      },
    ]
  },

  // ── MODULE 8: GOVERNANCE & AUDIT  [11d] ─────────────────
  {
    module: 'VIII. GOVERNANCE & AUDIT TRAIL',
    groups: [
      {
        group: '1. Audit Trail',
        tasks: [
          {
            task: 'Audit Log toàn hệ thống + Màn hình lọc & export',
            detail: 'Ghi AuditLog mọi action quan trọng: create/update/delete/approve/reject; lưu giá trị trước/sau (before/after); user_id; timestamp; không thể xóa. GM lọc theo user/module/thời gian; export Excel',
            complexity: 'Complex', effort: 4
          },
          {
            task: 'Approval Log + lịch sử phê duyệt',
            detail: 'Lịch sử approve/reject: complaint, waste, shift report, payroll; ai duyệt, lúc nào, note lý do; xem theo NV hoặc theo GM/kỳ',
            complexity: 'Medium', effort: 3
          },
        ]
      },
      {
        group: '2. Data Lock Engine',
        tasks: [
          {
            task: 'Lock policy engine + Emergency unlock có audit',
            detail: 'Middleware kiểm tra DataLocks trước mọi write operation; reject với thông báo rõ ràng; Emergency unlock: GM nhập lý do bắt buộc, ghi AuditLog với flag EMERGENCY, giới hạn số lần/tháng',
            complexity: 'Complex', effort: 4
          },
        ]
      },
    ]
  },

  // ── MODULE 9: DATABASE & BACKEND  [28d] ─────────────────
  {
    module: 'IX. DATABASE & BACKEND (Supabase)',
    groups: [
      {
        group: '1. Database & Infrastructure',
        tasks: [
          {
            task: 'Database schema (20 bảng) + Migration + Seed data + Indexes',
            detail: 'ERD đầy đủ: Users, Employees, Roles, Locations, Rosters, AttendanceLogs, ShiftReports, RevenueLogs, ComplaintLogs, WasteLogs, KPIResults, KPIRules, PayrollRules, PayrollPeriods, PayrollDetails, ApprovalLogs, AuditLogs, DataLocks, Attachments; migration files có thứ tự; seed data test; index cho date range / NV / ca',
            complexity: 'Complex', effort: 5
          },
          {
            task: 'Supabase Auth setup + custom JWT claims (role)',
            detail: 'Cấu hình email/phone auth; custom JWT claims cho role; auto-refresh token; logout all devices; liên kết Employee profile với auth.users',
            complexity: 'Medium', effort: 2
          },
        ]
      },
      {
        group: '2. Edge Functions & Automation',
        tasks: [
          {
            task: 'Edge Function: KPI Engine (Deno, trigger + cron)',
            detail: 'Deno function; trigger sau approve event + cron daily; xử lý đồng thời nhiều NV; retry on fail; log kết quả; idempotent; unit tests',
            complexity: 'Very Complex', effort: 6
          },
          {
            task: 'Edge Function: Payroll Engine (Deno, per kỳ)',
            detail: 'Deno function; chỉ chạy khi data locked; tính toàn kỳ hoặc per NV; idempotent; version snapshot tại thời điểm tính; log chi tiết từng dòng',
            complexity: 'Very Complex', effort: 6
          },
          {
            task: 'Cron Jobs: nhắc check-out + nhắc nhập ca + KPI daily summary',
            detail: 'Cron cuối ca nhắc NV chưa check-out; nhắc Supervisor nhập shift report nếu trễ; tổng hợp KPI cuối ngày; gửi alert GM khi có bất thường (waste spike, attendance thấp)',
            complexity: 'Complex', effort: 3
          },
          {
            task: 'Supabase Realtime + Storage (attachments, exports)',
            detail: 'Realtime: check-in live → Supervisor; complaint pending → GM badge; KPI thay đổi → NV thấy. Storage: buckets complaint-attachments, exports; signed URL; cleanup job cho file cũ',
            complexity: 'Medium', effort: 4
          },
          {
            task: 'Data integrity validation trước khi lock',
            detail: 'Kiểm tra trước khi lock ngày: còn pending items không? Shift report chưa submit? KPI chưa tính? Trả về danh sách cụ thể để GM xử lý trước khi lock',
            complexity: 'Medium', effort: 2
          },
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
  wb.creator  = 'F&B OPS EST Tool';
  wb.modified = new Date();

  // ─────────────────────────────────────────────────────────
  // SHEET 1: ESTIMATION DETAIL
  // ─────────────────────────────────────────────────────────
  const ws = wb.addWorksheet('ESTIMATION DETAIL');
  ws.columns = [
    { width: 2  },  // A padding
    { width: 6  },  // B No
    { width: 8  },  // C Code
    { width: 38 },  // D Name (Module/Group)
    { width: 42 },  // E Name (Task)
    { width: 58 },  // F Description / Detail Work
    { width: 2  },  // G gap
    { width: 14 },  // H Complex Level
    { width: 12 },  // I Coding Effort
    { width: 10 },  // J %Reuse
    { width: 12 },  // K Total Effort
    { width: 30 },  // L Note
    { width: 2  },  // M padding
  ];

  // --- Row 1: Title ---
  const r1 = ws.addRow(['', 'F&B INTERNAL OPERATION SYSTEM – Estimation Detail', '', '', '', '', '', '', '', '', '', '', '']);
  ws.mergeCells('B1:L1');
  r1.height = 32;
  r1.getCell('B').fill      = fill(C.titleBg);
  r1.getCell('B').font      = font('FFFFFF', true, 14);
  r1.getCell('B').alignment = align('center', 'middle');

  // --- Row 2: subtitle / note ---
  const r2 = ws.addRow(['', 'KPI · Payroll · Check-in · Roster · Performance  |  Stack: FlutterFlow + Supabase  |  Optimized ~200 person.days', '', '', '', '', '', '', '', '', '', 'Coding effort unit: person.days', '']);
  ws.mergeCells('B2:K2');
  r2.height = 16;
  r2.getCell('B').font      = font('2E75B6', false, 10);
  r2.getCell('B').alignment = align('left', 'middle', false);
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

  let seqNo = 1;
  let codeNo = 1;
  let oddRow = false;

  for (const mod of modules) {
    const mCode = String(codeNo++).padStart(3, '0');
    const mRow  = ws.addRow(['', seqNo++, mCode, mod.module, '', '', '', '', '', '', '', '', '']);
    ws.mergeCells(`D${mRow.number}:F${mRow.number}`);
    mRow.height = 20;
    ['B','C','D','H','I','J','K','L'].forEach(col => {
      mRow.getCell(col).fill      = fill(C.moduleHd);
      mRow.getCell(col).font      = font(C.moduleFg, true, 11);
      mRow.getCell(col).border    = border();
      mRow.getCell(col).alignment = align(['B','C','I','J','K'].includes(col) ? 'center' : 'left', 'middle', false);
    });

    for (const grp of mod.groups) {
      const gCode = String(codeNo++).padStart(3, '0');
      const gRow  = ws.addRow(['', seqNo++, gCode, grp.group, '', '', '', '', '', '', '', '', '']);
      ws.mergeCells(`D${gRow.number}:F${gRow.number}`);
      gRow.height = 18;
      ['B','C','D','H','I','J','K','L'].forEach(col => {
        gRow.getCell(col).fill      = fill(C.groupBg);
        gRow.getCell(col).font      = font(C.groupFg, true, 10);
        gRow.getCell(col).border    = border();
        gRow.getCell(col).alignment = align(['B','C'].includes(col) ? 'center' : 'left', 'middle', false);
      });

      for (const t of grp.tasks) {
        const tCode = String(codeNo++).padStart(3, '0');
        const rowBg = oddRow ? C.altRow : 'FFFFFF';
        oddRow = !oddRow;
        const cc = complexColor[t.complexity] || {};

        const tRow = ws.addRow(['', seqNo++, tCode, '', t.task, t.detail, '', t.complexity, t.effort, '', t.effort, '', '']);
        tRow.height = 34;

        tRow.getCell('B').fill = fill(rowBg); tRow.getCell('B').font = font('404040', false, 10); tRow.getCell('B').alignment = align('center','middle',false); tRow.getCell('B').border = border();
        tRow.getCell('C').fill = fill(rowBg); tRow.getCell('C').font = font('404040', false, 10); tRow.getCell('C').alignment = align('center','middle',false); tRow.getCell('C').border = border();
        tRow.getCell('E').fill = fill(rowBg); tRow.getCell('E').font = font('1F3864', false, 10); tRow.getCell('E').alignment = align('left','middle',true);   tRow.getCell('E').border = border();
        tRow.getCell('F').fill = fill(rowBg); tRow.getCell('F').font = font('404040', false, 9);  tRow.getCell('F').alignment = align('left','middle',true);   tRow.getCell('F').border = border();
        tRow.getCell('H').fill = cc.bg ? fill(cc.bg) : fill(rowBg); tRow.getCell('H').font = cc.fg ? font(cc.fg, true, 10) : font('404040', false, 10); tRow.getCell('H').alignment = align('center','middle',false); tRow.getCell('H').border = border();
        tRow.getCell('I').fill = fill(rowBg); tRow.getCell('I').font = font('404040', true, 10); tRow.getCell('I').alignment = align('center','middle',false); tRow.getCell('I').border = border(); tRow.getCell('I').numFmt = '0.0';
        tRow.getCell('J').fill = fill(rowBg); tRow.getCell('J').font = font('404040', false, 10); tRow.getCell('J').alignment = align('center','middle',false); tRow.getCell('J').border = border();
        tRow.getCell('K').fill = fill('E2EFDA'); tRow.getCell('K').font = font('375623', true, 10); tRow.getCell('K').alignment = align('center','middle',false); tRow.getCell('K').border = border(); tRow.getCell('K').numFmt = '0.0';
        tRow.getCell('L').fill = fill(rowBg); tRow.getCell('L').font = font('595959', false, 9); tRow.getCell('L').alignment = align('left','middle',true); tRow.getCell('L').border = border();
      }
    }
  }

  // TOTAL row
  const allEffort = modules.reduce((s,m)=>s+m.groups.reduce((ss,g)=>ss+g.tasks.reduce((sss,t)=>sss+t.effort,0),0),0);
  const totRow = ws.addRow(['', '', '', 'TOTAL', '', '', '', '', '', '', allEffort, '', '']);
  ws.mergeCells(`C${totRow.number}:F${totRow.number}`);
  totRow.height = 24;
  ['B','C','H','I','J','K','L'].forEach(col => { totRow.getCell(col).fill = fill(C.totalBg); totRow.getCell(col).border = border(); });
  totRow.getCell('C').fill = fill(C.totalBg); totRow.getCell('C').font = font(C.totalFg, true, 12); totRow.getCell('C').alignment = align('center','middle',false); totRow.getCell('C').border = border();
  totRow.getCell('K').font = font(C.totalFg, true, 12); totRow.getCell('K').alignment = align('center','middle',false); totRow.getCell('K').numFmt = '0.0';

  // ─────────────────────────────────────────────────────────
  // SHEET 2: ESTIMATION SUMMARY
  // ─────────────────────────────────────────────────────────
  const ws2 = wb.addWorksheet('ESTIMATION SUMMARY');
  ws2.columns = [{ width: 2 }, { width: 6 }, { width: 52 }, { width: 16 }, { width: 18 }, { width: 20 }, { width: 28 }, { width: 4 }];

  const s1 = ws2.addRow(['', 'F&B INTERNAL OPERATION SYSTEM – WBS Estimation Summary', '', '', '', '', '', '']);
  ws2.mergeCells('B1:G1');
  s1.height = 28;
  s1.getCell('B').fill = fill(C.titleBg); s1.getCell('B').font = font('FFFFFF', true, 13); s1.getCell('B').alignment = align('center', 'middle');

  ws2.addRow([]);

  const s3 = ws2.addRow(['', 'No', 'Work Content', 'Effort\n(person.days)', 'Man.months\n(1mm=22days)', 'Unit Cost\n(VND/mm)', 'Total Cost\n(VND)', '']);
  s3.height = 36;
  ['B','C','D','E','F','G'].forEach(col => {
    s3.getCell(col).fill = fill(C.summaryHd); s3.getCell(col).font = font('FFFFFF', true, 11); s3.getCell(col).alignment = align('center', 'middle'); s3.getCell(col).border = border();
  });

  ws2.addRow([]);

  let sNo = 1;
  for (const mod of modules) {
    const modEffort = mod.groups.reduce((s,g)=>s+g.tasks.reduce((ss,t)=>ss+t.effort,0),0);
    const mr = ws2.addRow(['', sNo++, mod.module, modEffort, (modEffort/22).toFixed(2), '', '', '']);
    mr.height = 18;
    ['B','C','D','E'].forEach(col => {
      mr.getCell(col).fill = fill(C.moduleHd); mr.getCell(col).font = font(C.moduleFg, true, 11); mr.getCell(col).border = border();
      mr.getCell(col).alignment = align(['D','E'].includes(col) ? 'center' : 'left', 'middle', false);
    });
    ['F','G'].forEach(col => { mr.getCell(col).fill = fill(C.moduleHd); mr.getCell(col).border = border(); });
    mr.getCell('D').numFmt = '0.0';

    for (const grp of mod.groups) {
      const gEffort = grp.tasks.reduce((s,t)=>s+t.effort,0);
      const gr = ws2.addRow(['', sNo++, '  ' + grp.group, gEffort, (gEffort/22).toFixed(2), '', '', '']);
      gr.height = 16;
      ['B','C','D','E','F','G'].forEach(col => {
        gr.getCell(col).fill = fill(C.groupBg); gr.getCell(col).font = font(C.groupFg, false, 10); gr.getCell(col).border = border();
        gr.getCell(col).alignment = align(['D','E'].includes(col) ? 'center' : 'left', 'middle', false);
      });
      gr.getCell('D').numFmt = '0.0';
    }
  }

  ws2.addRow([]);
  const tR = ws2.addRow(['', '', 'TOTAL CODING EFFORT', allEffort, (allEffort/22).toFixed(2), '', '', '']);
  tR.height = 22;
  ['B','C','D','E','F','G'].forEach(col => {
    tR.getCell(col).fill = fill(C.totalBg); tR.getCell(col).font = font(C.totalFg, true, 12); tR.getCell(col).border = border();
    tR.getCell(col).alignment = align(['D','E'].includes(col) ? 'center' : 'left', 'middle', false);
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
  g1.getCell('B').fill = fill(C.titleBg); g1.getCell('B').font = font('FFFFFF', true, 13); g1.getCell('B').alignment = align('center', 'middle');

  ws3.addRow([]);
  const g3 = ws3.addRow(['', 'Complex Level', 'Criteria / Description', '']);
  g3.height = 20;
  ['B','C'].forEach(col => { g3.getCell(col).fill = fill(C.headerBg); g3.getCell(col).font = font('FFFFFF', true, 11); g3.getCell(col).alignment = align('center','middle'); g3.getCell(col).border = border(); });

  const levels = [
    { level: 'Simple',       bg: 'E2EFDA', fg: '375623', desc: 'Chức năng đơn giản: CRUD form ít trường, hiển thị danh sách, màn hình tĩnh. Effort: 1–3 ngày.' },
    { level: 'Medium',       bg: 'FFEB9C', fg: '9C5700', desc: 'Chức năng có logic xử lý, validation, notification, báo cáo cơ bản, component tái sử dụng. Effort: 3–5 ngày.' },
    { level: 'Complex',      bg: 'FFC7CE', fg: '9C0006', desc: 'Chức năng phức tạp: workflow phê duyệt, real-time update, chart, GPS, wizard form, RLS policy, cron job. Effort: 5–7 ngày.' },
    { level: 'Very Complex', bg: 'FF0000', fg: 'FFFFFF', desc: 'Nghiệp vụ rất phức tạp: KPI Engine, Payroll Engine, RLS toàn hệ thống, Edge Functions xử lý tự động. Effort: 7–10 ngày.' },
  ];
  for (const lv of levels) {
    const lr = ws3.addRow(['', lv.level, lv.desc, '']);
    lr.height = 26;
    lr.getCell('B').fill = fill(lv.bg); lr.getCell('B').font = font(lv.fg, true, 10); lr.getCell('B').alignment = align('center','middle',false); lr.getCell('B').border = border();
    lr.getCell('C').font = font('404040', false, 10); lr.getCell('C').alignment = align('left','middle',true); lr.getCell('C').border = border();
  }

  // ─────────────────────────────────────────────────────────
  // SHEET 4: MVP PHASES
  // ─────────────────────────────────────────────────────────
  const ws4 = wb.addWorksheet('MVP PHASES');
  ws4.columns = [{ width: 2 }, { width: 20 }, { width: 50 }, { width: 18 }, { width: 4 }];

  const p1 = ws4.addRow(['', 'MVP PHASES – F&B Internal Operation System (~200 person.days)', '', '', '']);
  ws4.mergeCells('B1:D1');
  p1.height = 28;
  p1.getCell('B').fill = fill(C.titleBg); p1.getCell('B').font = font('FFFFFF', true, 13); p1.getCell('B').alignment = align('center', 'middle');
  ws4.addRow([]);

  const phases = [
    {
      phase: 'Phase 1 – Core Operation (8–10 tuần)',
      color: '2E75B6',
      items: [
        ['Auth + User/Employee CRUD + Location + Notifications',  'Medium',       6],
        ['Role-based access (5 roles) + No-self-approve policy',  'Complex',      4],
        ['RLS policies toàn hệ thống (20+ bảng)',                 'Very Complex', 6],
        ['Home screen NV + Check-in/out GPS',                     'Complex',      7],
        ['End-of-shift wizard (5 bước đầy đủ)',                   'Very Complex', 15],
        ['Roster – Calendar + Assign + Swap approval',            'Complex',      8],
        ['Database schema + Migration + Seed + Indexes',          'Complex',      6],
        ['Supabase Auth setup + custom JWT claims',               'Medium',       2],
      ]
    },
    {
      phase: 'Phase 2 – KPI Engine (5–6 tuần)',
      color: '70AD47',
      items: [
        ['KPI Rules + Payroll Rules configuration',               'Complex',      8],
        ['Edge Function: KPI Engine (trigger + cron)',            'Very Complex', 14],
        ['KPI Breakdown + Explainable KPI (màn hình NV)',         'Complex',      8],
        ['Shift Dashboard realtime + Team KPI/Attendance',        'Complex',      9],
        ['Team Ranking leaderboard realtime',                     'Medium',       3],
      ]
    },
    {
      phase: 'Phase 3 – Payroll Automation (5–6 tuần)',
      color: 'ED7D31',
      items: [
        ['Payroll Engine Edge Function',                          'Very Complex', 13],
        ['Payroll Period + Preview + Approval flow',              'Complex',      5],
        ['Payroll Dashboard + Detail per NV + Tips + Adj',        'Complex',      9],
        ['Export Excel + PDF payslip',                            'Medium',       3],
        ['Finalize payroll + HR → GM approval',                   'Complex',      4],
      ]
    },
    {
      phase: 'Phase 4 – Governance & Reporting (3–4 tuần)',
      color: '7030A0',
      items: [
        ['Data Lock engine + Emergency unlock',                   'Complex',      11],
        ['Audit Log system + Approval Log + màn hình GM',         'Complex',      8],
        ['System Dashboard GM + Approval Queue (đầy đủ)',         'Complex',      15],
        ['Manager KPI chấm + Báo cáo vận hành',                  'Medium',       9],
        ['Cron Jobs + Realtime + Storage + Data Integrity',       'Complex',      10],
      ]
    },
  ];

  const phColors   = { 'Simple':'E2EFDA', 'Medium':'FFEB9C', 'Complex':'FFC7CE', 'Very Complex':'FF0000' };
  const phFgColors = { 'Simple':'375623', 'Medium':'9C5700', 'Complex':'9C0006', 'Very Complex':'FFFFFF' };

  for (const ph of phases) {
    ws4.addRow([]);
    const hr = ws4.addRow(['', ph.phase, 'Task', 'Effort (days)', '']);
    hr.height = 22;
    ['B','C','D'].forEach(col => {
      hr.getCell(col).fill = fill(ph.color); hr.getCell(col).font = font('FFFFFF', true, 11); hr.getCell(col).border = border(); hr.getCell(col).alignment = align(col==='D'?'center':'left','middle',false);
    });
    let phTotal = 0;
    for (const [task, complex, effort] of ph.items) {
      phTotal += effort;
      const tr = ws4.addRow(['', '', task, effort, '']);
      tr.height = 20;
      tr.getCell('B').fill = fill('F2F7FB'); tr.getCell('B').border = border();
      tr.getCell('C').fill = fill('F2F7FB'); tr.getCell('C').font = font('1F3864', false, 10); tr.getCell('C').alignment = align('left','middle',true); tr.getCell('C').border = border();
      tr.getCell('D').fill = fill(phColors[complex] || 'F2F7FB'); tr.getCell('D').font = font(phFgColors[complex] || '404040', true, 10); tr.getCell('D').alignment = align('center','middle',false); tr.getCell('D').border = border(); tr.getCell('D').numFmt = '0';
    }
    const sumR = ws4.addRow(['', `Subtotal ${ph.phase}`, '', phTotal, '']);
    sumR.height = 18;
    sumR.getCell('B').fill = fill(C.groupBg); sumR.getCell('B').border = border();
    sumR.getCell('C').fill = fill(C.groupBg); sumR.getCell('C').font = font(C.groupFg, true, 10); sumR.getCell('C').alignment = align('left','middle',false); sumR.getCell('C').border = border();
    sumR.getCell('D').fill = fill(C.totalBg); sumR.getCell('D').font = font(C.totalFg, true, 11); sumR.getCell('D').alignment = align('center','middle',false); sumR.getCell('D').border = border(); sumR.getCell('D').numFmt = '0';
  }

  // ─── SAVE ───
  const outPath = 'C:\\Users\\LongLV\\Downloads\\FBOps_Estimation.xlsx';
  await wb.xlsx.writeFile(outPath);

  const totalTasks  = modules.reduce((s,m)=>s+m.groups.reduce((ss,g)=>ss+g.tasks.length,0),0);
  console.log('✅ Done! Saved to:', outPath);
  console.log('   Modules     :', modules.length);
  console.log('   Total tasks :', totalTasks);
  console.log('   Total effort:', allEffort, 'person.days =', (allEffort/22).toFixed(1), 'man.months');
  console.log('');
  console.log('── Breakdown by module ──');
  for (const mod of modules) {
    const e = mod.groups.reduce((s,g)=>s+g.tasks.reduce((ss,t)=>ss+t.effort,0),0);
    console.log(`   ${mod.module}: ${e} days (${(e/22).toFixed(1)} mm)`);
  }
}

build().catch(console.error);
