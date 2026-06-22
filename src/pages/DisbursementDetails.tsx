import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { DisbursementSidebar, DisbursementServiceInfo } from '../components/disbursement/DisbursementSidebar';
import { PDFModal } from '../components/ui/PDFModal';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { BIDVDisbursementSection } from '../components/disbursement/DisbursementSections';
import '../styles/bank.css';

interface DisbursementDetailsProps {
  onNavigateHome: () => void;
}

// Danh sách các dịch vụ chi hộ của hệ thống
const DISBURSEMENT_SERVICES: DisbursementServiceInfo[] = [
  {
    id: 'bidv_payout',
    name: 'Chi hộ BIDV',
    fullName: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam · BIDV Direct Link',
    logoUrl: 'https://api.vietqr.io/img/BIDV.png',
    fallbackText: 'BIDV',
    searchNames: 'bidv chi ho payout direct link maker checker heno erp',
    fallbackBg: '#006B68',
  }
];

export const DisbursementDetails: React.FC<DisbursementDetailsProps> = ({ onNavigateHome }) => {
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

  const watchedIds = useMemo(() => {
    const ids = ['intro', 'terminology'];
    DISBURSEMENT_SERVICES.forEach((s) => ids.push(s.id));
    return ids;
  }, []);

  const activeId = useScrollSpy(watchedIds, 56 + 24);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrolledPercent(scrolled);

      setShowBackToTop(window.scrollY > 300);
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
            <div className="hdr-t">Quy Trình Dịch Vụ Chi Hộ</div>
          </div>
          <span className="hdr-s">— Hướng dẫn tích hợp &amp; vận hành</span>
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
      <DisbursementSidebar
        activeId={activeId}
        onLinkClick={handleLinkClick}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        services={DISBURSEMENT_SERVICES}
      />

      {/* MAIN CONTENT */}
      <main className="main">
        {/* INTRO */}
        <div className="section-card" id="intro">
          <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>
                Tổng quan Quy trình Dịch vụ Chi hộ
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--tx2)', maxWidth: '640px' }}>
                Hướng dẫn tích hợp kỹ thuật (API/Webhook) và quy trình vận hành dịch vụ Chi hộ (Disbursement) từ hệ thống cổng thanh toán Tingee dành cho doanh nghiệp và đối tác liên kết.
              </p>
              <div className="intro-stats">
                <div className="stat">
                  <div className="stat-n">1</div>
                  <div className="stat-l">Dịch vụ hiện tại</div>
                </div>
                <div className="stat">
                  <div className="stat-n">API / ERP</div>
                  <div className="stat-l">Phương thức kết nối</div>
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
                  <td className="ta">Disbursement</td>
                  <td className="tf">Dịch vụ Chi hộ</td>
                  <td className="tn">Quy trình Tingee chuyển tiền từ tài khoản nguồn sang tài khoản đích theo yêu cầu của đối tác</td>
                </tr>
                <tr>
                  <td className="ta">Merchant</td>
                  <td className="tf">Đơn vị chấp nhận thanh toán</td>
                  <td className="tn">Doanh nghiệp sử dụng dịch vụ chi hộ của Tingee</td>
                </tr>
                <tr>
                  <td className="ta">API Key</td>
                  <td className="tf">Khóa tích hợp cổng kết nối</td>
                  <td className="tn">Chuỗi ký tự dùng để xác thực các yêu cầu gọi API chuyển khoản từ hệ thống Merchant</td>
                </tr>
                <tr>
                  <td className="ta">IPN</td>
                  <td className="tf">Instant Payment Notification</td>
                  <td className="tn">Cơ chế webhook gửi thông báo trạng thái giao dịch chi hộ tự động từ Tingee sang Merchant</td>
                </tr>
                <tr>
                  <td className="ta">Reconciliation</td>
                  <td className="tf">Đối soát giao dịch</td>
                  <td className="tn">Quy trình so khớp dữ liệu giao dịch chi hộ định kỳ giữa Tingee và Merchant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* BIDV PAYOUT SERVICE */}
        <BIDVDisbursementSection onViewPDF={handleViewPDF} searchQuery={searchQuery} />

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
