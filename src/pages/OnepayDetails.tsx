import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { OnepaySidebar, OnepayServiceInfo } from '../components/onepay/OnepaySidebar';
import { PDFModal } from '../components/ui/PDFModal';
import '../styles/bank.css';
import '../styles/faqs.css';
import { OnepayDirectDebitSection } from '../components/onepay/OnepaySections';

interface OnepayDetailsProps {
  onNavigateHome: () => void;
}

const ONEPAY_SERVICES: OnepayServiceInfo[] = [
  {
    id: 'onepay_direct_debit',
    name: 'Trích nợ tự động OnePay',
    fullName: 'Cổng trích nợ tự động tài khoản/thẻ liên kết · OnePay Direct Debit',
    logoUrl: '/logo/onepay.png',
    fallbackText: 'OnePay',
    searchNames: 'onepay direct debit trich no tu dong agribank vpbank bidv vietinbank sacombank mb msb',
    fallbackBg: '#005baa',
  }
];

export const OnepayDetails: React.FC<OnepayDetailsProps> = ({ onNavigateHome }) => {
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
    return ONEPAY_SERVICES.map((s) => s.id);
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
      const match = hash.match(/^#\/onepay\/([^/]+)$/);
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

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [watchedIds]);

  const handleLinkClick = (id: string) => {
    if (id === 'intro') {
      window.location.hash = '#/onepay';
      setSelectedServiceId(null);
    } else {
      window.location.hash = `#\/onepay\/${id}`;
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
                ? `${ONEPAY_SERVICES.find((s) => s.id === selectedServiceId)?.name}`
                : 'Trích nợ tự động (direct debit)'}
            </div>
          </div>
          <span className="hdr-s">
            {selectedServiceId
              ? `— Hướng dẫn tích hợp`
              : '— ONEPAY'}
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
            <h1>Trích nợ tự động (direct debit)</h1>
            <p className="faq-hero-subtitle" style={{ marginBottom: 0 }}>
              Giải pháp ủy quyền trích nợ tài khoản tự động định kỳ, tích hợp cổng kỹ thuật đối tác OnePay.
            </p>
          </div>
        </section>
      )}

      <div className="main-layout-container" style={{ marginTop: selectedServiceId ? 'var(--sh)' : 0 }}>
        {/* SIDEBAR (only if selectedServiceId is active) */}
        {selectedServiceId && (
          <OnepaySidebar
            activeId={selectedServiceId}
            onLinkClick={handleLinkClick}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            services={ONEPAY_SERVICES}
          />
        )}

        {/* DETAILS/DASHBOARD CONTENT PANE */}
        <div className="detail-pane">
          {!selectedServiceId ? (
            /* OVERVIEW DASHBOARD */
            <div className="overview-dashboard" style={{ marginTop: '30px' }}>
              <div className="section-card" id="intro">
                <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>
                      Tổng quan Quy trình Trích nợ tự động OnePay
                    </h1>
                    <p style={{ fontSize: '13px', color: 'var(--tx2)', maxWidth: '640px' }}>
                      Tài liệu hướng dẫn đăng ký liên kết ủy quyền trích nợ tự động giữa khách hàng và Tingee thông qua OnePay, cho phép thu phí tự động định kỳ nhanh chóng qua kết nối API trực tiếp từ hệ thống.
                    </p>
                    <div className="intro-stats">
                      <div className="stat">
                        <div className="stat-n">{ONEPAY_SERVICES.length}</div>
                        <div className="stat-l">Dịch vụ trích nợ</div>
                      </div>
                      <div className="stat">
                        <div className="stat-n">Tokenization</div>
                        <div className="stat-l">Phương thức bảo mật</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* THUẬT NGỮ & VIẾT TẮT */}
              <div className="section-card" id="terminology" style={{ marginBottom: '32px', marginTop: '24px' }}>
                <div className="section-hdr">
                  <div>
                    <div className="section-hdr-t">Thuật ngữ &amp; Viết tắt</div>
                    <div className="section-hdr-s">
                      Giải thích các ký hiệu và thuật ngữ chuyên ngành trong quy trình Trích nợ tự động
                    </div>
                  </div>
                </div>
                <div className="term-tbl-wrap">
                  <table className="term-table">
                    <thead>
                      <tr>
                        <th style={{ width: '150px' }}>Viết tắt</th>
                        <th style={{ width: '220px' }}>Thuật ngữ đầy đủ</th>
                        <th>Ghi chú / Định nghĩa</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="ta">Direct Debit</td>
                        <td className="tf">Trích nợ tự động</td>
                        <td className="tn">Giải pháp trích tiền trực tiếp từ tài khoản/thẻ khách hàng định kỳ tự động</td>
                      </tr>
                      <tr>
                        <td className="ta">Mandate</td>
                        <td className="tf">Ủy quyền thanh toán</td>
                        <td className="tn">Sự chấp thuận pháp lý của khách hàng cho phép đơn vị trích tiền tự động</td>
                      </tr>
                      <tr>
                        <td className="ta">Tokenization</td>
                        <td className="tf">Mã hóa thẻ/tài khoản</td>
                        <td className="tn">Sinh ra token đại diện cho thông tin thẻ/tài khoản để bảo mật và sử dụng sau này</td>
                      </tr>
                      <tr>
                        <td className="ta">Recurring</td>
                        <td className="tf">Thanh toán định kỳ</td>
                        <td className="tn">Lặp lại chu kỳ thanh toán tự động không cần OTP của chủ tài khoản</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Services Grid */}
              <div className="db-grid">
                {ONEPAY_SERVICES.filter(s => !searchQuery || s.searchNames.includes(searchQuery.toLowerCase().trim())).map((service) => (
                  <div
                    key={service.id}
                    className="db-card"
                    onClick={() => window.location.hash = `#/onepay/${service.id}`}
                  >
                    <div className="db-card-logo-wrap">
                      {!service.logoUrl ? (
                        <div
                          className="sb-avatar"
                          style={{
                            background: service.fallbackBg || 'var(--primary)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '14px'
                          }}
                        >
                          {service.fallbackText}
                        </div>
                      ) : (
                        <img className="db-card-logo" src={service.logoUrl} alt={service.name} />
                      )}
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
            /* DETAILED VIEW FOR SINGLE SERVICE */
            <div className="detail-view-container onepay-detail-view">
              {selectedServiceId === 'onepay_direct_debit' && (
                <OnepayDirectDebitSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
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
