import React from 'react';
import { Accordion } from '../ui/Accordion';
import { NoteBox } from '../ui/NoteBox';
import { BankSection, DocSection, DocItem } from '../bank/BankSection';

interface PayoutSectionProps {
  onViewPDF: (url: string, title: string) => void;
  searchQuery?: string;
}

export const BIDVPayoutSection: React.FC<PayoutSectionProps> = ({ onViewPDF, searchQuery }) => {
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

export const BaokimPayoutSection: React.FC<PayoutSectionProps> = ({ onViewPDF, searchQuery }) => {
  return (
    <BankSection
      id="baokim_payout"
      num={2}
      name="Chi hộ Bảo Kim"
      fullName="Công ty Cổ phần Thương mại Điện tử Bảo Kim · Baokim E-Wallet Payout"
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
              <div className="tbl-label">Dịch vụ Chi hộ từ Ví điện tử Bảo Kim (Payout)</div>
              <p style={{ fontSize: '13px', color: 'var(--tx2)', marginBottom: '16px', lineHeight: '1.6' }}>
                Tính năng/Dịch vụ chi hộ từ ví điện tử Bảo Kim (Payout) là dịch vụ hợp tác trọng tâm giữa Tingee và Bảo Kim. Quy trình bao gồm các bước Onboarding/mở ví điện tử Bảo Kim và thực hiện liên kết, đồng bộ tài khoản ví này sang cổng Tingee để thực hiện các lệnh chi hộ tự động.
              </p>
            </div>

            <Accordion
              title="Quy trình Onboarding Ví điện tử Bảo Kim (5 bước)"
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

            <Accordion
              title="Hướng dẫn liên kết và đồng bộ Ví điện tử Bảo Kim với Tingee"
              tags={<span className="tag tag-heno">Liên kết &amp; Đồng bộ</span>}
            >
              <div className="steps">
                <div className="step">
                  <div className="sn">1</div>
                  <div className="sb2">
                    <div className="st">Nhận mã định danh ví (Wallet ID)</div>
                    <div className="sd">
                      Sau khi mở ví điện tử Bảo Kim thành công, phía Bảo Kim sẽ cung cấp cho bạn một mã định danh ví (<strong>Wallet ID</strong>).
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">2</div>
                  <div className="sb2">
                    <div className="st">Cấu hình mã ví trên hệ thống Tingee</div>
                    <div className="sd">
                      Người dùng thực hiện cấu hình mã <strong>Wallet ID</strong> đó lên hệ thống Tingee trong phần cài đặt kết nối tài khoản nguồn.
                    </div>
                  </div>
                </div>
                <div className="step">
                  <div className="sn">3</div>
                  <div className="sb2">
                    <div className="st">Đồng bộ ví và sử dụng trọn bộ API Tingee x Bảo Kim</div>
                    <div className="sd">
                      Khách hàng truy cập vào hệ thống Tingee để chọn và sử dụng ID của ví điện tử Bảo Kim vừa liên kết, thực hiện gọi API đồng bộ ví với hệ thống Tingee. Sau khi hoàn thành việc đồng bộ, khách hàng sẽ có thể sử dụng trọn bộ API tích hợp nâng cao của <strong>Tingee x Bảo Kim</strong> để vận hành dịch vụ chi hộ.
                    </div>
                  </div>
                </div>
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
