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
      logoUrl="/logo/Logo-Payoo.webp"
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
              title="Hướng dẫn Quy trình Onboarding &amp; Ký hợp đồng Payoo (Hợp tác HENO x Payoo)"
              tags={
                <>
                  <span className="tag tag-heno">Quy trình Onboard</span>
                  <span className="tag tag-time">2–5 ngày</span>
                </>
              }
            >
              <div style={{ marginBottom: '16px', fontSize: '13px', lineHeight: '1.6' }}>
                Quy trình đăng ký kết nối cổng thanh toán Payoo dành cho đối tác/khách hàng của HENO được thực hiện theo hai trường hợp cụ thể như sau:
              </div>

              <div className="sub-accordion-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* TH1 */}
                <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '16px', margin: '8px 0' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '14px', marginBottom: '8px', color: 'var(--tx)' }}>
                    Trường hợp 1: Khách hàng của HENO phát triển có nhu cầu kết nối thanh toán
                  </h4>
                  <div className="steps">
                    <div className="step">
                      <div className="sn">1</div>
                      <div className="sb2">
                        <div className="st">HENO giới thiệu thông tin đối tác</div>
                        <div className="sd">
                          HENO tiếp nhận thông tin và giới thiệu nhu cầu kết nối của Khách hàng sang cho Payoo.
                          <br />
                          <strong style={{ color: 'var(--tx2)', display: 'inline-block', marginTop: '6px' }}>Thông tin Khách hàng cần cung cấp bao gồm:</strong>
                          <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>
                            <li>Tên Khách hàng / Tên Doanh nghiệp sử dụng.</li>
                            <li>Họ và tên của đầu mối đại diện liên hệ phía doanh nghiệp.</li>
                            <li>Số điện thoại liên hệ của đầu mối đại diện doanh nghiệp.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="step">
                      <div className="sn">2</div>
                      <div className="sb2">
                        <div className="st">Payoo tư vấn và hoàn tất hợp đồng</div>
                        <div className="sd">
                          Đại diện Payoo liên hệ trực tiếp để tư vấn giải pháp, đàm phán biểu phí giao dịch và hoàn tất thủ tục ký hợp đồng hợp tác thương mại với Khách hàng theo quy trình nghiệp vụ hiện hành của Payoo.
                        </div>
                      </div>
                    </div>
                    <div className="step">
                      <div className="sn">3</div>
                      <div className="sb2">
                        <div className="st">Cấp tài khoản và bàn giao thông số</div>
                        <div className="sd">
                          Payoo cấp tài khoản quản trị vận hành cổng thanh toán cho Khách hàng. Đồng thời, Payoo gửi bộ thông số tích hợp kỹ thuật để kết nối hai hệ thống.
                        </div>
                      </div>
                    </div>
                    <div className="step">
                      <div className="sn">4</div>
                      <div className="sb2">
                        <div className="st">Cấu hình kết nối trên Tingee</div>
                        <div className="sd">
                          Khách hàng đăng nhập trang quản trị Tingee (hoặc gửi bộ thông số kỹ thuật cho đội ngũ kỹ thuật HENO) để thực hiện cấu hình các tham số kỹ thuật của Payoo lên hệ thống. Khách hàng chính thức kích hoạt và bắt đầu sử dụng toàn bộ tính năng và API do Payoo hỗ trợ.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TH2 */}
                <div style={{ borderLeft: '3px solid #2E7D32', paddingLeft: '16px', margin: '8px 0' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '14px', marginBottom: '8px', color: 'var(--tx)' }}>
                    Trường hợp 2: Khách hàng đã ký hợp đồng hợp tác với Payoo trước đó, muốn kết nối sử dụng thêm trên hệ thống HENO
                  </h4>
                  <div className="steps">
                    <div className="step">
                      <div className="sn" style={{ borderColor: '#2E7D32', color: '#2E7D32' }}>1</div>
                      <div className="sb2">
                        <div className="st">Chuyển giao thông tin đối tác để ký hợp đồng dịch vụ bổ sung</div>
                        <div className="sd">
                          Payoo chuyển thông tin của Khách hàng sang cho HENO để hai bên HENO và Khách hàng hoàn tất thủ tục ký hợp đồng hợp tác dịch vụ bổ sung.
                        </div>
                      </div>
                    </div>
                    <div className="step">
                      <div className="sn" style={{ borderColor: '#2E7D32', color: '#2E7D32' }}>2</div>
                      <div className="sb2">
                        <div className="st">Cung cấp bộ thông số tích hợp</div>
                        <div className="sd">
                          Sau khi hợp đồng bổ sung hoàn tất, Payoo gửi bộ thông số kết nối kỹ thuật cho Khách hàng và HENO.
                        </div>
                      </div>
                    </div>
                    <div className="step">
                      <div className="sn" style={{ borderColor: '#2E7D32', color: '#2E7D32' }}>3</div>
                      <div className="sb2">
                        <div className="st">Cấu hình tham số để liên kết tài khoản</div>
                        <div className="sd">
                          Khách hàng nhập các tham số nhận được vào phần cấu hình hệ thống trên trang quản lý của Tingee để hoàn tất liên kết tài khoản và bắt đầu vận hành dịch vụ bình thường.
                        </div>
                      </div>
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
