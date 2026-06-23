import React from 'react';
import { Accordion } from '../ui/Accordion';
import { NoteBox } from '../ui/NoteBox';
import { BankSection, DocSection, DocItem } from '../bank/BankSection';

interface WalletSectionProps {
  onViewPDF: (url: string, title: string) => void;
  searchQuery?: string;
}

export const BaokimWalletSection: React.FC<WalletSectionProps> = ({ onViewPDF, searchQuery }) => {
  return (
    <BankSection
      id="baokim_wallet"
      num={1}
      name="Ví điện tử Bảo Kim"
      fullName="Công ty Cổ phần Thương mại Điện tử Bảo Kim · Baokim E-Wallet"
      logoUrl="/public/logo/Logo-Bao-Kim.png"
      fallbackText="BaoKim"
      borderColor="#FF6B00"
      fallbackBg="#FF6B00"
      searchQuery={searchQuery}
      hideFilter={true}
    >
      {() => {
        return (
          <>
            <div className="acct-section">
              <div className="tbl-label">Quy trình đăng ký và xác thực Ví điện tử Bảo Kim</div>
              <p style={{ fontSize: '13px', color: 'var(--tx2)', marginBottom: '16px', lineHeight: '1.6' }}>
                Hướng dẫn các bước tải ứng dụng, đăng ký tài khoản, xác thực danh tính (KYC/NFC) và liên kết tài khoản ngân hàng chính chủ dành cho khách hàng Cá nhân, Hộ kinh doanh và Doanh nghiệp trên hệ thống Bảo Kim.
              </p>
            </div>

            <Accordion
              title="Hướng dẫn Onboarding ví Baokim (5 bước)"
              tags={
                <>
                  <span className="tag tag-self">Đăng ký trên App</span>
                  <span className="tag tag-time">1–3 ngày (DN)</span>
                </>
              }
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Bước 1: Tải ứng dụng Bảo Kim</div>
                    <div className="sd">
                      Tải ứng dụng <strong>“Baokim E-wallet”</strong> trên điện thoại thông minh:<br />
                      • Mở <strong>App Store (iOS)</strong> hoặc <strong>CH Play (Android)</strong>.<br />
                      • Tìm kiếm từ khóa: <strong>Bảo Kim</strong> hoặc <strong>Baokim E-wallet</strong>.<br />
                      • Nhấn nút <strong>Cài đặt / Tải về</strong>.
                    </div>
                  </div>
                </div>

                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Bước 2: Điền thông tin đăng ký</div>
                    <div className="sd">
                      Mở ứng dụng, chọn loại tài khoản phù hợp (Cá nhân hoặc Doanh nghiệp / Hộ kinh doanh) và điền đầy đủ các thông tin đăng ký tương ứng, sau đó ấn <strong>“Tiếp tục”</strong>.<br />
                      <NoteBox type="info" title="Lưu ý về số lượng tài khoản">
                        Mỗi Doanh nghiệp hoặc Hộ kinh doanh được mở tối đa <strong>10 tài khoản</strong> ví điện tử trên cùng một Giấy chứng nhận Đăng ký kinh doanh (ĐKKD).
                      </NoteBox>
                    </div>
                  </div>
                </div>

                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Bước 3: Xác thực tài khoản (KYC &amp; NFC)</div>
                    <div className="sd">
                      <strong>• Đối với tài khoản Cá nhân:</strong> Thực hiện đăng nhập và xác minh thông tin cá nhân (chụp ảnh mặt trước/sau CCCD và quét khuôn mặt theo hướng dẫn trực quan).<br /><br />
                      <strong>• Đối với tài khoản Doanh nghiệp / Hộ kinh doanh:</strong> Nhập thông tin và tải lên tài liệu xác thực tổ chức.<br />
                      <NoteBox type="warning" title="Lưu ý nếu người dùng ví KHÔNG PHẢI là Đại diện pháp luật (ĐDPL)">
                        1. <strong>Tài liệu bắt buộc:</strong> Phải upload thêm <strong>Giấy ủy quyền</strong> lên hệ thống ví.<br />
                        2. <strong>Xác thực NFC:</strong> Bắt buộc phải thực hiện quét NFC CCCD gắn chip của <strong>cả 2 người</strong> (Người ĐDPL trên ĐKKD và Người dùng ví được ủy quyền).
                      </NoteBox>
                    </div>
                  </div>
                </div>

                <div className="step">
                  <div className="sn">4</div>
                  <div className="sb2">
                    <div className="st">Bước 4: Liên kết tài khoản ngân hàng</div>
                    <div className="sd">
                      Thực hiện chuyển khoản số tiền <strong>10.000 VNĐ</strong> từ tài khoản ngân hàng để liên kết ví:<br />
                      • <strong>Đối với Cá nhân:</strong> Thông tin đăng ký tài khoản tại ngân hàng và thông tin định danh trên ví phải là của <strong>cùng một người</strong> (khớp họ tên, số định danh).<br />
                      • <strong>Đối với Hộ kinh doanh / Doanh nghiệp:</strong> Phải thực hiện chuyển khoản từ <strong>đúng tài khoản ngân hàng của chính Hộ kinh doanh / Doanh nghiệp đó</strong> và thông tin phải khớp với định danh ví.
                    </div>
                  </div>
                </div>

                <div className="step">
                  <div className="sn">5</div>
                  <div className="sb2">
                    <div className="st">Bước 5: Đồng ý điều khoản &amp; Kích hoạt ví</div>
                    <div className="sd">
                      <strong>• Đối với Cá nhân:</strong> Tích chọn đồng ý với điều khoản, tiến hành tạo và xác nhận mã PIN bảo mật. Tài khoản ví sẽ được kích hoạt và <strong>sử dụng ngay lập tức</strong>.<br /><br />
                      <strong>• Đối với Hộ kinh doanh / Doanh nghiệp:</strong> Tích chọn đồng ý với điều khoản dịch vụ, sau đó thực hiện <strong>ký số điện tử</strong> văn bản <em>"Thỏa thuận mở và sử dụng ví điện tử"</em> được gửi qua email đăng ký. Tài khoản sẽ được kiểm tra và kích hoạt trong vòng <strong>1–3 ngày làm việc</strong>.
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <div className="acct-section" style={{ marginTop: '24px' }}>
              <div className="tbl-label">Chính sách hạn mức chuyển tiền</div>
              <div className="acct-tbl-wrap">
                <table className="acct-tbl">
                  <thead>
                    <tr>
                      <th style={{ width: '220px' }}>Nhóm khách hàng</th>
                      <th style={{ width: '180px' }}>Điều kiện áp dụng</th>
                      <th>Hạn mức giao dịch tối đa / Ngày</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Cá nhân</strong></td>
                      <td>—</td>
                      <td>
                        Tối đa <strong>10.000.000 VNĐ</strong> / Giao dịch.<br />
                        <span style={{ fontSize: '11px', color: 'var(--tx3)' }}>
                          *Nếu tổng giao dịch &gt; 20.000.000 VNĐ/Ngày: Bắt buộc xác thực Sinh trắc học.
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Doanh nghiệp / HKD mới</strong></td>
                      <td>Hoạt động dưới 6 tháng</td>
                      <td>
                        <strong>5.000.000.000 VNĐ</strong> (5 tỷ đồng)<br />
                        <span style={{ fontSize: '11px', color: 'var(--tx3)' }}>
                          *Tính trên tổng các tài khoản ví của Doanh nghiệp.
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Doanh nghiệp / HKD ổn định</strong></td>
                      <td>Hoạt động từ đủ 6 tháng</td>
                      <td>
                        <strong>10.000.000.000 VNĐ</strong> (10 tỷ đồng)<br />
                        <span style={{ fontSize: '11px', color: 'var(--tx3)' }}>
                          *Tính trên tổng các tài khoản ví của Doanh nghiệp.
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Accordion defaultOpen={false} title="Câu hỏi thường gặp (FAQ)">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Accordion title="Q: Vì sao liên kết ví Baokim với tài khoản ngân hàng thất bại dù tôi đã chuyển 10.000đ?">
                  <div style={{ padding: '8px 12px', fontSize: '13px', lineHeight: '1.6', color: 'var(--tx2)' }}>
                    Giao dịch liên kết 10.000đ chỉ hợp lệ khi được thực hiện từ tài khoản ngân hàng chính chủ (tên chủ tài khoản ngân hàng phải trùng khớp hoàn toàn với tên chủ ví điện tử Baokim).<br /><br />
                    Trường hợp chuyển khoản từ tài khoản không chính chủ hoặc ví điện tử khác, Bảo Kim sẽ không thể xác thực thông tin. Quý khách vui lòng gửi thông tin tài khoản ngân hàng (số tài khoản, tên chủ tài khoản, tên ngân hàng) về email <strong>hotrokhachhang@baokim.vn</strong> để được hỗ trợ hoàn lại tiền.
                  </div>
                </Accordion>

                <Accordion title="Q: Tại sao liên kết và thanh toán bằng tài khoản chính chủ nhưng vẫn báo thất bại?">
                  <div style={{ padding: '8px 12px', fontSize: '13px', lineHeight: '1.6', color: 'var(--tx2)' }}>
                    Một số trường hợp giao dịch có thể bị gián đoạn do lỗi đường truyền mạng hoặc phía ngân hàng đối tác. Các giao dịch liên kết lỗi sẽ được hệ thống tự động hoàn tiền trong tối đa <strong>2 ngày làm việc</strong>.
                  </div>
                </Accordion>

                <Accordion title="Q: Bị trừ tiền ngân hàng nhưng trạng thái vẫn chưa liên kết, liên kết lại hiện 'Đang xử lý'?">
                  <div style={{ padding: '8px 12px', fontSize: '13px', lineHeight: '1.6', color: 'var(--tx2)' }}>
                    Nếu giao dịch được thực hiện từ tài khoản chính chủ, tiền sẽ được hoàn trong tối đa 2 ngày làm việc. Ở lần liên kết tiếp theo, Quý khách vẫn cần chuyển khoản lại 10.000đ từ tài khoản ngân hàng để liên kết lại.<br /><br />
                    Trường hợp Quý khách chưa thực hiện chuyển tiền nhưng đã chọn nút "Tôi đã chuyển tiền" trên ứng dụng, hệ thống sẽ tự động hiển thị trạng thái "Đang xử lý".
                  </div>
                </Accordion>

                <Accordion title="Q: Vì sao tôi chuyển tiền liên kết ví nhưng không được hoàn lại?">
                  <div style={{ padding: '8px 12px', fontSize: '13px', lineHeight: '1.6', color: 'var(--tx2)' }}>
                    Nếu thực hiện chuyển tiền từ ví điện tử của đơn vị khác, hệ thống Bảo Kim hiện tại chưa hỗ trợ cơ chế hoàn tiền tự động về ví của bên thứ ba. Quý khách vui lòng gửi ảnh sao kê giao dịch bị trừ tiền và thông tin tài khoản ngân hàng chính chủ về email <strong>hotrokhachhang@baokim.vn</strong> để đầu mối hỗ trợ đối soát hoàn tiền thủ công.
                  </div>
                </Accordion>

                <Accordion title="Q: Liên kết thất bại và bị trừ tiền ngân hàng thì bao lâu nhận được tiền hoàn?">
                  <div style={{ padding: '8px 12px', fontSize: '13px', lineHeight: '1.6', color: 'var(--tx2)' }}>
                    Nếu giao dịch được thực hiện từ tài khoản ngân hàng chính chủ, số tiền sẽ được hoàn trả về tài khoản gốc trong tối đa <strong>2 ngày làm việc</strong>.
                  </div>
                </Accordion>

                <Accordion title="Q: Vì sao KYC khuôn mặt báo lỗi 'Khuôn mặt không khớp'?">
                  <div style={{ padding: '8px 12px', fontSize: '13px', lineHeight: '1.6', color: 'var(--tx2)' }}>
                    Quý khách vui lòng thực hiện chụp ảnh khuôn mặt trong điều kiện đầy đủ ánh sáng, rõ nét, đồng thời kiểm tra hình ảnh trên giấy tờ định danh (CCCD) có sự khác biệt lớn so với khuôn mặt hiện tại hay không.
                  </div>
                </Accordion>

                <Accordion title="Q: Vì sao tôi không nhận được mã SMS OTP khi đăng ký hoặc quên mật khẩu?">
                  <div style={{ padding: '8px 12px', fontSize: '13px', lineHeight: '1.6', color: 'var(--tx2)' }}>
                    Hiện tại Bảo Kim chỉ hỗ trợ gửi mã SMS OTP cho các nhà mạng: <strong>Viettel, Mobifone, Vinaphone, ITelecom, Reddi</strong>. Quý khách vui lòng kiểm tra lại nhà mạng đang sử dụng. Nếu cần hỗ trợ, vui lòng liên hệ Hotline CSKH: <strong>024 7107 8999</strong>.
                  </div>
                </Accordion>

                <Accordion title="Q: Thời gian duyệt tài khoản Doanh nghiệp là bao lâu?">
                  <div style={{ padding: '8px 12px', fontSize: '13px', lineHeight: '1.6', color: 'var(--tx2)' }}>
                    Thời gian phê duyệt tài khoản DN là từ <strong>2 - 3 ngày làm việc</strong> kể từ thời điểm doanh nghiệp hoàn tất ký số thỏa thuận mở và sử dụng dịch vụ.
                  </div>
                </Accordion>

                <Accordion title="Q: Sau khi chấp nhận thỏa thuận sử dụng dịch vụ trên app, tôi cần làm gì tiếp theo?">
                  <div style={{ padding: '8px 12px', fontSize: '13px', lineHeight: '1.6', color: 'var(--tx2)' }}>
                    Bạn vui lòng kiểm tra hòm thư email đã đăng ký và thực hiện <strong>Ký điện tử</strong> hợp đồng được gửi từ Baokim. Sau khi ký, tài khoản doanh nghiệp sẽ được phê duyệt và kích hoạt trong vòng <strong>1 - 3 ngày làm việc</strong>.
                  </div>
                </Accordion>

                <Accordion title="Q: Nếu tôi là người được ủy quyền đăng ký Ví Baokim, cần xác thực NFC CCCD của ai?">
                  <div style={{ padding: '8px 12px', fontSize: '13px', lineHeight: '1.6', color: 'var(--tx2)' }}>
                    Quý khách cần thực hiện xác thực và quét NFC CCCD gắn chip của <strong>cả hai người</strong>: Người đại diện theo pháp luật (trên ĐKKD) và Người được ủy quyền trực tiếp sử dụng ví điện tử Bảo Kim.
                  </div>
                </Accordion>

                <Accordion title="Q: Vì sao tôi không thể thực hiện rút tiền về tài khoản liên kết ví Baokim?">
                  <div style={{ padding: '8px 12px', fontSize: '13px', lineHeight: '1.6', color: 'var(--tx2)' }}>
                    Hiện tại ứng dụng ví điện tử Bảo Kim chưa cung cấp tính năng rút trực tiếp về tài khoản liên kết. Quý khách vui lòng sử dụng tính năng <strong>Chuyển tiền đến ngân hàng</strong> trên ứng dụng để chuyển tiền về tài khoản ngân hàng chính chủ của mình.
                  </div>
                </Accordion>
              </div>
            </Accordion>

            <DocSection>
              <DocItem
                type="pdf"
                name="Hướng dẫn Onboarding ví điện tử Bảo Kim"
                meta="Bảo Kim · PDF · 2.2 MB"
                url="/docs/baokim/Hướng dẫn Onboard VĐT Baokim.pdf"
                onViewPDF={onViewPDF}
              />
            </DocSection>
          </>
        );
      }}
    </BankSection>
  );
};
