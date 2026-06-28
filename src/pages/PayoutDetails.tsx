import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PayoutSidebar, PayoutServiceInfo } from '../components/payout/PayoutSidebar';
import { PDFModal } from '../components/ui/PDFModal';
import { BIDVPayoutSection, BaokimPayoutSection } from '../components/payout/PayoutSections';
import '../styles/bank.css';
import '../styles/faqs.css';

// Danh sách các dịch vụ chi hộ của hệ thống
const PAYOUT_SERVICES: PayoutServiceInfo[] = [
  {
    id: 'bidv_payout',
    name: 'Chi hộ BIDV',
    fullName: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam · BIDV Direct Link',
    logoUrl: 'https://api.vietqr.io/img/BIDV.png',
    fallbackText: 'BIDV',
    searchNames: 'bidv chi ho payout direct link maker checker heno erp ngân hàng',
    fallbackBg: '#006B68',
  },
  {
    id: 'baokim_payout',
    name: 'Chi hộ Bảo Kim',
    fullName: 'Công ty Cổ phần Thương mại Điện tử Bảo Kim · Baokim E-Wallet Payout',
    logoUrl: '/logo/Logo-Bao-Kim.png',
    fallbackText: 'BaoKim',
    searchNames: 'baokim bao kim vi dien tu e-wallet wallet payout chi ho ví điện tử onboarding kyc nfc',
    fallbackBg: '#FF6B00',
  }
];
interface PayoutDetailsProps {
  onNavigateHome: () => void;
}

