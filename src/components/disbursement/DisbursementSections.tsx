import React from 'react';
import { Accordion } from '../ui/Accordion';
import { NoteBox } from '../ui/NoteBox';
import { BankSection, DocSection, DocItem } from '../bank/BankSection';

interface DisbursementSectionProps {
  onViewPDF: (url: string, title: string) => void;
  searchQuery?: string;
}

export const BIDVDisbursementSection: React.FC<DisbursementSectionProps> = ({ onViewPDF, searchQuery }) => {
  return (
    <BankSection
      id="bidv_payout"
      num={1}
      name="Chi hộ BIDV"
      fullName="Ngân hàng TMCP Đầu tư và Phát triển Việt Nam · BIDV Direct Link"
      logoUrl="https://api.vietqr.io/img/BIDV.png"
      fallbackText="BIDV"
      borderColor="#006B68"
      fallbackBg="#006B68"
      searchQuery={searchQuery}
      hideFilter={true}
    >
      {(filter) => {
        const showDN = filter === 'all' || filter === 'dn';

        if (!showDN) {
          return (
            <NoteBox type="warning" title="Giới hạn đối tượng sử dụng">
              Dịch vụ Chi hộ qua API BIDV Direct Link chỉ áp dụng đối với <strong>Khách hàng Doanh nghiệp / Tổ chức</strong> có đăng ký sử dụng dịch vụ BIDV Direct gói Nâng cao để tích hợp ERP với Heno. Các tài khoản Cá nhân hoặc Hộ kinh doanh thông thường không hỗ trợ kết nối API này.
            </NoteBox>
          );
        }

        return (
          <>
            <div className="acct-section">
              <div className="tbl-label">Quy trình đăng ký và vận hành Chi hộ BIDV</div>
              <p style={{ fontSize: '13px', color: 'var(--tx2)', marginBottom: '16px', lineHeight: '1.6' }}>
                Hệ thống hỗ trợ doanh nghiệp tích hợp Direct Link kết nối trực tiếp tài khoản ngân hàng BIDV với nền tảng Tingee để thực hiện chi hộ tự động qua bộ API Chi hộ. Quy trình onboard yêu cầu hoàn tất các thủ tục đăng ký với ngân hàng BIDV và phân quyền tài khoản Maker / Checker trên hệ thống.
              </p>
            </div>

            <Accordion
              title="Hướng dẫn đăng ký &amp; Cấu hình dịch vụ"
              tags={
                <>
                  <span className="tag tag-heno">Qua HENO &amp; BIDV</span>
                  <span className="tag tag-time">2–4 ngày</span>
                </>
              }
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Trường hợp 1: Doanh nghiệp chưa đăng ký dịch vụ BIDV Direct</div>
                    <div className="sd">
                      Doanh nghiệp thực hiện đăng ký dịch vụ BIDV Direct và đăng ký tích hợp kênh ERP kết nối vào nhóm Heno trên cùng 1 biểu mẫu trong 1 lần duy nhất:
                      <ol style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px', lineHeight: '1.6' }}>
                        <li>
                          Truy cập trang điền E-form đăng ký BIDV Direct tại địa chỉ:{' '}
                          <a
                            href="https://www.bidv.vn/BIDVDirect"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--primary)', fontWeight: 600 }}
                          >
                            https://www.bidv.vn/BIDVDirect
                          </a>
                        </li>
                        <li>
                          Khai báo đầy đủ thông tin trên biểu mẫu điện tử e-form.
                          <br />
                          <strong style={{ color: 'var(--primary)' }}>*Lưu ý đặc biệt:</strong> Doanh nghiệp <strong>bắt buộc</strong> phải lựa chọn <strong>Gói nâng cao</strong> để hệ thống hỗ trợ tích hợp ERP kết nối với Heno.
                        </li>
                        <li>
                          In biểu mẫu đã hoàn thiện trên eform, ký đóng dấu đỏ và giáp lai đầy đủ.
                        </li>
                        <li>
                          Gửi hồ sơ bản cứng ra quầy giao dịch hoặc Chi nhánh BIDV nơi mở tài khoản, kèm theo bản photo CCCD của những người đăng ký tài khoản User trên hệ thống BIDV Direct (người ký phải ký và ghi rõ họ tên bên cạnh ảnh chụp/photo).
                        </li>
                      </ol>
                      <NoteBox type="info" title="Tài liệu tham khảo Trường hợp 1">
                        Xem chi tiết tài liệu hướng dẫn đăng ký biểu mẫu Eform ở danh sách tài liệu đính kèm bên dưới (tệp <code>HD_Dang_ky_bieu_mau_Eform.pdf</code>).
                      </NoteBox>
                    </div>
                  </div>
                </div>

                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Trường hợp 2: Doanh nghiệp đã đăng ký BIDV Direct nhưng chưa tích hợp kênh ERP kết nối với Heno</div>
                    <div className="sd">
                      Doanh nghiệp lựa chọn một trong hai phương thức sau để bổ sung kênh ERP join vào nhóm Heno:
                      <div style={{ marginTop: '8px' }}>
                        <strong>Cách 1: Đăng ký qua quầy giao dịch (Nhanh &amp; Tiện lợi)</strong>
                        <p style={{ margin: '4px 0 12px 12px', color: 'var(--tx2)' }}>
                          Doanh nghiệp sử dụng biểu mẫu sửa đổi thông tin dịch vụ BIDV Direct (<strong>Mẫu sửa đổi BM02</strong>) để đăng ký bổ sung kênh ERP kết nối vào nhóm Heno, ký đóng dấu và gửi bản cứng trực tiếp ra quầy giao dịch hoặc chi nhánh BIDV quản lý tài khoản để được phê duyệt cấu hình.
                        </p>

                        <strong>Cách 2: Tự thao tác cấu hình online trên hệ thống BIDV Direct</strong>
                        <p style={{ margin: '4px 0 0 12px', color: 'var(--tx2)' }}>
                          Đại diện doanh nghiệp chủ động đăng nhập vào cổng quản trị BIDV Direct trực tuyến và thực hiện cấu hình đăng ký bổ sung kênh ERP kết nối vào nhóm Heno theo các bước hướng dẫn cụ thể.
                        </p>
                      </div>
                      <NoteBox type="important" title="Tài liệu đính kèm cho Trường hợp 2">
                        Doanh nghiệp có thể tải về <strong>Mẫu biểu sửa đổi BM02</strong> (Cách 1) hoặc file <strong>Hướng dẫn sử dụng Quản lý kết nối Direct Link</strong> (Cách 2) ở danh sách tài liệu đính kèm bên dưới để làm theo hướng dẫn.
                      </NoteBox>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion
              title="Xác thực tài khoản Tingee x BIDV"
              tags={<span className="tag tag-self">Tự thao tác</span>}
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Truy cập Tingee</div>
                    <div className="sd">
                      Khách hàng truy cập Tingee và chọn dịch vụ Chi hộ.
                    </div>
                  </div>
                </div>

                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Điều hướng đăng nhập</div>
                    <div className="sd">
                      Hệ thống Tingee điều hướng khách hàng tới website BIDV Direct để đăng nhập và tiếp tục thao tác.
                    </div>
                  </div>
                </div>

                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Điều hướng về Tingee &amp; Sử dụng API</div>
                    <div className="sd">
                      Sau khi đăng nhập thành công, hệ thống điều hướng quay trở lại Tingee. Khi điều hướng xong, khách hàng sẽ có toàn quyền sử dụng bộ API chi hộ Tingee x BIDV.
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion
              title="Phân chia vai trò (Roles) tạo và duyệt lệnh chi"
              tags={<span className="tag tag-heno">Phân quyền tài khoản</span>}
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Cơ chế phân vai trò của BIDV</div>
                    <div className="sd">
                      Để tạo lệnh chi và duyệt lệnh chi, BIDV phân chia thành 2 role, mỗi role sẽ có tài khoản riêng:
                      <ul style={{ paddingLeft: '20px', marginTop: '8px', lineHeight: '1.6' }}>
                        <li>
                          <strong>Maker (Người tạo lệnh):</strong> Là người tạo lệnh chi và đẩy lệnh chi cho Checker.
                        </li>
                        <li>
                          <strong>Checker (Người duyệt lệnh):</strong> Là người thực hiện duyệt lệnh chi.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <DocSection>
              <DocItem
                type="pdf"
                name="Hướng dẫn đăng ký biểu mẫu Eform"
                meta="PDF · 1.4 MB · Tài liệu hướng dẫn khai báo E-form đăng ký BIDV Direct trực tuyến"
                url="/docs/bidv/HD_Dang_ky_bieu_mau_Eform.pdf"
                onViewPDF={onViewPDF}
              />
              <DocItem
                type="doc"
                name="BM02 - Thay đổi thông tin dịch vụ Direct"
                meta="DOC · 228 KB · Biểu mẫu đăng ký bổ sung kênh ERP join vào nhóm Heno"
                url="/docs/bidv/BM02_Thay_doi_thong_tin_dich_vu_Direct.doc"
              />
              <DocItem
                type="doc"
                name="Hướng dẫn KH quản lý kết nối Direct Link"
                meta="DOCX · 230 KB · Tài liệu hướng dẫn tự cấu hình online trên BIDV Direct"
                url="/docs/bidv/HDSD_KH_Quan_ly_ket_noi_Direct_Link.docx"
              />
            </DocSection>
          </>
        );
      }}
    </BankSection>
  );
};
