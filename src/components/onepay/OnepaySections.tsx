import React from 'react';
import { Accordion } from '../ui/Accordion';
import { BankSection } from '../bank/BankSection';

interface OnepaySectionProps {
  onViewPDF: (url: string, title: string) => void;
  searchQuery?: string;
}

export const OnepayDirectDebitSection: React.FC<OnepaySectionProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="onepay_direct_debit"
      num={1}
      name="Trích nợ tự động OnePay"
      fullName="Công ty Cổ phần Công nghệ Đại Việt · OnePay Direct Debit"
      logoUrl=""
      fallbackText="OnePay"
      borderColor="#00A05A"
      fallbackBg="#2E7D32"
      searchQuery={searchQuery}
      hideFilter={true}
    >
      {() => {
        return (
          <>
            <div className="acct-section">
              <div className="tbl-label">Quy trình đăng ký và kết nối Trích nợ tự động OnePay</div>
              <p style={{ fontSize: '13px', color: 'var(--tx2)', marginBottom: '16px', lineHeight: '1.6' }}>
                Hệ thống hỗ trợ tự động trừ tiền từ tài khoản ngân hàng hoặc thẻ ghi nợ nội địa/quốc tế của khách hàng định kỳ sau khi đã có văn bản hoặc xác thực ủy quyền thanh toán (Mandate) được thiết lập thông qua cổng OnePay.
              </p>
            </div>

            <Accordion
              title="Quy trình Đăng ký Ủy quyền trích nợ tự động (Mandate)"
              tags={
                <>
                  <span className="tag tag-heno">Đăng ký Ủy quyền</span>
                  <span className="tag tag-time">1-2 ngày</span>
                </>
              }
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Khách hàng xác nhận Ủy quyền</div>
                    <div className="sd">
                      Khách hàng truy cập trang liên kết dịch vụ OnePay thông qua Heno, điền thông tin tài khoản/thẻ ngân hàng cần thực hiện trích nợ định kỳ. Hệ thống điều hướng sang cổng OTP của ngân hàng hoặc OnePay để xác nhận ủy quyền (Mandate).
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Sinh và lưu Token bảo mật (Tokenization)</div>
                    <div className="sd">
                      Sau khi xác nhận OTP thành công, OnePay phản hồi một Token mã hóa (không chứa thông tin thẻ nhạy cảm) đại diện cho tài khoản của khách hàng về Server đối tác để lưu trữ vào cơ sở dữ liệu phục vụ các chu kỳ thanh toán tiếp theo.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Kích hoạt trạng thái trích nợ</div>
                    <div className="sd">
                      Hệ thống tự động kích hoạt trạng thái liên kết trích nợ tự động của khách hàng và gửi thông báo xác nhận liên kết thành công qua email hoặc ứng dụng Heno.
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion
              title="Hướng dẫn gọi API Thanh toán định kỳ (Recurring Payment)"
              tags={<span className="tag tag-self">API Recurring</span>}
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Lập lịch giao dịch định kỳ</div>
                    <div className="sd">
                      Đến kỳ thanh toán (hàng tháng/quý), hệ thống đối tác tự động quét danh sách các hóa đơn cần thanh toán kèm theo Token đã được ủy quyền tương ứng từ cơ sở dữ liệu.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Gọi API Trích nợ tự động</div>
                    <div className="sd">
                      Gọi API <code>/recurring/charge</code> truyền vào Token, Số tiền trích nợ và Mã hóa đơn. OnePay thực hiện trừ tiền trực tiếp từ tài khoản khách hàng mà không cần khách hàng nhập lại OTP (Silent Charge).
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Nhận kết quả giao dịch</div>
                    <div className="sd">
                      OnePay phản hồi kết quả giao dịch đồng bộ (Thành công/Thất bại do số dư không đủ, thẻ hết hạn, v.v.). Hệ thống tự động cập nhật trạng thái hóa đơn và gửi thông báo hóa đơn đã thanh toán thành công cho khách hàng.
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
