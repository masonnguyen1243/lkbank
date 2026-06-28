import React from 'react';
import { Accordion } from '../../ui/Accordion';
import { NoteBox } from '../../ui/NoteBox';
import { BankSection, DocSection } from '../BankSection';

interface BankSectionCommonProps {
  onViewPDF: (url: string, title: string) => void;
  searchQuery?: string;
}

// 11. SHINHANBANK
export const ShinhanSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="shinhan"
      searchQuery={searchQuery}
      num={11}
      name="ShinhanBank"
      fullName="NH Shinhan Việt Nam"
      logoUrl="https://api.vietqr.io/img/SHBVN.png"
      fallbackText="Shinhan"
      borderColor="#ce1126"
      fallbackBg="#ce1126"
    >
      {() => (
        <>
          <div className="cs">
            <p>Đang cập nhật</p>
            <small>Thông tin hướng dẫn cho ShinhanBank sẽ được cập nhật sớm</small>
          </div>
          <DocSection />
        </>
      )}
    </BankSection>
  );
};

// 12. CO-OP BANK
export const CoopSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="coopbank"
      searchQuery={searchQuery}
      num={12}
      name="Co-op Bank"
      fullName="NH Hợp tác xã Việt Nam"
      logoUrl="https://api.vietqr.io/img/COOPBANK.png"
      fallbackText="Co-op"
      borderColor="#0277bd"
      fallbackBg="#0277bd"
    >
      {(filter) => {
        const showCN = filter === 'all' || filter === 'cn';
        const showHKD = filter === 'all' || filter === 'hkd';

        return (
          <>
            <div className="acct-section">
              <div className="tbl-label">Loại tài khoản hỗ trợ</div>
              <div className="acct-tbl-wrap">
                <table className="acct-tbl">
                  <thead>
                    <tr>
                      <th>Loại tài khoản</th>
                      <th>Định dạng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>TK Cá nhân</td>
                      <td><span className="badge br">TK gốc</span></td>
                    </tr>
                    <tr>
                      <td>TK Hộ kinh doanh</td>
                      <td><span className="badge br">TK gốc</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {showCN && (
              <Accordion title="Tài khoản Cá nhân" tags={<span className="tag tag-self">Tự thao tác</span>}>
                <div className="steps">
                  <div className="step">
                    <div className="sn">1</div>
                    <div className="sb2">
                      <div className="st">Đăng ký tài khoản Tingee</div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">2</div>
                    <div className="sb2">
                      <div className="st">Liên kết ngân hàng</div>
                      <div className="sd">
                        Chọn <strong>Tài khoản cá nhân</strong>, nhập các thông tin yêu cầu
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">3</div>
                    <div className="sb2">
                      <div className="st">Nhập mã OTP và liên kết thành công</div>
                    </div>
                  </div>
                </div>
              </Accordion>
            )}

            {showHKD && (
              <Accordion title="Tài khoản Hộ kinh doanh" tags={<span className="tag tag-self">Tự thao tác</span>}>
                <div className="steps">
                  <div className="step">
                    <div className="sn">1</div>
                    <div className="sb2">
                      <div className="st">Đăng ký tài khoản Tingee</div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">2</div>
                    <div className="sb2">
                      <div className="st">Liên kết ngân hàng</div>
                      <div className="sd">
                        Chọn <strong>Tài khoản hộ kinh doanh</strong>, nhập các thông tin yêu cầu
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">3</div>
                    <div className="sb2">
                      <div className="st">Nhập mã OTP và liên kết thành công</div>
                    </div>
                  </div>
                </div>
              </Accordion>
            )}

            <DocSection />
          </>
        );
      }}
    </BankSection>
  );
};