export const PayoutDetails: React.FC<PayoutDetailsProps> = ({ onNavigateHome }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolledPercent, setScrolledPercent] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const [pdfModalState, setPdfModalState] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  const watchedIds = useMemo(() => {
    return PAYOUT_SERVICES.map((s) => s.id);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrolledPercent(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#\/payout\/([^/]+)$/);
      if (match) {
        const serviceId = match[1];
        if (watchedIds.includes(serviceId)) {
          setSelectedServiceId(serviceId);
          window.scrollTo({ top: 0 });
        } else {
          setSelectedServiceId(null);
        }
      } else {
        setSelectedServiceId(null);
      }
    };

    handleHashScroll(); // Run once on mount
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [watchedIds]);

  const handleLinkClick = (id: string) => {
    if (id === 'intro' || id === 'terminology') {
      window.location.hash = '#/payout';
      setSelectedServiceId(null);
    } else {
      window.location.hash = `#\/payout\/${id}`;
      setSelectedServiceId(id);
    }
    setIsSidebarOpen(false);
  };

  const handleClosePDF = () => {
    setPdfModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleViewPDF = (url: string, title: string) => {
    setPdfModalState({
      isOpen: true,
      url,
      title,
    });
  };

  return (
    <div className={`bank-layout ${selectedServiceId ? 'sb-active-view' : ''}`}>
      {/* SCROLL PROGRESS BAR */}
      <div
        className="scroll-progress"
        id="scrollProgress"
        style={{ width: `${scrolledPercent}%` }}
      ></div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {selectedServiceId && isSidebarOpen && (
        <div
          className="sb-overlay open"
          id="sbOverlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* MOBILE HAMBURGER BUTTON */}
      {selectedServiceId && (
        <button
          className="mob-menu-btn"
          id="mobMenuBtn"
          aria-label="Mở menu"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ zIndex: 300 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      )}

      {/* HEADER */}
      <header className="hdr">
        <button
          className="hdr-back-btn"
          onClick={onNavigateHome}
          aria-label="Quay lại"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <img 
          src="https://developers.tingee.vn/img/logo-compact.png" 
          alt="Tingee Logo" 
          style={{ height: '24px', marginRight: '12px', display: 'block' }} 
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1 }}>
          <div>
            <div className="hdr-t">
              {selectedServiceId
                ? `${PAYOUT_SERVICES.find((s) => s.id === selectedServiceId)?.name}`
                : 'Tính Năng Chi Hộ (Payout)'}
            </div>
          </div>
          <span className="hdr-s">
            {selectedServiceId
              ? `— Hướng dẫn tích hợp`
              : '— Cổng kết nối dịch vụ'}
          </span>
        </div>
        <button
          className="theme-toggle-btn"
          id="themeToggleBtn"
          aria-label="Đổi giao diện"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <svg className="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg className="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>
      </header>

      {/* HERO SECTION */}
      {!selectedServiceId && (
        <section className="faq-hero-section" style={{ marginTop: 'var(--sh)' }}>
          <div className="faq-hero-overlay"></div>
          <div className="faq-hero-inner">
            <h1>Tính Năng Chi Hộ (Payout)</h1>
            <p className="faq-hero-subtitle">
              Tích hợp hệ thống chi hộ tự động và đối soát giao dịch thời gian thực qua kênh ngân hàng BIDV Direct Link và ví điện tử Bảo Kim.
            </p>

            {/* SEARCH BAR (Glassmorphism) */}
            <div className="faq-glass-search-container">
              <div className="faq-search-box">
                <svg
                  className="faq-search-box-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  className="faq-search-input-field"
                  placeholder="Tìm kiếm dịch vụ chi hộ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="faq-search-clear-button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Xóa tìm kiếm"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="main-layout-container" style={{ marginTop: selectedServiceId ? 'var(--sh)' : 0 }}>
        {/* SIDEBAR (only if selectedServiceId is active) */}
        {selectedServiceId && (
          <PayoutSidebar
            activeId={selectedServiceId}
            onLinkClick={handleLinkClick}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            services={PAYOUT_SERVICES}
          />
        )}

        {/* DETAILS/DASHBOARD CONTENT PANE */}
        <div className="detail-pane">
          {!selectedServiceId ? (
            /* OVERVIEW DASHBOARD */
            <div className="overview-dashboard" style={{ marginTop: '30px' }}>

              {/* TỔNG QUAN & THUẬT NGỮ */}
              <div className="section-card" id="intro" style={{ marginBottom: '24px' }}>
                <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>
                      Tổng quan Tính năng chi hộ (Payout)
                    </h1>
                    <p style={{ fontSize: '13px', color: 'var(--tx2)', maxWidth: '640px' }}>
                      Hướng dẫn tích hợp kỹ thuật (API/Webhook) và quy trình vận hành dịch vụ Chi hộ (Payout) từ hệ thống ngân hàng BIDV và ví điện tử Bảo Kim (BAOKIM) dành cho doanh nghiệp và đối tác liên kết.
                    </p>
                    <div className="intro-stats">
                      <div className="stat">
                        <div className="stat-n">{PAYOUT_SERVICES.length}</div>
                        <div className="stat-l">Dịch vụ chi hộ</div>
                      </div>
                      <div className="stat">
                        <div className="stat-n">API / Webhook</div>
                        <div className="stat-l">Phương thức kết nối</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-card" id="terminology" style={{ marginBottom: '32px' }}>
                <div className="section-hdr">
                  <div>
                    <div className="section-hdr-t">Thuật ngữ &amp; Viết tắt</div>
                    <div className="section-hdr-s">
                      Giải thích các ký hiệu và thuật ngữ chuyên ngành trong quy trình Chi hộ
                    </div>
                  </div>
                </div>
                <div className="term-tbl-wrap">
                  <table className="term-table">
                    <thead>
                      <tr>
                        <th style={{ width: '100px' }}>Viết tắt</th>
                        <th style={{ width: '220px' }}>Thuật ngữ đầy đủ</th>
                        <th>Ghi chú / Định nghĩa</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="ta">Payout / Disbursement</td>
                        <td className="tf">Dịch vụ Chi hộ</td>
                        <td className="tn">Quy trình chuyển tiền từ tài khoản nguồn (Ngân hàng/Ví) sang tài khoản đích theo yêu cầu của đối tác</td>
                      </tr>
                      <tr>
                        <td className="ta">Merchant</td>
                        <td className="tf">Đơn vị chấp nhận thanh toán</td>
                        <td className="tn">Doanh nghiệp sử dụng dịch vụ chi hộ</td>
                      </tr>
                      <tr>
                        <td className="ta">API Key</td>
                        <td className="tf">Khóa tích hợp cổng kết nối</td>
                        <td className="tn">Chuỗi ký tự dùng để xác thực các yêu cầu gọi API từ hệ thống Merchant</td>
                      </tr>
                      <tr>
                        <td className="ta">IPN</td>
                        <td className="tf">Instant Payment Notification</td>
                        <td className="tn">Cơ chế webhook gửi thông báo trạng thái giao dịch tự động</td>
                      </tr>
                      <tr>
                        <td className="ta">Reconciliation</td>
                        <td className="tf">Đối soát giao dịch</td>
                        <td className="tn">Quy trình so khớp dữ liệu giao dịch định kỳ</td>
                      </tr>
                      <tr>
                        <td className="ta">Maker</td>
                        <td className="tf">Người tạo lệnh</td>
                        <td className="tn">Tài khoản khởi tạo và đẩy yêu cầu giao dịch chi hộ lên hệ thống</td>
                      </tr>
                      <tr>
                        <td className="ta">Checker</td>
                        <td className="tf">Người duyệt lệnh</td>
                        <td className="tn">Tài khoản kiểm tra và thực hiện phê duyệt giao dịch chi hộ cuối cùng</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Grid of Payout Services */}
              <div className="db-grid">
                {PAYOUT_SERVICES.filter(s => !searchQuery || s.searchNames.includes(searchQuery.toLowerCase().trim())).map((service) => (
                  <div
                    key={service.id}
                    className="db-card"
                    onClick={() => window.location.hash = `#/payout/${service.id}`}
                  >
                    <div className="db-card-logo-wrap">
                      <img className="db-card-logo" src={service.logoUrl} alt={service.name} />
                    </div>
                    <h3>{service.name}</h3>
                    <p>{service.fullName}</p>
                    <div className="db-card-btn">
                      Xem quy trình tích hợp
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* DETAILED VIEW FOR SINGLE PAYOUT */
            <div className="detail-view-container payout-detail-view">
              {/* Render only the selected service */}
              {selectedServiceId === 'bidv_payout' && (
                <BIDVPayoutSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
              )}
              {selectedServiceId === 'baokim_payout' && (
                <BaokimPayoutSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
              )}
            </div>
          )}

          {/* FOOTER */}
          <div className="footer">
            © 2026 Công ty CP Công Nghệ HENO &nbsp;·&nbsp;
            <a href="https://tingee.vn" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>tingee.vn</a>
            &nbsp;·&nbsp; 1900 255 567
          </div>
        </div>
      </div>

      {/* PDF VIEWER MODAL */}
      <PDFModal
        isOpen={pdfModalState.isOpen}
        url={pdfModalState.url}
        title={pdfModalState.title}
        onClose={handleClosePDF}
      />
    </div>
  );
};
