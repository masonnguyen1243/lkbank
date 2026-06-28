import React from 'react';
import { Accordion } from '../../ui/Accordion';
import { NoteBox } from '../../ui/NoteBox';
import { ContactCard } from '../../ui/ContactCard';
import { BankSection, DocSection, DocItem } from '../BankSection';

interface BankSectionCommonProps {
  onViewPDF: (url: string, title: string) => void;
  searchQuery?: string;
}

// 1. VIETINBANK (VTB)
export const VTBSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="vtb"
      searchQuery={searchQuery}
      num={1}
      name="Vietinbank"
      fullName="NH TMCP Công Thương Việt Nam · VTB"
      logoUrl="https://api.vietqr.io/img/ICB.png"
      fallbackText="VTB"
      borderColor="#1a5276"
      fallbackBg="#1a5276"
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
                      <td><span className="badge bv">VA</span></td>
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

            {showDN && (
              <Accordion 
                title="Tài khoản Doanh nghiệp" 
                tags={
                  <>
                    <span className="tag tag-heno">Qua HENO</span>
                    <span className="tag tag-time">3–5 ngày</span>
                  </>
                }
              >
                <div className="steps">
                  <div className="step">
                    <div className="sn">1</div>
                    <div className="sb2">
                      <div className="st">KH liên hệ CBB – Ký hợp đồng cấu hình TKDN</div>
                      <div className="sd">
                        KH liên hệ CBB phụ trách tại Ngân hàng hỗ trợ ký hợp đồng cấu hình TKDN theo hướng dẫn trong <strong>công văn 4959</strong>.<br />
                        Cấu hình VAC + VAV theo điểm bán gồm 7 ký tự.<br />
                        <NoteBox type="warning" title="Tài liệu hồ sơ yêu cầu">
                          Hồ sơ biểu mẫu QR không kết nối hệ thống gồm: <br />
                          1. <strong>BM01a:</strong> Giấy đề nghị kiêm HĐ DV CNTT VietQRPay - ĐVCNTT không kết nối hệ thống. <br />
                          2. <strong>BM01b:</strong> Tờ trình thẩm định merchant không có kết nối hệ thống <br />
                          3. <strong>File excel BM01 + BM02:</strong> DV Loa thông báo tiền về VietQRPay
                        </NoteBox>
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">2</div>
                    <div className="sb2">
                      <div className="st">Nộp hồ sơ – Gửi đầu mối VTB</div>
                      <div className="sd">
                        Sau khi hoàn thiện hồ sơ, KH gửi hồ sơ tới các địa chỉ dưới đây hoặc liên hệ CBB hỗ trợ xử lý:
                        <div className="c-label">Đầu mối hỗ trợ bán</div>
                        <ContactCard type="info">
                          <div className="c-row">Các Ban KHDN Lớn / VVN / FDI</div>
                        </ContactCard>
                        <div className="c-label">Hỗ trợ triển khai &amp; giải pháp</div>
                        <ContactCard type="info">
                          <div className="c-row">
                            <span>GPTC_Trienkhai@vietinbank.vn</span>
                          </div>
                          <div className="c-row">
                            <span>GPTC_Phattrien@vietinbank.vn</span>
                          </div>
                        </ContactCard>
                        <div style={{ marginTop: '8px' }}>
                          <span className="time">Thời gian xử lý từ bank: 1–2 ngày</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">3</div>
                    <div className="sb2">
                      <div className="st">HENO cấu hình &amp; bàn giao</div>
                      <div className="sd">
                        Sau khi VTB cấu hình xong, HENO nhận thông tin qua email và tiến hành cấu hình trên hệ thống TINGEE.<br /><br />
                        <strong>Thành công:</strong> HENO bàn giao thông tin tài khoản và hướng dẫn sử dụng tới CBB hoặc KH.<br />
                        <strong>Không thành công:</strong> HENO trao đổi với bank để xác định nguyên nhân và xử lý khắc phục.<br /><br />
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
                        <span className="time time-ok">Thời gian xử lý cấu hình từ HENO: 1 ngày</span>
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

// 2. BIDV
export const BIDVSection: React.FC<BankSectionCommonProps> = ({ onViewPDF, searchQuery }) => {
  return (
    <BankSection
      id="bidv"
      searchQuery={searchQuery}
      num={2}
      name="BIDV"
      fullName="NH TMCP Đầu tư và Phát triển Việt Nam"
      logoUrl="https://api.vietqr.io/img/BIDV.png"
      fallbackText="BIDV"
      borderColor="#004f9e"
      fallbackBg="#004f9e"
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

            {showDN && (
              <Accordion 
                title="Tài khoản Doanh nghiệp" 
                tags={
                  <>
                    <span className="tag tag-heno">Qua HENO</span>
                    <span className="tag tag-time">3–5 ngày</span>
                  </>
                }
              >
                <div className="steps">
                  <div className="step">
                    <div className="sn">1</div>
                    <div className="sb2">
                      <div className="st">Điền mẫu đăng ký thu hộ qua TK định danh</div>
                      <div className="sd">
                        KH liên hệ CBB phụ trách hỗ trợ điền mẫu đăng ký triển khai thu hộ qua TK định danh theo <strong>công văn 14521</strong>.<br />
                        Mẫu công văn: xem mục <strong>Tài liệu đính kèm</strong> bên dưới.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">2</div>
                    <div className="sb2">
                      <div className="st">Nộp hồ sơ – Gửi đầu mối BIDV</div>
                      <div className="sd">
                        Sau khi hoàn thiện hồ sơ, KH gửi hồ sơ hoặc liên hệ CBB hỗ trợ xử lý theo <strong>công văn 14521</strong>.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">3</div>
                    <div className="sb2">
                      <div className="st">HENO cấu hình &amp; bàn giao</div>
                      <div className="sd">
                        Sau khi BIDV cấu hình xong, HENO nhận thông tin qua email và tiến hành cấu hình trên hệ thống TINGEE.<br /><br />
                        <strong>Thành công:</strong> HENO bàn giao thông tin tài khoản và hướng dẫn sử dụng tới CBB hoặc KH.<br />
                        <strong>Không thành công:</strong> HENO trao đổi với bank để xác định nguyên nhân và xử lý khắc phục.<br /><br />
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
                        <span className="time time-ok">Thời gian xử lý cấu hình từ HENO: 1 ngày</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            )}

            <DocSection>
              <DocItem
                type="pdf"
                name="Công văn 14521 – Hướng dẫn triển khai thu hộ qua VA"
                meta="BIDV · PDF"
                url="/docs/bidv/CV 14521 BIDV.pdf"
                onViewPDF={onViewPDF}
              />
              <DocItem
                type="doc"
                name="BM – Đăng ký triển khai dịch vụ thu hộ qua tài khoản định danh"
                meta="BIDV · Word"
                url="/docs/bidv/BM  Đăng ký triển khai dịch vụ Thu hộ qua tài khoản định danh.docx"
              />
              <DocItem
                type="doc"
                name="BM – Giấy đăng ký kiêm hợp đồng thu hộ qua TK định danh"
                meta="BIDV · Word"
                url="/docs/bidv/BM Giấy Đăng Ký Kiêm Hợp đồng Thu Hộ Qua TK Định Danh.docx"
              />
              <DocItem
                type="doc"
                name="BM – Giấy ủy quyền HENO"
                meta="BIDV · Word"
                url="/docs/bidv/Bieu mau Uy quyen HENO.docx"
              />
            </DocSection>
          </>
        );
      }}
    </BankSection>
  );
};

