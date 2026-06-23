import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sidebar } from './Sidebar';
import { PDFModal } from './PDFModal';
import { useScrollSpy } from '../hooks/useScrollSpy';
import {
  VTBSection,
  BIDVSection,
  OCBSection,
  MBBankSection,
  ACBSection,
} from './banks/Banks1to5';
import {
  VCBSection,
  VPBankSection,
  SacombankSection,
  VIBSection,
  PGBankSection,
} from './banks/Banks6to10';
import {
  ShinhanSection,
  CoopSection,
  MSBSection,
  TPBankSection,
} from './banks/Banks11to14';
import '../styles/bank.css';

interface BankDetailsProps {
  onNavigateHome: () => void;
}

export const BankDetails: React.FC<BankDetailsProps> = ({ onNavigateHome }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolledPercent, setScrolledPercent] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [brandLogoError, setBrandLogoError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [pdfModalState, setPdfModalState] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  const watchedIds = useMemo(() => [
    'intro',
    'terminology',
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

  const activeId = useScrollSpy(watchedIds, 56 + 24);
  const isInitialScrollActive = React.useRef(
    /^#\/bank\/([^/]+)$/.test(window.location.hash)
  );

  useEffect(() => {
    const handleScroll = () => {
      // Scroll Progress Bar
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrolledPercent(scrolled);

      // Back to top button visibility
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger scroll layout sync on mount
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

  const handleLinkClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const HEADER_H = 56;
      const offsetTop = el.offsetTop - HEADER_H;
      window.scrollTo({
        top: offsetTop >= 0 ? offsetTop : 0,
        behavior: 'smooth',
      });
    }
  };

  // Sync active section to URL hash using replaceState (to avoid history bloating)
  useEffect(() => {
    if (isInitialScrollActive.current) {
      return;
    }
    if (activeId) {
      const path = activeId === 'intro' ? '#/bank' : `#/bank/${activeId}`;
      if (window.location.hash !== path) {
        window.history.replaceState(null, '', path);
      }
    }
  }, [activeId]);

  // Handle deep-linking on mount and hash changes with layout shift resilience
  useEffect(() => {
    let scrollAttempts = 0;
    const maxAttempts = 6;

    const handleHashScroll = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#\/bank\/([^/]+)$/);
      if (match) {
        const bankId = match[1];
        if (watchedIds.includes(bankId)) {
          isInitialScrollActive.current = true; // Lock scroll spy sync
          const el = document.getElementById(bankId);
          if (el) {
            handleLinkClick(bankId);
            
            // Retry a few times to counteract layout shifts as images load
            if (scrollAttempts < maxAttempts) {
              scrollAttempts++;
              setTimeout(handleHashScroll, 200 * scrollAttempts);
            } else {
              isInitialScrollActive.current = false; // Unlock when finished
            }
          } else {
            // Retry if element is not in DOM yet
            if (scrollAttempts < maxAttempts) {
              scrollAttempts++;
              setTimeout(handleHashScroll, 100);
            } else {
              isInitialScrollActive.current = false;
            }
          }
        } else {
          isInitialScrollActive.current = false;
        }
      } else {
        isInitialScrollActive.current = false;
      }
    };

    // Run once on mount
    const timer = setTimeout(handleHashScroll, 100);

    window.addEventListener('hashchange', handleHashScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, [watchedIds]);

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
    <div className="bank-layout">
      {/* SCROLL PROGRESS BAR */}
      <div
        className="scroll-progress"
        id="scrollProgress"
        style={{ width: `${scrolledPercent}%` }}
      ></div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div
          className="sb-overlay open"
          id="sbOverlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* MOBILE HAMBURGER BUTTON */}
      <button
        className="mob-menu-btn"
        id="mobMenuBtn"
        aria-label="Mở menu"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* HEADER LEFT (Brand) */}
      <div className="hdr-left">
        {!brandLogoError ? (
          <img
            className="hdr-logo-img"
            src="https://developers.tingee.vn/img/logo_heno.png"
            alt="HENO"
            onError={() => setBrandLogoError(true)}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              background: '#f1416c',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--tx1)',
              letterSpacing: '-0.5px',
            }}>HENO</span>
          </div>
        )}
      </div>

      <header className="hdr">
        <button
          className="hdr-back-btn"
          onClick={onNavigateHome}
          aria-label="Quay lại trang chủ"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1 }}>
          <div>
            <div className="hdr-t">Quy Trình Liên Kết Ngân Hàng</div>
          </div>
          <span className="hdr-s">— 14 ngân hàng</span>
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

      {/* SIDEBAR */}
      <Sidebar
        activeId={activeId}
        onLinkClick={handleLinkClick}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* MAIN CONTENT */}
      <main className="main">
        {/* INTRO */}
        <div className="section-card" id="intro">
          <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>
                Quy Trình Liên Kết Ngân Hàng
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

        {/* TERMINOLOGY */}
        <div className="section-card" id="terminology" style={{ scrollMarginTop: 'calc(var(--sh) + 16px)' }}>
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

        {/* 14 BANKS LIST */}
        <VTBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
        <BIDVSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
        <OCBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
        <MBBankSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
        <ACBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />

        <VCBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
        <VPBankSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
        <SacombankSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
        <VIBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
        <PGBankSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />

        <ShinhanSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
        <CoopSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
        <MSBSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />
        <TPBankSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />

        {/* FOOTER */}
        <div className="footer">
          © 2026 Công ty CP Công Nghệ HENO &nbsp;·&nbsp;
          <a href="https://tingee.vn" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>tingee.vn</a>
          &nbsp;·&nbsp; 1900 255 567
        </div>
      </main>

      {/* BACK TO TOP BUTTON */}
      <button
        className={`back-btn ${showBackToTop ? 'visible' : ''}`}
        id="backBtn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Lên đầu trang
      </button>

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
