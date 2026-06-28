import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BankSidebar, BANKS_LIST } from '../components/bank/BankSidebar';
import { PDFModal } from '../components/ui/PDFModal';
import {
  VTBSection,
  BIDVSection,
  OCBSection,
  MBBankSection,
  ACBSection,
} from '../components/bank/banks/Banks1to5';
import {
  VCBSection,
  VPBankSection,
  SacombankSection,
  VIBSection,
  PGBankSection,
} from '../components/bank/banks/Banks6to10';
import {
  ShinhanSection,
  CoopSection,
  MSBSection,
  TPBankSection,
} from '../components/bank/banks/Banks11to14';
import '../styles/bank.css';
import '../styles/faqs.css';

interface BankDetailsProps {
  onNavigateHome: () => void;
}

export const BankDetails: React.FC<BankDetailsProps> = ({ onNavigateHome }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolledPercent, setScrolledPercent] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);

  const [pdfModalState, setPdfModalState] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  const watchedIds = useMemo(() => [
    'vtb',
    'bidv',
    'ocb',
    'mbbank',
    'acb',
    'vcb',
    'vpbank',
    'sacombank',
    'vib',
    'pgbank',
    'shinhan',
    'coopbank',
    'msb',
    'tpbank',
  ], []);

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

  // Sync mobile layout resize
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
      const match = hash.match(/^#\/bank\/([^/]+)$/);
      if (match) {
        const bankId = match[1];
        if (watchedIds.includes(bankId)) {
          setSelectedBankId(bankId);
          window.scrollTo({ top: 0 });
        } else {
          setSelectedBankId(null);
        }
      } else {
        setSelectedBankId(null);
      }
    };

    handleHashScroll(); // Run once on mount
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [watchedIds]);

  const handleLinkClick = (id: string) => {
    if (id === 'intro' || id === 'terminology') {
      window.location.hash = '#/bank';
      setSelectedBankId(null);
    } else {
      window.location.hash = `#\/bank\/${id}`;
      setSelectedBankId(id);
    }
    setIsSidebarOpen(false);
  };

  const handleViewPDF = (url: string, title: string) => {
    setPdfModalState({
      isOpen: true,
      url,
      title,
    });
  };

  const handleClosePDF = () => {
    setPdfModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className={`bank-layout ${selectedBankId ? 'sb-active-view' : ''}`}>
      {/* SCROLL PROGRESS BAR */}
      <div
        className="scroll-progress"
        id="scrollProgress"
        style={{ width: `${scrolledPercent}%` }}
      ></div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {selectedBankId && isSidebarOpen && (
        <div
          className="sb-overlay open"
          id="sbOverlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* MOBILE HAMBURGER BUTTON */}
      {selectedBankId && (
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
              {selectedBankId
                ? `Liên kết ${BANKS_LIST.find((b) => b.id === selectedBankId)?.name}`
                : 'Quy Trình Liên Kết Ngân Hàng'}
            </div>
          </div>
          <span className="hdr-s">
            {selectedBankId
              ? `— Hướng dẫn chi tiết`
              : '— 14 ngân hàng'}
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
      {!selectedBankId && (
        <section className="faq-hero-section" style={{ marginTop: 'var(--sh)' }}>
          <div className="faq-hero-overlay"></div>
          <div className="faq-hero-inner">
            <h1>Quy Trình Liên Kết Ngân Hàng</h1>
            <p className="faq-hero-subtitle">
              Chọn ngân hàng của bạn bên dưới để xem hướng dẫn tích hợp chi tiết, biểu mẫu đăng ký và các tài liệu liên quan.
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
                  placeholder="Tìm kiếm ngân hàng liên kết..."
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

      <div className="main-layout-container" style={{ marginTop: selectedBankId ? 'var(--sh)' : 0 }}>
        {/* SIDEBAR (only if selectedBankId is active) */}
        {selectedBankId && (
          <BankSidebar
            activeId={selectedBankId}
            onLinkClick={handleLinkClick}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* DETAILS/DASHBOARD CONTENT PANE */}
        <div className="detail-pane">
          {!selectedBankId ? (
            /* OVERVIEW DASHBOARD */
            <div className="overview-dashboard" style={{ marginTop: '30px' }}>

              {/* TỔNG QUAN & THUẬT NGỮ */}
              <div className="section-card" id="intro" style={{ marginBottom: '24px' }}>
                <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>
                      Tổng quan Quy trình Liên kết
                    </h1>
                    <p style={{ fontSize: '13px', color: 'var(--tx2)', maxWidth: '560px' }}>
                      Hướng dẫn chi tiết quy trình liên kết tài khoản ngân hàng với hệ thống Tingee dành cho đội ngũ HENO và khách hàng.
                    </p>
                    <div className="intro-stats">
                      <div className="stat">
                        <div className="stat-n">14</div>
                        <div className="stat-l">Ngân hàng</div>
                      </div>
                      <div className="stat">
                        <div className="stat-n">3</div>
                        <div className="stat-l">Loại TK</div>
                      </div>
                      <div className="stat">
                        <div className="stat-n">CN + HKD + DN</div>
                        <div className="stat-l">Cá nhân · HKD · Doanh nghiệp</div>
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
                      Giải thích các ký hiệu dùng trong tài liệu
                    </div>
                  </div>
                </div>
                <div className="term-tbl-wrap">
                  <table className="term-table">
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>Viết tắt</th>
                        <th style={{ width: '190px' }}>Thuật ngữ đầy đủ</th>
                        <th>Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="ta">VA</td>
                        <td className="tf">Tài khoản định danh</td>
                        <td className="tn">Sử dụng STK hoặc QR tạo từ hệ thống Tingee</td>
                      </tr>
                      <tr>
                        <td className="ta">TKDN</td>
                        <td className="tf">Tài khoản Doanh nghiệp</td>
                        <td className="tn">—</td>
                      </tr>
                      <tr>
                        <td className="ta">TKCN</td>
                        <td className="tf">Tài khoản Cá nhân</td>
                        <td className="tn">—</td>
                      </tr>
                      <tr>
                        <td className="ta">HKD</td>
                        <td className="tf">Hộ kinh doanh</td>
                        <td className="tn">—</td>
                      </tr>
                      <tr>
                        <td className="ta">CBB</td>
                        <td className="tf">Cán bộ bán</td>
                        <td className="tn">Nhân viên ngân hàng phụ trách</td>
                      </tr>
                      <tr>
                        <td className="ta">KH</td>
                        <td className="tf">Khách hàng</td>
                        <td className="tn">—</td>
                      </tr>
                      <tr>
                        <td className="ta">STK</td>
                        <td className="tf">Số tài khoản</td>
                        <td className="tn">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Grid of 14 Banks */}
              <div className="db-grid">
                {BANKS_LIST.filter(b => !searchQuery || b.searchNames.includes(searchQuery.toLowerCase().trim())).map((bank) => (
                  <div
                    key={bank.id}
                    className="db-card"
                    onClick={() => window.location.hash = `#/bank/${bank.id}`}
                  >
                    <div className="db-card-logo-wrap">
                      <img className="db-card-logo" src={bank.logoUrl} alt={bank.name} />
                    </div>
                    <h3>{bank.name}</h3>
                    <p>{bank.fullName}</p>
                    <div className="db-card-btn">
                      Xem hướng dẫn
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* DETAILED VIEW FOR SINGLE BANK */
            <div className="detail-view-container">
              {/* Render only the selected bank */}
              {selectedBankId === 'vtb' && <VTBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'bidv' && <BIDVSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'ocb' && <OCBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'mbbank' && <MBBankSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'acb' && <ACBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'vcb' && <VCBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'vpbank' && <VPBankSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'sacombank' && <SacombankSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'vib' && <VIBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'pgbank' && <PGBankSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'shinhan' && <ShinhanSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'coopbank' && <CoopSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'msb' && <MSBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
              {selectedBankId === 'tpbank' && <TPBankSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />}
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
