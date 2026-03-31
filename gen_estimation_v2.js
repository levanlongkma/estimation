const ExcelJS = require('exceljs');

// ============================================================
// COLOR PALETTE (matching reference file)
// ============================================================
const C = {
  titleBg:    '1F3864', titleFg:   'FFFFFF',   // dark navy
  headerBg:   '2E75B6', headerFg:  'FFFFFF',   // blue
  moduleHd:   'D6E4F7', moduleFg:  '1F3864',   // light blue (module row)
  groupBg:    'DEEAF1', groupFg:   '1F3864',   // lighter (group row)
  altRow:     'F2F7FB',                         // very light blue (odd task rows)
  totalBg:    'FCE4D6', totalFg:   'C00000',   // orange-red (total row)
  summaryHd:  'ED7D31', summaryFg: 'FFFFFF',   // orange (summary header)
  green:      '70AD47', yellow:    'FFD966', red: 'FF0000',
};

// Complexity -> color mapping
const complexColor = {
  'Simple':       { bg: 'E2EFDA', fg: '375623' },
  'Medium':       { bg: 'FFEB9C', fg: '9C5700' },
  'Complex':      { bg: 'FFC7CE', fg: '9C0006' },
};

// ============================================================
// DATA
// ============================================================
const modules = [
  {
    module: 'I. QUẢN LÝ TÀI CHÍNH - KẾ TOÁN',
    groups: [
      {
        group: '1. Kế toán tiền mặt, tiền ngân hàng',
        tasks: [
          { task: 'Danh mục tài khoản tiền mặt / ngân hàng', detail: 'CRUD tài khoản tiền mặt và tài khoản ngân hàng; Tìm kiếm, phân loại', complexity: 'Simple', effort: 2 },
          { task: 'Phiếu thu tiền mặt', detail: 'Tạo, sửa, xóa phiếu thu; Workflow phê duyệt; In phiếu thu', complexity: 'Medium', effort: 4 },
          { task: 'Phiếu chi tiền mặt', detail: 'Tạo, sửa, xóa phiếu chi; Workflow phê duyệt; In phiếu chi', complexity: 'Medium', effort: 4 },
          { task: 'Giấy báo nợ / báo có ngân hàng', detail: 'Nhập giấy báo nợ/có; Đối chiếu với sổ sách; Liên kết tài khoản ngân hàng', complexity: 'Medium', effort: 3 },
          { task: 'Đối chiếu số dư tài khoản ngân hàng', detail: 'So sánh số dư sổ sách vs sao kê ngân hàng; Ghi chú chênh lệch', complexity: 'Medium', effort: 3 },
          { task: 'Sổ quỹ tiền mặt', detail: 'Xem, lọc, xuất sổ quỹ tiền mặt theo kỳ; Xuất Excel/PDF', complexity: 'Simple', effort: 2 },
          { task: 'Sổ tiền gửi ngân hàng', detail: 'Xem, lọc, xuất sổ tiền gửi theo tài khoản ngân hàng, kỳ', complexity: 'Simple', effort: 2 },
          { task: 'Báo cáo tồn quỹ & số dư ngân hàng', detail: 'Báo cáo tổng hợp tồn quỹ theo ngày/tháng/năm; Xuất Excel/PDF', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '2. Kế toán mua hàng',
        tasks: [
          { task: 'Hóa đơn mua hàng (AP Invoice)', detail: 'CRUD hóa đơn mua; Liên kết PO/phiếu nhập kho; Phê duyệt; Hạch toán tự động', complexity: 'Complex', effort: 5 },
          { task: 'Phân bổ chi phí mua hàng', detail: 'Phân bổ chi phí vận chuyển, thuế nhập khẩu vào giá vốn hàng hóa', complexity: 'Medium', effort: 3 },
          { task: 'Ghi nhận công nợ phải trả NCC', detail: 'Tự động cập nhật công nợ từ hóa đơn mua; Theo dõi hạn thanh toán', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo mua hàng theo kỳ / NCC / hàng hóa', detail: 'Tổng hợp giá trị mua theo kỳ, NCC, mặt hàng; Xuất Excel', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo công nợ phải trả NCC', detail: 'Chi tiết công nợ; Phân tích tuổi nợ (aging report)', complexity: 'Medium', effort: 3 },
        ]
      },
      {
        group: '3. Kế toán bán hàng',
        tasks: [
          { task: 'Hóa đơn bán hàng (AR Invoice)', detail: 'CRUD hóa đơn bán; Liên kết đơn hàng/phiếu xuất kho; Phê duyệt; In hóa đơn', complexity: 'Complex', effort: 5 },
          { task: 'Hóa đơn điều chỉnh / thay thế', detail: 'Tạo hóa đơn điều chỉnh giảm/tăng; Liên kết hóa đơn gốc', complexity: 'Medium', effort: 3 },
          { task: 'Ghi nhận công nợ phải thu KH', detail: 'Tự động cập nhật công nợ từ hóa đơn bán; Theo dõi hạn thanh toán', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo doanh thu bán hàng', detail: 'Tổng hợp doanh thu theo kỳ, KH, sản phẩm; Xuất Excel', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo công nợ phải thu KH', detail: 'Chi tiết công nợ; Phân tích tuổi nợ (aging report)', complexity: 'Medium', effort: 3 },
        ]
      },
      {
        group: '4. Kế toán công nợ phải thu, phải trả, tạm ứng',
        tasks: [
          { task: 'Theo dõi công nợ phải thu theo KH / HĐ', detail: 'Xem chi tiết công nợ, lịch sử phát sinh, số dư còn lại', complexity: 'Medium', effort: 3 },
          { task: 'Theo dõi công nợ phải trả theo NCC / HĐ', detail: 'Xem chi tiết công nợ, lịch sử phát sinh, số dư còn lại', complexity: 'Medium', effort: 3 },
          { task: 'Phiếu tạm ứng', detail: 'CRUD phiếu tạm ứng; Workflow phê duyệt; In phiếu', complexity: 'Medium', effort: 4 },
          { task: 'Phiếu hoàn ứng / thanh toán tạm ứng', detail: 'Tạo phiếu hoàn ứng; Liên kết phiếu tạm ứng gốc; Tính hoàn lại/hoàn thêm', complexity: 'Medium', effort: 3 },
          { task: 'Bù trừ công nợ phải thu - phải trả', detail: 'Bù trừ công nợ cùng đối tác; Hạch toán bù trừ', complexity: 'Medium', effort: 3 },
          { task: 'Đối chiếu công nợ với KH / NCC', detail: 'Tạo biên bản đối chiếu; In biên bản xác nhận', complexity: 'Simple', effort: 2 },
          { task: 'Báo cáo tổng hợp / chi tiết công nợ phải thu', detail: 'Phân tích theo tuổi nợ, KH, kỳ; Xuất Excel', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo tổng hợp / chi tiết công nợ phải trả', detail: 'Phân tích theo tuổi nợ, NCC, kỳ; Xuất Excel', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo chi tiết tạm ứng', detail: 'Danh sách tạm ứng chưa hoàn; Tổng hợp theo nhân viên', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '5. Kế toán hàng tồn kho',
        tasks: [
          { task: 'Danh mục hàng hóa / vật tư / thành phẩm', detail: 'CRUD hàng hóa; Phân loại nhóm/loại; Import từ Excel', complexity: 'Medium', effort: 3 },
          { task: 'Cấu hình phương pháp tính giá xuất kho', detail: 'Cấu hình FIFO / bình quân gia quyền theo kỳ hoặc liên hoàn', complexity: 'Medium', effort: 3 },
          { task: 'Tính giá xuất kho cuối kỳ / theo lô', detail: 'Tự động tính giá xuất kho theo phương pháp đã cấu hình', complexity: 'Complex', effort: 5 },
          { task: 'Kiểm kê hàng tồn kho', detail: 'Tạo phiếu kiểm kê; Nhập số liệu thực tế; So sánh; Điều chỉnh chênh lệch', complexity: 'Medium', effort: 4 },
          { task: 'Báo cáo nhập - xuất - tồn kho', detail: 'Tổng hợp NXT theo kỳ, kho, mặt hàng; Xuất Excel/PDF', complexity: 'Medium', effort: 3 },
          { task: 'Sổ chi tiết hàng tồn kho', detail: 'Chi tiết phát sinh nhập/xuất từng mặt hàng theo kỳ', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '6. Kế toán quản lý tài sản cố định (TSCĐ)',
        tasks: [
          { task: 'Danh mục tài sản cố định', detail: 'CRUD TSCĐ; Thông tin: mã TS, tên, ngày mua, nguyên giá, bộ phận, vị trí', complexity: 'Medium', effort: 4 },
          { task: 'Ghi tăng TSCĐ (mua mới / chuyển vào)', detail: 'Ghi nhận tăng; Liên kết phiếu mua; Tự động hạch toán', complexity: 'Medium', effort: 3 },
          { task: 'Ghi giảm TSCĐ (thanh lý / chuyển ra)', detail: 'Ghi nhận giảm; Hạch toán giá trị còn lại; Biên bản thanh lý', complexity: 'Medium', effort: 3 },
          { task: 'Điều chuyển TSCĐ giữa bộ phận', detail: 'Tạo phiếu điều chuyển; Cập nhật vị trí/bộ phận sử dụng', complexity: 'Simple', effort: 2 },
          { task: 'Tính khấu hao TSCĐ tự động hàng tháng', detail: 'Tự động tính và hạch toán khấu hao theo phương pháp đường thẳng/số dư giảm dần', complexity: 'Complex', effort: 5 },
          { task: 'Báo cáo bảng khấu hao TSCĐ', detail: 'Bảng khấu hao tổng hợp và chi tiết theo kỳ/năm', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo biến động TSCĐ', detail: 'Tổng hợp tăng/giảm TSCĐ trong kỳ; Sổ chi tiết TSCĐ', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '7. Kế toán thuế',
        tasks: [
          { task: 'Quản lý hóa đơn VAT đầu vào', detail: 'CRUD hóa đơn VAT đầu vào; Kiểm tra hợp lệ; Liên kết phiếu mua', complexity: 'Medium', effort: 3 },
          { task: 'Quản lý hóa đơn VAT đầu ra', detail: 'CRUD hóa đơn VAT đầu ra; Phát hành/liên kết hóa đơn điện tử', complexity: 'Medium', effort: 3 },
          { task: 'Bảng kê hóa đơn đầu vào (Mẫu 01-2/GTGT)', detail: 'Tổng hợp tự động từ hóa đơn đầu vào theo kỳ khai thuế', complexity: 'Medium', effort: 3 },
          { task: 'Bảng kê hóa đơn đầu ra (Mẫu 01-1/GTGT)', detail: 'Tổng hợp tự động từ hóa đơn đầu ra theo kỳ khai thuế', complexity: 'Medium', effort: 3 },
          { task: 'Tờ khai thuế GTGT (Mẫu 01/GTGT)', detail: 'Tự động tính thuế phải nộp; Xuất file XML nộp cơ quan thuế', complexity: 'Complex', effort: 5 },
          { task: 'Theo dõi thuế TNCN nhân viên', detail: 'Khai báo thu nhập, giảm trừ; Tính thuế TNCN; Bảng quyết toán', complexity: 'Complex', effort: 5 },
          { task: 'Báo cáo thuế tổng hợp', detail: 'Báo cáo thuế GTGT, TNCN, TNDN theo kỳ; Xuất Excel', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '8. Kế toán tính giá thành, cập nhật định mức',
        tasks: [
          { task: 'Danh mục định mức NVL (BOM)', detail: 'CRUD BOM theo sản phẩm; Cập nhật định mức tiêu hao NVL', complexity: 'Medium', effort: 4 },
          { task: 'Cập nhật định mức chi phí sản xuất', detail: 'Cập nhật định mức nhân công, chi phí chung theo sản phẩm/lệnh SX', complexity: 'Medium', effort: 3 },
          { task: 'Tập hợp chi phí sản xuất trong kỳ', detail: 'Tổng hợp chi phí NVL, nhân công, chi phí chung theo lệnh SX', complexity: 'Complex', effort: 5 },
          { task: 'Tính giá thành sản phẩm / đơn hàng', detail: 'Tính giá thành theo lệnh SX hoặc theo kỳ; Phân bổ chi phí', complexity: 'Complex', effort: 6 },
          { task: 'Báo cáo giá thành theo lệnh SX / đơn hàng', detail: 'So sánh chi phí thực tế vs định mức; Phân tích chênh lệch', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo phân tích giá thành tổng hợp', detail: 'Tổng hợp giá thành theo kỳ, sản phẩm, đơn hàng', complexity: 'Medium', effort: 3 },
        ]
      },
      {
        group: '9. Kế toán Tổng hợp',
        tasks: [
          { task: 'Hệ thống tài khoản kế toán (CoA)', detail: 'Quản lý danh mục tài khoản; CRUD tài khoản; Khóa/mở tài khoản', complexity: 'Medium', effort: 3 },
          { task: 'Bút toán định khoản tổng hợp / điều chỉnh', detail: 'CRUD bút toán thủ công; Đảo bút toán; Phê duyệt', complexity: 'Medium', effort: 3 },
          { task: 'Kết chuyển cuối kỳ tự động', detail: 'Tự động kết chuyển doanh thu, chi phí sang TK kết quả kinh doanh', complexity: 'Complex', effort: 4 },
          { task: 'Sổ cái tài khoản', detail: 'Xem, lọc, in sổ cái chi tiết theo từng tài khoản', complexity: 'Simple', effort: 2 },
          { task: 'Bảng cân đối số phát sinh', detail: 'Tổng hợp số dư đầu kỳ, phát sinh, số dư cuối kỳ tất cả tài khoản', complexity: 'Medium', effort: 3 },
          { task: 'Bảng cân đối kế toán (Balance Sheet)', detail: 'Tự động lập BCĐKT từ số liệu kế toán; Xuất Excel/PDF', complexity: 'Complex', effort: 5 },
          { task: 'Báo cáo kết quả kinh doanh (P&L)', detail: 'Tự động lập BC KQKD; Theo tháng/quý/năm; Xuất Excel/PDF', complexity: 'Complex', effort: 5 },
          { task: 'Báo cáo lưu chuyển tiền tệ', detail: 'Tự động lập BCLCTT (phương pháp trực tiếp/gián tiếp)', complexity: 'Complex', effort: 5 },
          { task: 'Thuyết minh báo cáo tài chính', detail: 'Các bảng thuyết minh kèm theo BCTC; Xuất PDF', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
  {
    module: 'V. QUẢN LÝ KINH DOANH',
    groups: [
      {
        group: '1. Cập nhật và Quản lý danh mục khách hàng',
        tasks: [
          { task: 'CRUD khách hàng', detail: 'Thêm, sửa, xóa KH; Các trường: mã KH, tên, địa chỉ, MST, liên hệ, phân loại', complexity: 'Simple', effort: 3 },
          { task: 'Tìm kiếm và lọc danh sách KH', detail: 'Tìm kiếm theo tên/mã/MST; Lọc theo nhóm/loại/trạng thái', complexity: 'Simple', effort: 2 },
          { task: 'Phân nhóm / phân loại khách hàng', detail: 'Quản lý danh mục nhóm KH; Gán KH vào nhóm', complexity: 'Simple', effort: 2 },
          { task: 'Lịch sử giao dịch theo khách hàng', detail: 'Xem toàn bộ lịch sử đơn hàng, hợp đồng, thanh toán của KH', complexity: 'Medium', effort: 3 },
          { task: 'Xuất danh sách khách hàng ra Excel', detail: 'Xuất toàn bộ hoặc theo bộ lọc; Tùy chọn cột hiển thị', complexity: 'Simple', effort: 1 },
        ]
      },
      {
        group: '2. Cập nhật và theo dõi Hợp đồng / Đơn hàng',
        tasks: [
          { task: 'CRUD hợp đồng / đơn hàng bán', detail: 'Form tạo HĐ/ĐH; Thông tin KH, sản phẩm, SL, giá, ngày giao hàng', complexity: 'Complex', effort: 5 },
          { task: 'Workflow phê duyệt hợp đồng / đơn hàng', detail: 'Cấu hình luồng phê duyệt; Thông báo email/notification', complexity: 'Complex', effort: 5 },
          { task: 'Đính kèm file hợp đồng', detail: 'Upload, xem, tải file đính kèm HĐ scan/e-contract', complexity: 'Simple', effort: 2 },
          { task: 'Theo dõi trạng thái hợp đồng / đơn hàng', detail: 'Nháp / Chờ duyệt / Đã duyệt / Đang TH / Hoàn thành / Hủy', complexity: 'Medium', effort: 3 },
          { task: 'In / xuất hợp đồng, đơn hàng (PDF)', detail: 'In theo mẫu chuẩn; Xuất PDF', complexity: 'Simple', effort: 2 },
          { task: 'Báo cáo tình trạng thực hiện hợp đồng', detail: 'Tổng hợp theo trạng thái, KH, kỳ; Xuất Excel', complexity: 'Medium', effort: 3 },
        ]
      },
      {
        group: '3. Cập nhật và theo dõi Lệnh xuất hàng',
        tasks: [
          { task: 'Tạo lệnh xuất hàng từ đơn hàng / HĐ', detail: 'Tạo lệnh xuất theo đợt giao; Chọn SP, SL, kho xuất', complexity: 'Medium', effort: 4 },
          { task: 'Sửa, hủy lệnh xuất hàng', detail: 'Chỉnh sửa trước khi xuất kho; Hủy lệnh với lý do', complexity: 'Simple', effort: 2 },
          { task: 'Phê duyệt lệnh xuất hàng', detail: 'Workflow phê duyệt; Cấu hình người duyệt theo phòng ban', complexity: 'Medium', effort: 3 },
          { task: 'Liên kết lệnh xuất với phiếu xuất kho', detail: 'Tự động tạo phiếu xuất kho từ lệnh xuất đã duyệt', complexity: 'Medium', effort: 3 },
          { task: 'Theo dõi trạng thái / tiến độ lệnh xuất', detail: 'Đã xuất / Chưa xuất / Xuất một phần; SL lệnh vs thực xuất', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo thực hiện lệnh xuất hàng', detail: 'Tổng hợp theo KH, đơn hàng, kỳ; Phân tích tiến độ giao hàng', complexity: 'Medium', effort: 2 },
        ]
      },
      {
        group: '4. Theo dõi thực hiện Bán hàng',
        tasks: [
          { task: 'Dashboard bán hàng tổng quan', detail: 'KPI doanh thu, số đơn hàng, tỷ lệ hoàn thành; Biểu đồ theo ngày/tháng', complexity: 'Complex', effort: 5 },
          { task: 'Theo dõi tiến độ giao hàng theo đơn hàng', detail: 'So sánh SL đặt vs đã giao; Cảnh báo trễ hạn', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo doanh số theo kỳ / KH / SP', detail: 'Tổng hợp doanh số theo nhiều chiều; Xuất Excel', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo hiệu suất bán hàng theo NV / khu vực', detail: 'Phân tích doanh số theo nhân viên kinh doanh, khu vực', complexity: 'Medium', effort: 3 },
        ]
      },
      {
        group: '5. Theo dõi thanh toán Bán hàng',
        tasks: [
          { task: 'Ghi nhận thanh toán từ khách hàng', detail: 'Nhập TT (ngày, tiền, hình thức); Liên kết hóa đơn; Hạch toán', complexity: 'Medium', effort: 3 },
          { task: 'Theo dõi công nợ theo đơn hàng / HĐ', detail: 'Tiến độ thanh toán theo lịch; Số đã thu / còn phải thu', complexity: 'Medium', effort: 3 },
          { task: 'Cấu hình nhắc nợ tự động', detail: 'Tự động gửi email nhắc thanh toán khi đến / quá hạn', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo thanh toán bán hàng', detail: 'Tổng hợp đã thu / còn phải thu theo KH, đơn hàng, kỳ', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '6. Đề nghị sản xuất & dự toán NVL theo lệnh SX',
        tasks: [
          { task: 'CRUD đề nghị sản xuất', detail: 'Từ đơn hàng KH hoặc kế hoạch SX; Thông tin SP, SL, ngày cần', complexity: 'Medium', effort: 4 },
          { task: 'Tính toán dự toán NVL theo lệnh SX (MRP)', detail: 'Tự động tính NVL cần thiết dựa trên BOM và SL sản xuất', complexity: 'Complex', effort: 6 },
          { task: 'Workflow phê duyệt đề nghị sản xuất', detail: 'Luồng phê duyệt đề nghị SX; Thông báo người liên quan', complexity: 'Medium', effort: 3 },
          { task: 'Liên kết đề nghị SX với đề nghị mua hàng NVL', detail: 'Từ dự toán NVL tự động tạo PR mua hàng', complexity: 'Complex', effort: 4 },
          { task: 'Báo cáo nhu cầu NVL theo kỳ', detail: 'Tổng hợp nhu cầu NVL từ các lệnh SX; So sánh với tồn kho', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
  {
    module: 'VI. QUẢN LÝ MUA HÀNG',
    groups: [
      {
        group: '1. Quản lý thông tin nhà cung cấp',
        tasks: [
          { task: 'CRUD nhà cung cấp', detail: 'Thêm, sửa, xóa NCC: mã, tên, địa chỉ, MST, liên hệ, tài khoản ngân hàng', complexity: 'Simple', effort: 3 },
          { task: 'Phân nhóm / đánh giá nhà cung cấp', detail: 'Phân loại NCC theo nhóm hàng; Ghi nhận đánh giá chất lượng', complexity: 'Simple', effort: 2 },
          { task: 'Danh sách NCC được duyệt (AVL)', detail: 'Quản lý danh sách NCC được phê duyệt theo từng loại hàng hóa', complexity: 'Simple', effort: 2 },
          { task: 'Lịch sử mua hàng theo NCC', detail: 'Xem lịch sử đơn hàng, hợp đồng, thanh toán của NCC', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '2. Cập nhật và theo dõi Đề nghị mua hàng (PR)',
        tasks: [
          { task: 'CRUD đề nghị mua hàng', detail: 'Form tạo PR: hàng hóa, SL, đơn vị, ngày cần, bộ phận yêu cầu', complexity: 'Medium', effort: 4 },
          { task: 'Workflow phê duyệt đề nghị mua hàng', detail: 'Luồng phê duyệt đa cấp; Thông báo email/notification', complexity: 'Complex', effort: 5 },
          { task: 'Theo dõi trạng thái PR', detail: 'Nháp / Chờ duyệt / Đã duyệt / Đang mua / Hoàn thành / Hủy', complexity: 'Simple', effort: 2 },
          { task: 'Báo cáo PR theo kỳ / bộ phận', detail: 'Tổng hợp PR theo trạng thái, bộ phận, hàng hóa', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '3. Cập nhật và theo dõi Đề nghị chào hàng (RFQ)',
        tasks: [
          { task: 'CRUD yêu cầu chào hàng (RFQ)', detail: 'Tạo RFQ từ PR; Chọn NCC gửi chào hàng; Thiết lập hạn báo giá', complexity: 'Medium', effort: 4 },
          { task: 'Gửi RFQ cho nhiều nhà cung cấp', detail: 'Gửi email RFQ tự động cho danh sách NCC được chọn', complexity: 'Medium', effort: 3 },
          { task: 'Theo dõi phản hồi báo giá từ NCC', detail: 'Trạng thái: chờ / đã báo giá / từ chối; Nhắc NCC chưa phản hồi', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo RFQ theo kỳ', detail: 'Tổng hợp RFQ đã gửi, nhận được báo giá, chưa nhận', complexity: 'Simple', effort: 1 },
        ]
      },
      {
        group: '4. Cập nhật và theo dõi Báo giá từ NCC',
        tasks: [
          { task: 'Nhập, cập nhật báo giá từ NCC', detail: 'Nhập giá, điều kiện giao hàng, thời gian giao; Liên kết RFQ', complexity: 'Medium', effort: 3 },
          { task: 'Bảng so sánh báo giá nhiều NCC', detail: 'Hiển thị bảng so sánh giá của nhiều NCC cho cùng hàng hóa', complexity: 'Medium', effort: 4 },
          { task: 'Phê duyệt / chọn báo giá', detail: 'Đề xuất chọn NCC tốt nhất; Workflow phê duyệt báo giá', complexity: 'Medium', effort: 3 },
          { task: 'Lịch sử báo giá theo NCC / hàng hóa', detail: 'Xem lịch sử biến động giá theo NCC và mặt hàng', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '5. Cập nhật và theo dõi Bảng giá mua, NCC được duyệt',
        tasks: [
          { task: 'Quản lý bảng giá mua theo NCC / hàng hóa', detail: 'Thiết lập giá mua hiện hành từng mặt hàng theo NCC; Áp dụng tự động vào PO', complexity: 'Medium', effort: 3 },
          { task: 'Cập nhật / thay thế bảng giá mua', detail: 'Cập nhật giá mua mới; Lưu lịch sử thay đổi giá', complexity: 'Simple', effort: 2 },
          { task: 'Phê duyệt bảng giá mua mới', detail: 'Workflow phê duyệt trước khi áp dụng bảng giá mới', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo biến động giá mua', detail: 'So sánh giá mua qua các kỳ theo NCC / hàng hóa', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '6. Quản lý đơn hàng mua (PO)',
        tasks: [
          { task: 'CRUD đơn hàng mua (PO)', detail: 'Tạo PO từ PR / báo giá; Thông tin NCC, hàng hóa, giá, điều kiện giao', complexity: 'Complex', effort: 5 },
          { task: 'Workflow phê duyệt PO', detail: 'Luồng phê duyệt đa cấp theo giá trị PO; Thông báo người duyệt', complexity: 'Complex', effort: 4 },
          { task: 'In / gửi PO cho nhà cung cấp', detail: 'In PO theo mẫu chuẩn; Xuất PDF; Gửi email PO cho NCC', complexity: 'Simple', effort: 2 },
          { task: 'Theo dõi trạng thái / tiến độ thực hiện PO', detail: 'So sánh SL đặt vs đã nhận; Cảnh báo PO quá hạn', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo đơn hàng mua theo kỳ / NCC / hàng hóa', detail: 'Tổng hợp theo nhiều chiều; Xuất Excel', complexity: 'Medium', effort: 2 },
        ]
      },
      {
        group: '7. Quản lý hợp đồng mua',
        tasks: [
          { task: 'CRUD hợp đồng mua', detail: 'Form tạo HĐ mua: NCC, hàng hóa, giá trị, điều kiện, thời hạn', complexity: 'Complex', effort: 5 },
          { task: 'Đính kèm file hợp đồng', detail: 'Upload và quản lý file scan/PDF hợp đồng', complexity: 'Simple', effort: 1 },
          { task: 'Workflow phê duyệt hợp đồng mua', detail: 'Luồng phê duyệt HĐ mua; Thông báo người liên quan', complexity: 'Medium', effort: 3 },
          { task: 'Theo dõi tiến độ thực hiện HĐ mua', detail: 'Đã nhận hàng vs kế hoạch; Giá trị đã TT vs tổng HĐ', complexity: 'Medium', effort: 3 },
          { task: 'Cảnh báo HĐ sắp hết hạn', detail: 'Tự động cảnh báo khi HĐ sắp hết hạn (cấu hình số ngày trước)', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '8. Cập nhật và theo dõi Lệnh nhập hàng',
        tasks: [
          { task: 'Tạo lệnh nhập hàng từ PO / HĐ', detail: 'Tạo lệnh nhập theo đợt nhận; Chọn hàng hóa, SL, kho nhập', complexity: 'Medium', effort: 3 },
          { task: 'Theo dõi trạng thái lệnh nhập hàng', detail: 'Chờ nhận / Đã nhập một phần / Hoàn thành; SL lệnh vs thực nhận', complexity: 'Medium', effort: 3 },
          { task: 'Liên kết lệnh nhập với phiếu nhập kho', detail: 'Sau duyệt, tự động tạo phiếu nhập kho nháp', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo thực hiện lệnh nhập hàng', detail: 'Tổng hợp theo NCC, PO, kỳ; Phân tích tiến độ nhận hàng', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '9. Theo dõi thực hiện mua hàng',
        tasks: [
          { task: 'Dashboard mua hàng tổng quan', detail: 'KPI tổng giá trị mua, số PO, tiến độ giao hàng, công nợ NCC', complexity: 'Complex', effort: 5 },
          { task: 'Báo cáo tiến độ nhận hàng theo PO', detail: 'So sánh SL đặt vs đã nhận; Phân tích chênh lệch', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo mua hàng theo kỳ / NCC / hàng hóa', detail: 'Tổng hợp giá trị mua theo nhiều chiều; Xuất Excel', complexity: 'Medium', effort: 2 },
        ]
      },
      {
        group: '10. Cập nhật và theo dõi Đề nghị thanh toán',
        tasks: [
          { task: 'CRUD đề nghị thanh toán cho NCC', detail: 'Tạo ĐNTT từ hóa đơn mua / HĐ; NCC, số tiền, hạn TT, ngân hàng', complexity: 'Medium', effort: 4 },
          { task: 'Workflow phê duyệt ĐNTT', detail: 'Luồng phê duyệt đa cấp theo giá trị; Thông báo người duyệt', complexity: 'Complex', effort: 4 },
          { task: 'Liên kết ĐNTT với phiếu chi / ủy nhiệm chi', detail: 'Sau phê duyệt, tự động tạo phiếu chi hoặc ủy nhiệm chi', complexity: 'Medium', effort: 3 },
          { task: 'Theo dõi trạng thái ĐNTT', detail: 'Nháp / Chờ duyệt / Đã duyệt / Đã thanh toán / Hủy', complexity: 'Simple', effort: 2 },
          { task: 'Báo cáo ĐNTT theo kỳ / NCC', detail: 'Tổng hợp theo trạng thái, NCC, kỳ; Xuất Excel', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '11. Hệ thống báo cáo phân tích, quản trị',
        tasks: [
          { task: 'Báo cáo phân tích chi phí mua hàng', detail: 'Cơ cấu chi phí mua theo nhóm hàng, NCC, kỳ; Biểu đồ', complexity: 'Complex', effort: 4 },
          { task: 'Báo cáo so sánh giá mua qua các kỳ', detail: 'So sánh biến động giá mua; Phát hiện bất thường', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo hiệu quả NCC', detail: 'Thống kê tỷ lệ giao hàng đúng hạn, đúng SL, đúng chất lượng', complexity: 'Medium', effort: 3 },
          { task: 'Xuất báo cáo tùy chỉnh (Custom Report)', detail: 'Công cụ tạo báo cáo tùy chỉnh theo yêu cầu người dùng', complexity: 'Complex', effort: 6 },
        ]
      },
    ]
  },
  {
    module: 'VIII. QUẢN LÝ KHO',
    groups: [
      {
        group: '1. Đề nghị nhập kho',
        tasks: [
          { task: 'CRUD đề nghị nhập kho', detail: 'Từ lệnh nhập hàng / SX; Thông tin hàng hóa, SL, kho nhập', complexity: 'Medium', effort: 3 },
          { task: 'Workflow phê duyệt đề nghị nhập kho', detail: 'Luồng phê duyệt; Thông báo thủ kho', complexity: 'Medium', effort: 3 },
          { task: 'Theo dõi trạng thái đề nghị nhập kho', detail: 'Chờ duyệt / Đã duyệt / Đã nhập kho', complexity: 'Simple', effort: 1 },
        ]
      },
      {
        group: '2. Đề nghị xuất kho',
        tasks: [
          { task: 'CRUD đề nghị xuất kho', detail: 'Từ lệnh xuất hàng / SX; Thông tin hàng hóa, SL, kho xuất', complexity: 'Medium', effort: 3 },
          { task: 'Workflow phê duyệt đề nghị xuất kho', detail: 'Luồng phê duyệt; Kiểm tra tồn kho trước khi duyệt', complexity: 'Medium', effort: 3 },
          { task: 'Theo dõi trạng thái đề nghị xuất kho', detail: 'Chờ duyệt / Đã duyệt / Đã xuất kho', complexity: 'Simple', effort: 1 },
        ]
      },
      {
        group: '3. Phiếu nhập kho',
        tasks: [
          { task: 'CRUD phiếu nhập kho', detail: 'Form nhập kho: hàng hóa, SL, đơn vị, kho, số lô, hạn sử dụng', complexity: 'Medium', effort: 4 },
          { task: 'Xác nhận nhập kho (cập nhật tồn kho)', detail: 'Xác nhận phiếu nhập; Tự động cộng tồn kho; Hạch toán kế toán', complexity: 'Medium', effort: 3 },
          { task: 'In phiếu nhập kho', detail: 'In theo mẫu chuẩn; Xuất PDF', complexity: 'Simple', effort: 1 },
          { task: 'Quản lý nhập kho theo lô / serial number', detail: 'Gán số lô, ngày SX, hạn sử dụng; Theo dõi tồn theo lô', complexity: 'Complex', effort: 5 },
        ]
      },
      {
        group: '4. Phiếu xuất kho',
        tasks: [
          { task: 'CRUD phiếu xuất kho', detail: 'Form xuất kho: hàng hóa, SL, kho, mục đích xuất, bộ phận nhận', complexity: 'Medium', effort: 4 },
          { task: 'Xác nhận xuất kho (cập nhật tồn kho)', detail: 'Xác nhận phiếu xuất; Tự động trừ tồn kho; Hạch toán kế toán', complexity: 'Medium', effort: 3 },
          { task: 'In phiếu xuất kho', detail: 'In theo mẫu chuẩn; Xuất PDF', complexity: 'Simple', effort: 1 },
          { task: 'Cảnh báo thiếu hàng khi xuất kho', detail: 'Cảnh báo khi SL xuất > tồn kho hiện tại; Không cho xuất quá tồn', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '5. Phiếu xuất điều chuyển kho',
        tasks: [
          { task: 'CRUD phiếu xuất điều chuyển giữa kho', detail: 'Chọn kho nguồn, kho đích; Hàng hóa, SL điều chuyển', complexity: 'Medium', effort: 3 },
          { task: 'Phê duyệt lệnh điều chuyển', detail: 'Workflow phê duyệt; Thông báo thủ kho 2 bên', complexity: 'Medium', effort: 2 },
          { task: 'Xác nhận nhận hàng tại kho đích', detail: 'Thủ kho đích xác nhận; Cập nhật tồn kho 2 kho đồng thời', complexity: 'Medium', effort: 3 },
          { task: 'In phiếu xuất điều chuyển', detail: 'In theo mẫu; Xuất PDF', complexity: 'Simple', effort: 1 },
          { task: 'Theo dõi trạng thái điều chuyển', detail: 'Đang vận chuyển / Đã nhận hàng; Lịch sử điều chuyển', complexity: 'Simple', effort: 2 },
        ]
      },
      {
        group: '6. Phiếu kiểm kê',
        tasks: [
          { task: 'Tạo phiếu kiểm kê kho', detail: 'Tạo phiếu cho kho/nhóm hàng; Khóa nhập xuất trong khi kiểm kê', complexity: 'Medium', effort: 3 },
          { task: 'Nhập số liệu kiểm kê thực tế', detail: 'Nhập SL thực đếm từng mặt hàng; Hỗ trợ import từ Excel', complexity: 'Medium', effort: 3 },
          { task: 'So sánh tồn kho hệ thống vs thực tế', detail: 'Tự động tính chênh lệch (thừa/thiếu) từng mặt hàng', complexity: 'Medium', effort: 3 },
          { task: 'Duyệt biên bản kiểm kê', detail: 'Phê duyệt kết quả kiểm kê; Ghi nhận lý do chênh lệch', complexity: 'Medium', effort: 2 },
          { task: 'Điều chỉnh tồn kho theo kết quả kiểm kê', detail: 'Tự động tạo phiếu điều chỉnh tồn kho sau duyệt; Hạch toán', complexity: 'Medium', effort: 3 },
          { task: 'In biên bản kiểm kê', detail: 'In biên bản theo mẫu; Xuất PDF', complexity: 'Simple', effort: 1 },
        ]
      },
      {
        group: '7. Báo cáo phân hệ kho',
        tasks: [
          { task: 'Báo cáo nhập - xuất - tồn kho tổng hợp', detail: 'Tổng hợp NXT theo kho, nhóm hàng, kỳ; Xuất Excel/PDF', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo nhập - xuất - tồn kho chi tiết', detail: 'Chi tiết từng phiếu nhập/xuất theo mặt hàng, kho; Tồn từng ngày', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo tồn kho hiện tại', detail: 'Tồn kho tức thời theo kho, nhóm, mặt hàng; Cảnh báo min/max', complexity: 'Medium', effort: 3 },
          { task: 'Báo cáo kiểm kê kho', detail: 'Kết quả kiểm kê theo kỳ; Lịch sử chênh lệch điều chỉnh', complexity: 'Simple', effort: 2 },
          { task: 'Báo cáo hàng chậm luân chuyển / hết hạn', detail: 'Hàng không phát sinh trong X ngày; Hàng sắp hết hạn sử dụng', complexity: 'Medium', effort: 3 },
        ]
      },
    ]
  },
];

// ============================================================
// HELPERS
// ============================================================
function hex(h) { return { argb: 'FF' + h }; }
function fill(bgHex) {
  return { type: 'pattern', pattern: 'solid', fgColor: hex(bgHex) };
}
function font(fgHex, bold = false, sz = 11) {
  return { name: 'Calibri', size: sz, bold, color: hex(fgHex) };
}
function border(style = 'thin') {
  const s = { style };
  return { top: s, left: s, bottom: s, right: s };
}
function align(horizontal = 'left', vertical = 'middle', wrap = true) {
  return { horizontal, vertical, wrapText: wrap };
}

// ============================================================
// BUILD WORKBOOK
// ============================================================
async function build() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'TQA Solutions';
  wb.created = new Date();

  // ─────────────────────────────────────────────────────────
  // SHEET 1: ESTIMATION (Complex Level)  ← main detail sheet
  // ─────────────────────────────────────────────────────────
  const ws = wb.addWorksheet('ESTIMATION (Complex Level)', {
    pageSetup: { paperSize: 9, orientation: 'landscape', fitToPage: true, fitToWidth: 1 }
  });

  // Column widths (A..M)
  ws.columns = [
    { width: 2  },   // A – spacer
    { width: 6  },   // B – No
    { width: 8  },   // C – Code
    { width: 32 },   // D – Name (parent)
    { width: 38 },   // E – Name (child / task)
    { width: 40 },   // F – Description / Detail
    { width: 4  },   // G – spacer
    { width: 14 },   // H – Complex Level
    { width: 13 },   // I – Coding Effort
    { width: 10 },   // J – %Reuse
    { width: 15 },   // K – TOTAL CODING EFFORT
    { width: 28 },   // L – Note
    { width: 4  },   // M – spacer
  ];

  // --- Row 1: Project title ---
  const r1 = ws.addRow(['', 'ERP System WBS Detailed Estimation', '', '', '', '', '', '', '', '', '', '', '']);
  ws.mergeCells(`B1:L1`);
  r1.height = 28;
  r1.getCell('B').fill  = fill(C.titleBg);
  r1.getCell('B').font  = font(C.titleFg, true, 14);
  r1.getCell('B').alignment = align('center', 'middle');

  // --- Row 2: unit note ---
  const r2 = ws.addRow(['', '', '', '', '', '', '', '', '', '', '', 'Coding effort unit: person.days', '']);
  r2.height = 16;
  r2.getCell('L').font = font('595959', false, 10);
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

  // --- Row 4: sub-header Code / Name ---
  const r4 = ws.addRow(['', '', 'Code', 'Name (Module / Group)', 'Name (Task)', 'Description / Detail Work', '', '', '', '', '', '', '']);
  r4.height = 18;
  ['C','D','E','F'].forEach(col => {
    r4.getCell(col).fill      = fill('BDD7EE');
    r4.getCell(col).font      = font('1F3864', true, 10);
    r4.getCell(col).alignment = align('center', 'middle', false);
    r4.getCell(col).border    = border();
  });
  ['H','I','J','K','L'].forEach(col => {
    r4.getCell(col).fill   = fill('BDD7EE');
    r4.getCell(col).font   = font('1F3864', true, 10);
    r4.getCell(col).border = border();
    r4.getCell(col).alignment = align('center', 'middle', false);
  });

  // Freeze top 4 rows
  ws.views = [{ state: 'frozen', ySplit: 4 }];

  // ── DATA ROWS ──
  let seqNo = 1;
  let codeNo = 1;
  let oddRow = false;

  for (const mod of modules) {
    // MODULE header row
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
      // GROUP header row
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

      // TASK rows
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

        // B – No
        tRow.getCell('B').fill      = fill(rowBg);
        tRow.getCell('B').font      = font('404040', false, 10);
        tRow.getCell('B').alignment = align('center', 'middle', false);
        tRow.getCell('B').border    = border();

        // C – Code
        tRow.getCell('C').fill      = fill(rowBg);
        tRow.getCell('C').font      = font('404040', false, 10);
        tRow.getCell('C').alignment = align('center', 'middle', false);
        tRow.getCell('C').border    = border();

        // E – Task name
        tRow.getCell('E').fill      = fill(rowBg);
        tRow.getCell('E').font      = font('1F3864', false, 10);
        tRow.getCell('E').alignment = align('left', 'middle', true);
        tRow.getCell('E').border    = border();

        // F – Description
        tRow.getCell('F').fill      = fill(rowBg);
        tRow.getCell('F').font      = font('404040', false, 9);
        tRow.getCell('F').alignment = align('left', 'middle', true);
        tRow.getCell('F').border    = border();

        // H – Complexity
        tRow.getCell('H').fill      = cc.bg ? fill(cc.bg) : fill(rowBg);
        tRow.getCell('H').font      = cc.fg ? font(cc.fg, true, 10) : font('404040', false, 10);
        tRow.getCell('H').alignment = align('center', 'middle', false);
        tRow.getCell('H').border    = border();

        // I – Coding Effort
        tRow.getCell('I').fill      = fill(rowBg);
        tRow.getCell('I').font      = font('404040', true, 10);
        tRow.getCell('I').alignment = align('center', 'middle', false);
        tRow.getCell('I').border    = border();
        tRow.getCell('I').numFmt    = '0.0';

        // J – %Reuse
        tRow.getCell('J').fill      = fill(rowBg);
        tRow.getCell('J').font      = font('404040', false, 10);
        tRow.getCell('J').alignment = align('center', 'middle', false);
        tRow.getCell('J').border    = border();

        // K – Total Effort
        tRow.getCell('K').fill      = fill('E2EFDA');
        tRow.getCell('K').font      = font('375623', true, 10);
        tRow.getCell('K').alignment = align('center', 'middle', false);
        tRow.getCell('K').border    = border();
        tRow.getCell('K').numFmt    = '0.0';

        // L – Note
        tRow.getCell('L').fill      = fill(rowBg);
        tRow.getCell('L').font      = font('595959', false, 9);
        tRow.getCell('L').alignment = align('left', 'middle', true);
        tRow.getCell('L').border    = border();
      }
    }
  }

  // TOTAL row
  const allEffort = modules.reduce((s,m)=>s+m.groups.reduce((ss,g)=>ss+g.tasks.reduce((sss,t)=>sss+t.effort,0),0),0);
  const totRow = ws.addRow(['', '', '', 'TOTAL', '', '', '', '', '', '', allEffort, '', '']);
  ws.mergeCells(`C${totRow.number}:F${totRow.number}`);
  totRow.height = 22;
  ['B','C','H','I','J','K','L'].forEach(col => {
    totRow.getCell(col).fill      = fill(C.totalBg);
    totRow.getCell(col).border    = border();
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
    { width: 46 },
    { width: 16 },
    { width: 18 },
    { width: 20 },
    { width: 28 },
    { width: 4  },
  ];

  const s1 = ws2.addRow(['', 'ERP System WBS Estimation Summary', '', '', '', '', '', '']);
  ws2.mergeCells('B1:G1');
  s1.height = 28;
  s1.getCell('B').fill = fill(C.titleBg);
  s1.getCell('B').font = font('FFFFFF', true, 14);
  s1.getCell('B').alignment = align('center', 'middle');

  ws2.addRow([]);

  const s3 = ws2.addRow(['', 'No', 'Work Content', 'Effort\n(person.days)', 'Man.months\n(1mm=22days)', 'Unit Cost\n(VND/mm)', 'Total Cost\n(VND)', '']);
  s3.height = 36;
  ['B','C','D','E','F','G'].forEach(col => {
    s3.getCell(col).fill = fill(C.summaryHd);
    s3.getCell(col).font = font('FFFFFF', true, 11);
    s3.getCell(col).alignment = align('center', 'middle');
    s3.getCell(col).border = border();
  });

  ws2.addRow([]);

  let sNo = 1;
  for (const mod of modules) {
    const modEffort = mod.groups.reduce((s,g)=>s+g.tasks.reduce((ss,t)=>ss+t.effort,0),0);
    const mr = ws2.addRow(['', sNo++, mod.module, modEffort, (modEffort/22).toFixed(2), '', '', '']);
    mr.height = 18;
    ['B','C','D','E'].forEach(col => {
      mr.getCell(col).fill = fill(C.moduleHd);
      mr.getCell(col).font = font(C.moduleFg, true, 11);
      mr.getCell(col).border = border();
      mr.getCell(col).alignment = align(col==='D'||col==='E'?'center':'left','middle',false);
    });
    ['F','G'].forEach(col => {
      mr.getCell(col).fill = fill(C.moduleHd);
      mr.getCell(col).border = border();
    });
    mr.getCell('D').numFmt = '0.0';

    for (const grp of mod.groups) {
      const gEffort = grp.tasks.reduce((s,t)=>s+t.effort,0);
      const gr = ws2.addRow(['', sNo++, '  ' + grp.group, gEffort, (gEffort/22).toFixed(2), '', '', '']);
      gr.height = 16;
      ['B','C','D','E','F','G'].forEach(col => {
        gr.getCell(col).fill = fill(C.groupBg);
        gr.getCell(col).font = font(C.groupFg, false, 10);
        gr.getCell(col).border = border();
        gr.getCell(col).alignment = align(col==='D'||col==='E'?'center':'left','middle',false);
      });
      gr.getCell('D').numFmt = '0.0';
    }
  }

  ws2.addRow([]);
  const tR = ws2.addRow(['', '', 'TOTAL CODING EFFORT', allEffort, (allEffort/22).toFixed(2), '', '', '']);
  tR.height = 22;
  ['B','C','D','E','F','G'].forEach(col => {
    tR.getCell(col).fill = fill(C.totalBg);
    tR.getCell(col).font = font(C.totalFg, true, 12);
    tR.getCell(col).border = border();
    tR.getCell(col).alignment = align(col==='D'||col==='E'?'center':'left','middle',false);
  });
  tR.getCell('D').numFmt = '0.0';

  // ─────────────────────────────────────────────────────────
  // SHEET 3: GUIDELINE (Complexity criteria)
  // ─────────────────────────────────────────────────────────
  const ws3 = wb.addWorksheet('GUIDELINE');
  ws3.columns = [{ width: 2 }, { width: 14 }, { width: 80 }, { width: 4 }];

  const g1 = ws3.addRow(['', 'Estimation Guideline', '', '']);
  ws3.mergeCells('B1:C1');
  g1.height = 24;
  g1.getCell('B').fill = fill(C.titleBg);
  g1.getCell('B').font = font('FFFFFF', true, 13);
  g1.getCell('B').alignment = align('center','middle');

  ws3.addRow([]);
  const g3 = ws3.addRow(['', 'Complex Level', 'Criteria / Description', '']);
  g3.height = 20;
  ['B','C'].forEach(col => {
    g3.getCell(col).fill = fill(C.headerBg);
    g3.getCell(col).font = font('FFFFFF', true, 11);
    g3.getCell(col).alignment = align('center','middle');
    g3.getCell(col).border = border();
  });

  const levels = [
    { level: 'Very Simple', bg: 'E2EFDA', fg: '375623', desc: '~ Static content < 1 trang A4 hoặc hiển thị single data < 5 items' },
    { level: 'Simple',      bg: 'E2EFDA', fg: '375623', desc: 'Chức năng xử lý view data < 10 items. Ví dụ: danh mục CRUD đơn giản, in báo cáo tĩnh' },
    { level: 'Medium',      bg: 'FFEB9C', fg: '9C5700', desc: 'Chức năng xử lý input/update/delete hoặc search simple < 10 items. Ví dụ: form nhập liệu, báo cáo tổng hợp đơn giản' },
    { level: 'Complex',     bg: 'FFC7CE', fg: '9C0006', desc: 'Chức năng view/input/update/delete, search advance, có table/chart phức tạp. Ví dụ: workflow phê duyệt, dashboard KPI, báo cáo phân tích' },
    { level: 'Very Complex',bg: 'FF0000', fg: 'FFFFFF', desc: 'Chức năng có nghiệp vụ phức tạp, tổng hợp nhiều data, tích hợp ngoài. Ví dụ: MRP, tính giá thành, báo cáo tài chính tự động' },
  ];
  for (const lv of levels) {
    const lr = ws3.addRow(['', lv.level, lv.desc, '']);
    lr.height = 24;
    lr.getCell('B').fill = fill(lv.bg);
    lr.getCell('B').font = font(lv.fg, true, 10);
    lr.getCell('B').alignment = align('center', 'middle', false);
    lr.getCell('B').border = border();
    lr.getCell('C').font = font('404040', false, 10);
    lr.getCell('C').alignment = align('left', 'middle', true);
    lr.getCell('C').border = border();
  }

  // ─── SAVE ───
  const outPath = 'C:\\Users\\LongLV\\Downloads\\ERP_Estimation_v2.xlsx';
  await wb.xlsx.writeFile(outPath);

  const total = modules.reduce((s,m)=>s+m.groups.reduce((ss,g)=>ss+g.tasks.reduce((sss,t)=>sss+t.effort,0),0),0);
  const tasks = modules.reduce((s,m)=>s+m.groups.reduce((ss,g)=>ss+g.tasks.length,0),0);
  console.log('✅ Done! Saved to:', outPath);
  console.log('   Total tasks  :', tasks);
  console.log('   Total effort :', total, 'person.days =', (total/22).toFixed(1), 'man.months');
}

build().catch(console.error);
