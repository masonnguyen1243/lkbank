import React from 'react';
import { Accordion } from '../ui/Accordion';
import { NoteBox } from '../ui/NoteBox';
import { BankSection, DocSection, DocItem } from '../bank/BankSection';

interface OnepaySectionProps {
  onViewPDF: (url: string, title: string) => void;
  searchQuery?: string;
}

export const OnepayDirectDebitSection: React.FC<OnepaySectionProps> = ({ onViewPDF, searchQuery }) => {
  return (
    <BankSection
      id="onepay_direct_debit"
      num={1}
      name="Trích nợ tự động OnePay"
      fullName="Công ty Cổ phần Công nghệ Đại Việt · OnePay Direct Debit"
      logoUrl="/logo/onepay.png"
      fallbackText="OnePay"
      borderColor="#005baa"
      fallbackBg="#005baa"
      searchQuery={searchQuery}
      hideFilter={true}
    >
      {() => {
        return (
          <>
            <div className="acct-section">
              <div className="tbl-label">Quy trình đăng ký và kết nối Trích nợ tự động OnePay</div>
              <p style={{ fontSize: '13px', color: 'var(--tx2)', marginBottom: '16px', lineHeight: '1.6' }}>
                Hệ thống hỗ trợ tự động trừ tiền từ tài khoản hoặc thẻ ngân hàng liên kết của khách hàng định kỳ sau khi đã thực hiện ủy quyền (Mandate) thành công thông qua cổng OnePay.
              </p>

              {/* STATS BLOCK */}
              <div className="intro-stats" style={{ marginBottom: '24px' }}>
                <div className="stat">
                  <div className="stat-n">7 ngân hàng hỗ trợ</div>
                  <div className="stat-l">Agribank, BIDV, Vietinbank, Sacombank, MB, VPBank, MSB</div>
                </div>
              </div>
            </div>

            {/* ACCORDION 1: QUY TRÌNH KÍCH HOẠT */}
            <Accordion
              title="1. Quy trình kích hoạt tính năng thanh toán trực tuyến trên ứng dụng Ngân hàng đối tác"
              tags={
                <>
                  <span className="tag tag-self">Quy trình chung (7 Bank)</span>
                  <span className="tag tag-time">Bắt buộc trước liên kết</span>
                </>
              }
            >
              <div style={{ marginBottom: '16px', fontSize: '13px', lineHeight: '1.6' }}>
                Để liên kết tài khoản thành công và không bị hệ thống từ chối kết nối, khách hàng <strong>bắt buộc</strong> phải bật hoặc đăng ký tính năng thanh toán trực tuyến (E-commerce / Online Payment) trên ứng dụng ngân hàng trước khi thực hiện liên kết trên Tingee.
              </div>

              <div className="steps" style={{ marginBottom: '20px' }}>
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Đăng nhập ứng dụng ngân hàng</div>
                    <div className="sd">
                      Khách hàng đăng nhập vào ứng dụng Mobile Banking (ví dụ: Agribank Plus, VPBank Neo, Vietinbank iPay, Smart OTP BIDV, MB Bank, v.v.) của ngân hàng đang sử dụng.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Kích hoạt E-commerce / Thanh toán Online</div>
                    <div className="sd">
                      Tìm kiếm tính năng <strong>Cài đặt dịch vụ thẻ/tài khoản</strong> hoặc <strong>Cài đặt thanh toán</strong> và thực hiện:
                      <ul style={{ marginTop: '6px', paddingLeft: '20px' }}>
                        <li>Bật chức năng <strong>Thanh toán trực tuyến (E-commerce / Online Payment)</strong>.</li>
                        <li>Thiết lập hạn mức thanh toán ngày tối thiểu bằng hoặc lớn hơn hạn mức thanh toán quy định (Ví dụ: VPBank Neo yêu cầu nhập hạn mức thanh toán ngày tối thiểu là <strong>5.000.000 VNĐ</strong>).</li>
                        <li>Chỉ định cổng thanh toán liên kết là <strong>OnePay</strong> (nếu ngân hàng yêu cầu, ví dụ như VPBank).</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Tiến hành liên kết trên hệ thống Tingee</div>
                    <div className="sd">
                      Sau khi kích hoạt trực tuyến thành công tại ứng dụng ngân hàng, khách hàng quay lại giao diện Tingee để nhập thông tin thẻ/tài khoản và hoàn tất xác thực OTP liên kết.
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <NoteBox type="important" title="Lưu ý quan trọng đối với tất cả 7 ngân hàng">
                  Nếu khách hàng không thực hiện kích hoạt thanh toán trực tuyến trước khi liên kết trên Tingee, ngân hàng phát hành thẻ sẽ từ chối kết nối và trả về mã lỗi <strong>11 - Not Register (Chưa đăng ký dịch vụ)</strong>.
                </NoteBox>

                <div style={{ padding: '12px 16px', background: 'var(--bg2)', borderRadius: '8px', fontSize: '13px', borderLeft: '3px solid var(--primary)' }}>
                  <strong>Ví dụ cụ thể đối với một số ngân hàng:</strong>
                  <ul style={{ marginTop: '6px', paddingLeft: '20px', lineHeight: '1.6' }}>
                    <li><strong>Agribank (Tài khoản):</strong> Đăng nhập <em>Agribank Plus</em> &gt; Vào mục <em>"Cài đặt tài khoản"</em> &gt; Chọn <em>Đăng ký E-commerce</em> &gt; Chọn tài khoản muốn đăng ký.</li>
                    <li><strong>VPBank (Tài khoản):</strong> Đăng nhập <em>VPBank Neo</em> &gt; Chọn <em>Bật thanh toán Online</em> &gt; Chọn cổng đối tác <em>OnePay</em> &gt; Nhập số tiền hạn mức thanh toán ngày là <em>5.000.000 VNĐ</em>.</li>
                    <li><strong>BIDV, Vietinbank, Sacombank, MB, MSB:</strong> Thực hiện quy trình kích hoạt thanh toán trực tuyến (E-commerce) tương tự trên các ứng dụng Mobile Banking tương ứng trước khi tiến hành liên kết.</li>
                  </ul>
                </div>
              </div>
            </Accordion>

            {/* ACCORDION 2: QUY ĐỊNH ĐỐI SOÁT */}
            <Accordion
              title="2. Quy định Đối soát &amp; Hoàn tiền (Reconciliation &amp; Refund)"
              tags={
                <>
                  <span className="tag tag-self">Vận hành thủ công</span>
                  <span className="tag tag-time">3-5 ngày làm việc</span>
                </>
              }
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Thực hiện đối soát giao dịch</div>
                    <div className="sd">
                      Quy trình đối soát chéo dữ liệu giao dịch trích nợ tự động được thực hiện <strong>hoàn toàn thủ công (manual)</strong> giữa Tingee/Heno, OnePay và ngân hàng đối tác theo chu kỳ thỏa thuận.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Yêu cầu hoàn tiền (Refund Request)</div>
                    <div className="sd">
                      Các yêu cầu hoàn tiền cho khách hàng được thực hiện thủ công qua cổng quản trị hoặc đầu mối vận hành.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Thời gian nhận lại tiền hoàn của Khách hàng</div>
                    <div className="sd">
                      Tiền sẽ được hoàn trả về tài khoản khách hàng trong vòng <strong>3 đến 5 ngày làm việc</strong> kể từ thời điểm OnePay phê duyệt yêu cầu hoàn tiền (approve refund).
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            {/* ACCORDION 3: QUY TRÌNH KẾT NỐI TINGEE */}
            <Accordion
              title="3. Quy trình kết nối &amp; liên kết tài khoản phía Tingee"
              tags={
                <>
                  <span className="tag tag-self">Giao diện Tingee</span>
                  <span className="tag tag-time">Tức thời</span>
                </>
              }
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Chọn phương thức liên kết</div>
                    <div className="sd">
                      Khách hàng truy cập trang quản lý thanh toán của đơn vị, chọn <strong>Thêm phương thức thanh toán mới</strong> và chọn <strong>Trích nợ tự động (Direct Debit) qua OnePay</strong>.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Lựa chọn Ngân hàng hỗ trợ</div>
                    <div className="sd">
                      Lựa chọn 1 trong 7 ngân hàng hiện hữu đối tác của OnePay: <strong>Agribank, BIDV, Vietinbank, Sacombank, MB, VPBank, MSB</strong>.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Nhập thông tin xác thực</div>
                    <div className="sd">
                      Nhập các thông tin cần thiết để đăng ký liên kết bao gồm:
                      <ul style={{ marginTop: '6px', paddingLeft: '20px' }}>
                        <li><strong>Tên chủ tài khoản/thẻ</strong></li>
                        <li><strong>Số điện thoại</strong> gắn liền với tài khoản ngân hàng</li>
                        <li><strong>Hình thức nhận mã xác thực liên kết</strong> (Chọn nhận qua <strong>Email</strong> hoặc qua <strong>Zalo</strong>)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">4</div>
                  <div className="sb2">
                    <div className="st">Xác thực OTP &amp; Sử dụng dịch vụ</div>
                    <div className="sd">
                      Nhập mã OTP được gửi về hình thức đã đăng ký để hoàn tất xác thực liên kết.
                      <br /><br />
                      <strong>Kết quả:</strong> Khi liên kết thành công, đơn vị chấp nhận thanh toán có thể sử dụng Token đại diện cho Tài khoản/Thẻ này để gọi API trích nợ tự động định kỳ của OnePay mà không cần OTP ở các chu kỳ sau.
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <DocSection>
              <DocItem
                type="pdf"
                name="Giải pháp tích hợp Trích nợ tự động (DirectDebit Solution)"
                meta="OnePay · PDF"
                url="/docs/onepay/DirectDebit Solution.pdf"
                onViewPDF={onViewPDF}
              />
              <DocItem
                type="doc"
                name="Tài liệu giới thiệu dịch vụ Direct Debit OnePay (20241004)"
                meta="OnePay · PPTX"
                url="/docs/onepay/20241004_OnePay_Direct Debit.pptx"
              />
            </DocSection>
          </>
        );
      }}
    </BankSection>
  );
};