// 3. OCB
export const OCBSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="ocb"
      searchQuery={searchQuery}
      num={3}
      name="OCB – Ngân hàng Phương Đông"
      fullName="Orient Commercial Joint Stock Bank"
      logoUrl="https://api.vietqr.io/img/OCB.png"
      fallbackText="OCB"
      borderColor="#d32f2f"
      fallbackBg="#d32f2f"
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

            {showDN_HKD && (
              <Accordion 
                title="Tài khoản Doanh nghiệp / Hộ kinh doanh" 
                tags={
                  <>
                    <span className="tag tag-heno">Qua HENO</span>
                    <span className="tag tag-time">2–3 ngày</span>
                  </>
                }
              >
                <div className="steps">
                  <div className="step">
                    <div className="sn">1</div>
                    <div className="sb2">
                      <div className="st">CBB gửi thông tin &amp; ký hợp đồng</div>
                      <div className="sd">
                        CBB gửi thông tin cấu hình của KH qua luồng mail tới HENO. Bank và KH ký hợp đồng 2 bên.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">2</div>
                    <div className="sb2">
                      <div className="st">HENO đăng ký trên API Portal OCB</div>
                      <div className="sd">
                        HENO tiếp nhận thông tin KH và hợp đồng, thực hiện đăng ký trên API Portal OCB. Sau khi nhận thông tin cấu hình và duyệt từ bank sẽ tiến hành cấu hình.<br />
                        <span className="time" style={{ marginTop: '8px', display: 'inline-flex' }}>Thời gian xử lý: 1–2 ngày</span>
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">3</div>
                    <div className="sb2">
                      <div className="st">Bàn giao tài khoản</div>
                      <div className="sd">
                        <strong>Thành công:</strong> HENO bàn giao thông tin tài khoản và hướng dẫn sử dụng tới CBB hoặc KH.<br />
                        <strong>Không thành công:</strong> HENO trao đổi với bank xác định nguyên nhân và xử lý khắc phục.
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

// 4. MB BANK
export const MBBankSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="mbbank"
      searchQuery={searchQuery}
      num={4}
      name="MB Bank"
      fullName="NH TMCP Quân Đội · MB"
      logoUrl="https://api.vietqr.io/img/MB.png"
      fallbackText="MB"
      borderColor="#880e4f"
      fallbackBg="#880e4f"
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
                        Lựa chọn Loại tài khoản <strong>Cá nhân</strong>, nhập các thông tin yêu cầu.<br />
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
                title="Tài khoản Doanh nghiệp" 
                tags={
                  <>
                    <span className="tag tag-heno">Qua HENO</span>
                    <span className="tag tag-time">1–3 giờ</span>
                  </>
                }
              >
                <div className="steps">
                  <div className="step">
                    <div className="sn">1</div>
                    <div className="sb2">
                      <div className="st">KH cung cấp thông tin cho HENO</div>
                      <div className="sd">
                        <ul>
                          <li>Tên doanh nghiệp</li>
                          <li>Số tài khoản ngân hàng</li>
                          <li>Số điện thoại (đăng ký với tài khoản ngân hàng)</li>
                          <li>MST / Số giấy phép đăng ký kinh doanh</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">2</div>
                    <div className="sb2">
                      <div className="st">HENO cấu hình và bàn giao</div>
                      <div className="sd">
                        HENO cấu hình trên hệ thống và bàn giao cho khách hàng.<br />
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
                        <span className="time" style={{ marginTop: '8px', display: 'inline-flex' }}>Thời gian xử lý: 1–3 giờ</span>
                      </div>
                    </div>
                  </div>
                </div>
                <NoteBox type="warning" title="Lưu ý">
                  <ul>
                    <li>Đối với TKDN có lượng giao dịch trung bình 1 ngày lớn, có thể bị miss thông tin một số giao dịch.</li>
                    <li>KH cần mở thêm tài khoản chuyên thu hoặc điều chỉnh tài khoản hiện tại thành tài khoản chuyên thu để đảm bảo không bị miss giao dịch.</li>
                  </ul>
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

// 5. ACB
export const ACBSection: React.FC<BankSectionCommonProps> = ({ searchQuery }) => {
  return (
    <BankSection
      id="acb"
      searchQuery={searchQuery}
      num={5}
      name="ACB"
      fullName="NH TMCP Á Châu"
      logoUrl="https://api.vietqr.io/img/ACB.png"
      fallbackText="ACB"
      borderColor="#1565c0"
      fallbackBg="#1565c0"
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
                      <td><span className="badge bb">TK gốc &amp; VA</span></td>
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

            {showDN_HKD && (
              <Accordion title="Tài khoản Doanh nghiệp / Hộ kinh doanh">
                <div className="ctag">Trường hợp 1 — Liên kết với tài khoản gốc</div>
                <div style={{ marginBottom: '12px' }}>
                  <span className="tag tag-self">Tự thao tác</span>
                </div>
                <div className="steps" style={{ marginBottom: '16px' }}>
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

                <div className="ctag">Trường hợp 2 — Liên kết tạo VA</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="tag tag-heno">Qua HENO</span>
                  <span className="tag tag-time">1–2 ngày</span>
                </div>
                <div className="steps">
                  <div className="step">
                    <div className="sn">1</div>
                    <div className="sb2">
                      <div className="st">Ký hợp đồng đăng ký đầu số định danh</div>
                      <div className="sd">
                        KH liên hệ CBB phụ trách hỗ trợ điền mẫu ký hợp đồng đăng ký đầu số định danh (biểu mẫu <strong>QF-36, QF-37</strong>) — xem mục <strong>Tài liệu đính kèm</strong> bên dưới.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">2</div>
                    <div className="sb2">
                      <div className="st">Gửi hồ sơ tới ACB</div>
                      <div className="sd">
                        Sau khi hoàn thiện hồ sơ, cán bộ / KH soạn email và gửi theo luồng mail được chỉ định hoặc liên hệ CBB hỗ trợ xử lý.
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="sn">3</div>
                    <div className="sb2">
                      <div className="st">ACB cấu hình xong → KH tự thao tác liên kết</div>
                      <div className="sd">
                        Sau khi ACB cấu hình xong, KH có thể tự thao tác: đăng ký Tingee, liên kết ngân hàng, nhập OTP và liên kết thành công.
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
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            )}

            <DocSection>
              <DocItem
                type="doc"
                name="QF-36 – Phiếu đăng ký dịch vụ thu hộ qua Tài Khoản Định Danh"
                meta="ACB · Word · 08/2024"
                url="/docs/acb/QF - 36 - NHGD - 08.24 Phieu dang ky dich vu thu ho qua Tai Khoan Dinh Danh.docx"
              />
              <DocItem
                type="doc"
                name="QF-37 – Điều kiện điều khoản dịch vụ thu hộ qua Tài Khoản Định Danh"
                meta="ACB · Word · 08/2024"
                url="/docs/acb/QF - 37 - NHGD - 08.24 Dieu Kien Dieu Khoan Dich Vu thu ho qua Tai Khoan Dinh Danh.docx"
              />
            </DocSection>
          </>
        );
      }}
    </BankSection>
  );
};
