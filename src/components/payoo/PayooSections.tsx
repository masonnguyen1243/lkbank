import React from 'react';
import { Accordion } from '../ui/Accordion';
import { BankSection } from '../bank/BankSection';

interface PayooSectionProps {
  onViewPDF: (url: string, title: string) => void;
  searchQuery?: string;
}

export const PayooGatewaySection: React.FC<PayooSectionProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="payoo_gateway"
      num={1}
      name="Cổng thanh toán &amp; Thẻ Payoo"
      fullName="Công ty Cổ phần Dịch vụ Trực tuyến Cộng Đồng Việt · Payoo Payment Gateway"
      logoUrl=""
      fallbackText="Payoo"
      borderColor="#0082c8"
      fallbackBg="#00a2e8"
      searchQuery={searchQuery}
      hideFilter={true}
    >
      {() => {
        return (
          <>
            <div className="acct-section">
              <div className="tbl-label">Quy trình tích hợp Cổng thanh toán thẻ Payoo</div>
              <p style={{ fontSize: '13px', color: 'var(--tx2)', marginBottom: '16px', lineHeight: '1.6' }}>
                Hỗ trợ tích hợp cổng thanh toán trực tuyến của Payoo vào website/ứng dụng di động của đối tác, hỗ trợ khách hàng thanh toán qua thẻ nội địa (NAPAS), thẻ quốc tế (Visa, Mastercard, JCB, AMEX) và các ví điện tử liên kết.
              </p>
            </div>

            <Accordion
              title="Hướng dẫn Onboarding cổng thanh toán Payoo"
              tags={
                <>
                  <span className="tag tag-heno">Đăng ký &amp; Ký HĐ</span>
                  <span className="tag tag-time">3–5 ngày</span>
                </>
              }
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Đăng ký tài khoản doanh nghiệp</div>
                    <div className="sd">
                      Doanh nghiệp cung cấp hồ sơ pháp lý (Giấy ĐKKD, CCCD người đại diện pháp luật, Giấy phép con đối với các ngành nghề đặc thù) để Heno gửi sang phía Payoo khởi tạo tài khoản sandbox.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Thao tác cấu hình kỹ thuật</div>
                    <div className="sd">
                      Lấy thông tin cấu hình API (Merchant ID, API Signature Key, SHA256 Key) trên trang quản trị Sandbox Payoo. Tiến hành tích hợp API tạo đơn hàng, callback URL để nhận kết quả thanh toán.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Kiểm thử và Chuyển đổi Production</div>
                    <div className="sd">
                      Thực hiện kiểm thử các kịch bản thanh toán thành công, thất bại, hủy đơn trên môi trường Sandbox. Sau khi nghiệm thu (UAT), tiến hành ký hợp đồng chính thức và nhận thông tin cấu hình môi trường Production.
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion
              title="Hướng dẫn tích hợp API thanh toán thẻ và tạo Payment Link"
              tags={<span className="tag tag-self">API Integration</span>}
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Tạo link thanh toán (Payment Link)</div>
                    <div className="sd">
                      Gọi API <code>/payment/create_link</code> với các tham số đơn hàng (Mã đơn, Số tiền, Nội dung, Thời gian hết hạn). Hệ thống Payoo trả về một đường dẫn (URL) thanh toán duy nhất.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Gửi link cho khách hàng</div>
                    <div className="sd">
                      Doanh nghiệp gửi Payment Link này qua SMS, Zalo, Email hoặc hiển thị mã QR link để khách hàng truy cập bằng trình duyệt. Khách hàng tự lựa chọn hình thức trả thẻ hoặc quét QR ngân hàng.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Nhận kết quả giao dịch (IPN/Webhook)</div>
                    <div className="sd">
                      Khi khách hàng thanh toán thành công, Payoo Server tự động gọi IPN Webhook tới Server đối tác để xác thực chữ ký bảo mật và cập nhật trạng thái đơn hàng theo thời gian thực.
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>
          </>
        );
      }}
    </BankSection>
  );
};