// 13. MSB
export const MSBSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="msb"
      searchQuery={searchQuery}
      num={13}
      name="MSB"
      fullName="NH TMCP Hàng Hải Việt Nam"
      logoUrl="https://api.vietqr.io/img/MSB.png"
      fallbackText="MSB"
      borderColor="#b71c1c"
      fallbackBg="#b71c1c"
    >
      {() => {
        // MSB accordions apply to all filters, so we always render them
        return (
          <>
            <div className="acct-section">
              <div className="tbl-label">Loại tài khoản hỗ trợ</div>
              <div className="acct-tbl-wrap">
                <table className="acct-tbl">
                  <thead>
                    <tr>
                      <th>Loại tài khoản</th>
                      <th>Định dạng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>TK Cá nhân</td>
                      <td><span className="badge bv">VA</span></td>
                    </tr>
                    <tr>
                      <td>TK Doanh nghiệp</td>
                      <td><span className="badge bv">VA</span></td>
                    </tr>
                    <tr>
                      <td>TK Hộ kinh doanh</td>
                      <td><span className="badge bv">VA</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Accordion title="Quy trình Đăng ký mới (Onboarding)" tags={<span className="tag tag-self">Tự thao tác</span>}>
              <div style={{ fontSize: '13px', color: 'var(--tx2)', marginBottom: '16px', lineHeight: 1.6 }}>
                Áp dụng chung cho cả 3 loại tài khoản: <strong>Cá nhân</strong>, <strong>Hộ kinh doanh</strong> và{' '}
                <strong>Doanh nghiệp</strong>.
              </div>
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Khởi đầu tại TINGEE</div>
                    <div className="sd">
                      Khách hàng truy cập Tingee, lựa chọn loại tài khoản, thêm mới Số điện thoại và Số tài khoản gốc, sau đó chọn Xác thực thông tin.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Xác thực tại MSB Merchant App</div>
                    <div className="sd">
                      Hệ thống sẽ tự động Redirect (chuyển hướng) sang App MSB để khách hàng thực hiện đăng nhập tài khoản, sau đó xác thực liên kết với Tingee.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Hoàn tất liên kết</div>
                    <div className="sd">
                      Sau khi xác thực liên kết với Tingee, khách hàng điền các thông tin còn lại và liên kết thành công.
                    </div>
                  </div>
                </div>
              </div>
              <NoteBox type="important" title="LƯU Ý QUAN TRỌNG">
                <ul>
                  <li>
                    Trong quá trình Onboarding, khách hàng <strong>TUYỆT ĐỐI KHÔNG ĐƯỢC SỬA MÃ GIỚI THIỆU</strong>. Việc thay đổi mã này có thể dẫn đến sai lệch dữ liệu hoặc không ghi nhận được cấu hình giữa hệ thống.
                  </li>
                  <li>
                    Khách hàng chỉ có thể thực hiện liên kết một lần duy nhất. Nếu hủy liên kết, hệ thống sẽ không hỗ trợ liên kết lại tài khoản này.
                  </li>
                  <li>
                    Trường hợp tài khoản MSB của khách trước đó đã liên kết tại <strong>một hệ thống/nền tảng khác</strong>, sẽ <strong>KHÔNG THỂ</strong> liên kết với Tingee.
                  </li>
                  <li>
                    <strong>Đối với tài khoản Doanh nghiệp (DN)</strong>: Đại diện DN cần trực tiếp đến quầy giao dịch hoặc yêu cầu Nhân viên Ngân hàng MSB đến hỗ trợ đăng ký sử dụng dịch vụ MSB Merchant thông qua đối tác liên kết <strong>TINGEE (CTCP Công nghệ HENO)</strong>. Sau khi đăng ký thành công, Hội sở (HO) MSB sẽ cấu hình và xử lý thông tin để khách hàng có thể liên kết và sử dụng trên Tingee sau <strong>1 - 3 ngày làm việc</strong>.
                  </li>
                </ul>
              </NoteBox>
            </Accordion>

            <Accordion title="Luồng Tạo/Sửa/Xóa VA (Tài khoản định danh)" tags={<span className="tag tag-self">Tự thao tác</span>}>
              <div style={{ fontSize: '13px', color: 'var(--tx2)', marginBottom: '16px', lineHeight: 1.6 }}>
                Đối với các thao tác quản lý VA (từ VA thứ 2 trở đi, hoặc khi cần chỉnh sửa/xóa), khách hàng cần thực hiện đủ 2 bước:
              </div>
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Thao tác trên MSB Merchant App</div>
                    <div className="sd">
                      Khách hàng truy cập MSB Merchant App để thực hiện thao tác tạo/sửa/xóa VA theo nhu cầu.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Thao tác trên TINGEE</div>
                    <div className="sd">
                      Quay lại TINGEE để thực hiện thao tác tương ứng nhằm đồng bộ dữ liệu giữa hai hệ thống.
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <DocSection />
          </>
        );
      }}
    </BankSection>
  );
};

