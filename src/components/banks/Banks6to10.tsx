import React from 'react';
import { Accordion } from '../Accordion';
import { NoteBox } from '../NoteBox';
import { ContactCard } from '../ContactCard';
import { BankSection, DocSection, DocItem } from '../BankSection';

interface BankSectionCommonProps {
  onViewPDF: (url: string, title: string) => void;
  searchQuery?: string;
}

// 6. VIETCOMBANK (VCB)
export const VCBSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="vcb"
      searchQuery={searchQuery}
      num={6}
      name="Vietcombank"
      fullName="NH TMCP Ngoại Thương Việt Nam · VCB"
      logoUrl="https://api.vietqr.io/img/VCB.png"
      fallbackText="VCB"
      borderColor="#1b5e20"
      fallbackBg="#1b5e20"
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
                      <div className="sd">Nhập các thông tin yêu cầu</div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">3</div>
                    <div className="sb2">
                      <div className="st">Xác thực qua app Vietcombank</div>
                      <div className="sd">
                        Hệ thống tự động chuyển qua app Vietcombank để thực hiện liên kết
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">4</div>
                    <div className="sb2">
                      <div className="st">Nhập mã OTP và liên kết thành công</div>
                    </div>
                  </div>
                </div>
              </Accordion>
            )}

            {showDN_HKD && (
              <Accordion 
                title="Tài khoản Doanh nghiệp &amp; Hộ kinh doanh" 
                tags={
                  <>
                    <span className="tag tag-heno">Qua HENO</span>
                    <span className="tag tag-time">5–6 ngày</span>
                  </>
                }
              >
                <div className="steps">
                  <div className="step">
                    <div className="sn">1</div>
                    <div className="sb2">
                      <div className="st">KH cung cấp thông tin</div>
                      <div className="sd">
                        <div className="ctag">KH liên hệ qua Tingee</div>
                        KH cung cấp: Tên DN, STK gốc tại VCB, MST, Địa chỉ, Người đại diện, SĐT người đại diện. Tingee gửi thông tin KH cho đầu mối chi nhánh VCB gần nhất.
                        <br /><br />
                        <div className="ctag">KH liên hệ qua VCB</div>
                        Chuyển tới Bước 2.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">2</div>
                    <div className="sb2">
                      <div className="st">VCB ký hợp đồng &amp; cài đặt tham số</div>
                      <div className="sd">
                        Đầu mối CN VCB ký hợp đồng dịch vụ <strong>VCB OneQR</strong> với KH, sau đó cài đặt tham số BID, TID, MID để định danh tới đối tác Tingee.<br />
                        <span className="time" style={{ marginTop: '8px', display: 'inline-flex' }}>Thời gian xử lý từ bank: 3–4 ngày</span>
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">3</div>
                    <div className="sb2">
                      <div className="st">Tingee cấu hình lên hệ thống</div>
                      <div className="sd">
                        Tingee nhận thông tin tham số BID, TID, MID và cấu hình lên hệ thống Tingee Merchant của KH.<br />
                        <div className="c-label">Đầu mối Tingee</div>
                        <ContactCard type="important">
                          <div className="c-row">
                            Mr. Nghĩa &nbsp;·&nbsp;
                            <span>nghiatm@heno.com.vn</span>
                          </div>
                          <div className="c-row">
                            Mr. Cường &nbsp;·&nbsp;
                            <span>cuongnb@heno.com.vn</span>
                          </div>
                        </ContactCard>
                        <span className="time time-ok" style={{ marginTop: '8px', display: 'inline-flex' }}>Thời gian xử lý từ HENO: 1–2 ngày</span>
                      </div>
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

// 7. VPBANK
export const VPBankSection: React.FC<BankSectionCommonProps> = ({ onViewPDF, searchQuery }) => {
  return (
    <BankSection
      id="vpbank"
      searchQuery={searchQuery}
      num={7}
      name="VPBank"
      fullName="NH TMCP Việt Nam Thịnh Vượng · VPB"
      logoUrl="https://api.vietqr.io/img/VPB.png"
      fallbackText="VPB"
      borderColor="#2e7d32"
      fallbackBg="#2e7d32"
    >
      {(filter) => {
        const showCN = filter === 'all' || filter === 'cn';
        const showHKD = filter === 'all' || filter === 'hkd';
        const showDN = filter === 'all' || filter === 'dn';

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
                      <td><span className="badge bb">TK gốc &amp; VA</span></td>
                    </tr>
                    <tr>
                      <td>TK Doanh nghiệp</td>
                      <td><span className="badge br">TK gốc</span></td>
                    </tr>
                    <tr>
                      <td>TK Hộ kinh doanh</td>
                      <td><span className="badge bv">VA</span></td>
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
                        Lựa chọn Loại tài khoản <strong>Cá nhân – Liên kết STK ảo</strong>, nhập các thông tin yêu cầu.<br /><br />
                        <strong>Lưu ý:</strong> Tại trường thông tin <strong>Số CCCD/CMND/Hộ chiếu</strong>, vui lòng bổ sung thêm hậu tố <strong>HKD</strong> vào sau dãy số.
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

            {showDN && (
              <Accordion 
                title="Tài khoản Doanh nghiệp (VPBank NeoBiz)" 
                tags={
                  <>
                    <span className="tag tag-self">Tự thao tác (có hướng dẫn)</span>
                    <span className="tag tag-time">1–2 ngày</span>
                  </>
                }
              >
                <div className="steps">
                  <div className="step">
                    <div className="sn">1</div>
                    <div className="sb2">
                      <div className="st">Liên kết trên Tingee Merchant</div>
                      <div className="sd">
                        KH đăng ký Tingee, liên kết ngân hàng, lựa chọn <strong>"Liên kết với STK gốc"</strong>. Hệ thống chuyển hướng qua <strong>VPBank NeoBiz</strong>. KH điền thông tin đăng nhập để đăng ký dịch vụ báo có cho TKDN. Hệ thống điều hướng về Tingee Merchant, KH lựa chọn TKDN muốn liên kết.<br /><br />
                        Tài liệu: xem mục <strong>Tài liệu đính kèm</strong> bên dưới.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">2</div>
                    <div className="sb2">
                      <div className="st">Đăng ký kết nối trên VPBank NeoBiz</div>
                      <div className="sd">
                        KH truy cập{' '}
                        <a href="https://online.vpbank.com.vn/neobiz/login" target="_blank" rel="noopener noreferrer">
                          online.vpbank.com.vn/neobiz/login
                        </a>{' '}
                        và đăng nhập. Thực hiện theo tài liệu hướng dẫn của VPBank — xem mục <strong>Tài liệu đính kèm</strong> bên dưới.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">3</div>
                    <div className="sb2">
                      <div className="st">Tiếp tục sử dụng dịch vụ trên Tingee Merchant</div>
                    </div>
                  </div>
                </div>
                <NoteBox type="important" title="Lưu ý quan trọng">
                  <ul>
                    <li>Chỉ áp dụng với TKDN <strong>VPBank NeoBiz</strong>. VPBank NeoBiz Plus sẽ không liên kết được.</li>
                    <li>KH đảm bảo có <strong>USB CKS Token</strong> đăng ký với TKDN VPBank NeoBiz.</li>
                    <li>TKDN VPBank NeoBiz đăng ký trước tháng 7/2025 cần đăng ký bổ sung hình thức xác thực CKS theo biểu mẫu <strong>MB05 và MB31</strong>.</li>
                    <li>Trong quá trình thao tác ở bước 2, luôn phải cắm USB CKS Token để xác thực và duyệt lệnh.</li>
                  </ul>
                </NoteBox>
              </Accordion>
            )}

            <DocSection>
              <DocItem
                type="pdf"
                name="HD đăng ký dịch vụ kết nối tới Đối tác – Biến động số dư"
                meta="VPBank · PDF"
                url="/docs/vpbank/HD_Dang_Ky_Ket_Noi_Doi_Tac_VPBank.pdf"
                onViewPDF={onViewPDF}
              />
              <DocItem
                type="pdf"
                name="Hướng dẫn liên kết tài khoản VPBank trên Tingee"
                meta="VPBank · PDF"
                url="/docs/vpbank/HD_Lien_Ket_Tai_Khoan_VPBank_Tingee.pdf"
                onViewPDF={onViewPDF}
              />
            </DocSection>
          </>
        );
      }}
    </BankSection>
  );
};

// 8. SACOMBANK
export const SacombankSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="sacombank"
      searchQuery={searchQuery}
      num={8}
      name="Sacombank"
      fullName="NH TMCP Sài Gòn Thương Tín · STB"
      logoUrl="https://api.vietqr.io/img/STB.png"
      fallbackText="STB"
      borderColor="#0d47a1"
      fallbackBg="#0d47a1"
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

// 9. VIB
export const VIBSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="vib"
      searchQuery={searchQuery}
      num={9}
      name="VIB"
      fullName="NH TMCP Quốc Tế Việt Nam"
      logoUrl="https://api.vietqr.io/img/VIB.png"
      fallbackText="VIB"
      borderColor="#4a148c"
      fallbackBg="#4a148c"
    >
      {(filter) => {
        const showCN = filter === 'all' || filter === 'cn';
        const showDN = filter === 'all' || filter === 'dn';
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

            {showDN && (
              <Accordion title="Tài khoản Doanh nghiệp" tags={<span className="tag tag-self">Tự thao tác</span>}>
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
                        Chọn <strong>Tài khoản doanh nghiệp</strong>, nhập các thông tin yêu cầu
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

// 10. PGBANK
export const PGBankSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="pgbank"
      searchQuery={searchQuery}
      num={10}
      name="PGBank"
      fullName="NH TMCP Xăng Dầu Petrolimex · PGB"
      logoUrl="https://api.vietqr.io/img/PGB.png"
      fallbackText="PGB"
      borderColor="#c62828"
      fallbackBg="#c62828"
    >
      {(filter) => {
        const showCN = filter === 'all' || filter === 'cn';
        const showDN = filter === 'all' || filter === 'dn';
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
                      <td>TK Doanh nghiệp</td>
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

            {showDN && (
              <Accordion title="Tài khoản Doanh nghiệp" tags={<span className="tag tag-self">Tự thao tác</span>}>
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
                        Chọn <strong>Tài khoản doanh nghiệp</strong>, nhập các thông tin yêu cầu
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