export const PayooSmartPOSSection: React.FC<PayooSectionProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="payoo_smartpos"
      num={2}
      name="Giải pháp thiết bị SmartPOS Payoo"
      fullName="Giải pháp thanh toán tại quầy bằng thiết bị SmartPOS liên kết hệ thống HENO · Payoo SmartPOS"
      logoUrl=""
      fallbackText="POS"
      borderColor="#0082c8"
      fallbackBg="#00a2e8"
      searchQuery={searchQuery}
      hideFilter={true}
    >
      {() => {
        return (
          <>
            <div className="acct-section">
              <div className="tbl-label">Quy trình đăng ký và vận hành thiết bị SmartPOS Payoo</div>
              <p style={{ fontSize: '13px', color: 'var(--tx2)', marginBottom: '16px', lineHeight: '1.6' }}>
                Thiết bị SmartPOS cầm tay hỗ trợ toàn diện các phương thức thanh toán tại cửa hàng/quầy dịch vụ: quẹt thẻ từ/thẻ chip, chạm thẻ không tiếp xúc (Contactless - Visa/Mastercard/Apple Pay), quét mã VietQR và trả góp 0% lãi suất.
              </p>
            </div>

            <Accordion
              title="Quy trình cung cấp &amp; Bàn giao thiết bị SmartPOS"
              tags={
                <>
                  <span className="tag tag-heno">Bàn giao tại quầy</span>
                  <span className="tag tag-time">3–7 ngày làm việc</span>
                </>
              }
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Đăng ký số lượng &amp; Địa điểm lắp đặt</div>
                    <div className="sd">
                      Doanh nghiệp đăng ký nhu cầu sử dụng máy SmartPOS, cung cấp địa chỉ lắp đặt máy và số tài khoản ngân hàng thụ hưởng giao dịch để thiết lập cấu hình định tuyến tiền về.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Cài đặt phần mềm quản lý ứng dụng</div>
                    <div className="sd">
                      Payoo thực hiện cài đặt ứng dụng quản trị POS, nạp các khóa bảo mật đầu cuối (terminal keys) và phân quyền nhân viên sử dụng. Máy POS được gửi trực tiếp đến điểm kinh doanh của đối tác.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Hướng dẫn nhân viên quầy và vận hành</div>
                    <div className="sd">
                      Nhân viên quầy mở máy, nhập mã nhân viên và chọn hình thức thanh toán (Thẻ/QR/Trả góp). Khách hàng quẹt thẻ hoặc quét mã hiển thị trên màn hình POS. Máy POS in hóa đơn giấy xác nhận giao dịch thành công.
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion
              title="Quy trình trả góp 0% lãi suất qua thẻ tín dụng trên SmartPOS"
              tags={<span className="tag tag-heno">Trả góp tín dụng</span>}
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Chọn phương thức trả góp</div>
                    <div className="sd">
                      Trên màn hình máy SmartPOS Payoo, nhân viên chọn mục <strong>"Trả góp 0%"</strong>, nhập số tiền giao dịch (tối thiểu 3.000.000đ hoặc theo quy định ngân hàng).
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Quẹt thẻ &amp; Chọn kỳ hạn</div>
                    <div className="sd">
                      Khách hàng chạm hoặc cắm thẻ tín dụng (Credit Card) vào thiết bị. Máy POS tự động nhận diện ngân hàng phát hành thẻ. Nhân viên hỗ trợ khách hàng chọn kỳ hạn phù hợp (3, 6, 9, 12 tháng) và nhập các thông tin xác thực.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Ký tên xác thực và in hóa đơn</div>
                    <div className="sd">
                      Khách hàng thực hiện ký tên điện tử trực tiếp trên màn hình cảm ứng SmartPOS. Máy POS in ra 2 liên hóa đơn: liên 1 đối tác lưu giữ và liên 2 đưa cho khách hàng. Số tiền sẽ được Payoo đối soát và giải ngân về tài khoản đăng ký.
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>
          </>
        );
      }}
    </BankSection>
  );
};