// 14. TPBANK
export const TPBankSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="tpbank"
      searchQuery={searchQuery}
      num={14}
      name="TPBank"
      fullName="NH TMCP Tiên Phong · TPB"
      logoUrl="https://api.vietqr.io/img/TPB.png"
      fallbackText="TPB"
      borderColor="#54208a"
      fallbackBg="#54208a"
    >
      {(filter) => {
        const showCN = filter === 'all' || filter === 'cn';
        const showDN_HKD = filter === 'all' || filter === 'dn' || filter === 'hkd';

        return (
          <>
            <div className="acct-section">
              <div className="tbl-label">Loại tài khoản hỗ trợ</div>
              <div className="acct-tbl-wrap">
                <table className="acct-tbl">
                  <thead>
                    <tr>
                      <th>Loại tài khoản</th>
                      <th>Định dạng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>TK Cá nhân</td>
                      <td><span className="badge br">TK gốc</span></td>
                    </tr>
                    <tr>
                      <td>TK Doanh nghiệp</td>
                      <td><span className="badge bb">TK gốc &amp; VA</span></td>
                    </tr>
                    <tr>
                      <td>TK Hộ kinh doanh</td>
                      <td><span className="badge bb">TK gốc &amp; VA</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {showCN && (
              <Accordion title="Tài khoản Cá nhân" tags={<span className="tag tag-self">Tự thao tác</span>}>
                <div className="steps">
                  <div className="step">
                    <div className="sn">1</div>
                    <div className="sb2">
                      <div className="st">Khởi động trên Tingee</div>
                      <div className="sd">Đăng ký hoặc đăng nhập tài khoản Tingee Merchant của bạn.</div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">2</div>
                    <div className="sb2">
                      <div className="st">Chọn liên kết ngân hàng</div>
                      <div className="sd">
                        Lựa chọn liên kết <strong>Tài khoản cá nhân</strong> và chọn ngân hàng <strong>TPBank</strong>. Hệ thống sẽ tự động điều hướng sang cổng đăng nhập dịch vụ của <strong>TPBank Connect</strong>.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">3</div>
                    <div className="sb2">
                      <div className="st">Đăng nhập &amp; Chọn tài khoản chia sẻ</div>
                      <div className="sd">
                        Đăng nhập tài khoản TPBank Connect cá nhân. Nhấp chọn <strong>"Cho Phép"</strong> chia sẻ thông tin biến động số dư, sau đó chọn số tài khoản (STK) gốc muốn kết nối.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">4</div>
                    <div className="sb2">
                      <div className="st">Xác thực OTP &amp; Hoàn tất</div>
                      <div className="sd">
                        Xác nhận và nhập mã OTP. Sau khi xác thực thành công, hệ thống sẽ tự động chuyển hướng quay trở lại Tingee và hoàn thành liên kết.
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            )}

            {showDN_HKD && (
              <Accordion title="Tài khoản Hộ kinh doanh / Doanh nghiệp" tags={<span className="tag tag-self">Tự thao tác</span>}>
                <div className="steps">
                  <div className="step">
                    <div className="sn">1</div>
                    <div className="sb2">
                      <div className="st">Khởi động trên Tingee</div>
                      <div className="sd">Đăng ký hoặc đăng nhập tài khoản Tingee Merchant của bạn.</div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">2</div>
                    <div className="sb2">
                      <div className="st">Chọn liên kết ngân hàng</div>
                      <div className="sd">
                        Lựa chọn liên kết <strong>Tài khoản doanh nghiệp</strong> hoặc <strong>Tài khoản hộ kinh doanh</strong>, sau đó chọn ngân hàng <strong>TPBank</strong>. Hệ thống sẽ điều hướng sang cổng đăng nhập <strong>TPBank Connect</strong>.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">3</div>
                    <div className="sb2">
                      <div className="st">Đăng nhập &amp; Lựa chọn tài khoản</div>
                      <div className="sd">
                        Đăng nhập tài khoản TPBank Connect dành cho doanh nghiệp/hộ kinh doanh. Nhấp chọn <strong>"Cho Phép"</strong> kết nối, sau đó lựa chọn tài khoản muốn liên kết: <strong>Số tài khoản gốc</strong> hoặc <strong>VA (Tài khoản định danh)</strong>.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">4</div>
                    <div className="sb2">
                      <div className="st">Xác thực OTP &amp; Hoàn tất</div>
                      <div className="sd">
                        Xác nhận và nhập mã OTP để duyệt liên kết. Khi hoàn thành, hệ thống sẽ chuyển hướng về Tingee và kích hoạt trạng thái liên kết thành công.
                      </div>
                    </div>
                  </div>
                </div>
                <NoteBox type="important" title="LƯU Ý QUAN TRỌNG">
                  Đối với hệ thống TPBank, <strong>Tài khoản định danh (VA)</strong> được hiển thị và quản lý dưới dạng các <strong>Tiểu khoản</strong> của số tài khoản chính.
                </NoteBox>
              </Accordion>
            )}

            <DocSection />
          </>
        );
      }}
    </BankSection>
  );
};
