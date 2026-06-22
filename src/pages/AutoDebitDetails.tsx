import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { AutoDebitSidebar, AutoDebitServiceInfo } from '../components/autodebit/AutoDebitSidebar';
import { PDFModal } from '../components/ui/PDFModal';
import { useScrollSpy } from '../hooks/useScrollSpy';
import '../styles/bank.css';

interface AutoDebitDetailsProps {
  onNavigateHome: () => void;
}

// Danh sách các dịch vụ trích nợ tự động trống (sẽ bổ sung sau)
const AUTODEBIT_SERVICES: AutoDebitServiceInfo[] = [];

export const AutoDebitDetails: React.FC<AutoDebitDetailsProps> = ({ onNavigateHome }) => {
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
    AUTODEBIT_SERVICES.forEach((s) => ids.push(s.id));
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
            <div className="hdr-t">Quy Trình Trích Nợ Tự Động</div>
          </div>
          <span className="hdr-s">— Hướng dẫn đăng ký &amp; vận hành</span>
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
      <AutoDebitSidebar
        activeId={activeId}
        onLinkClick={handleLinkClick}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        services={AUTODEBIT_SERVICES}
      />

      {/* MAIN CONTENT */}
      <main className="main">
        {/* INTRO */}
        <div className="section-card" id="intro">
          <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>
                Quy trình Trích nợ tự động (Auto-debit / Direct Debit)
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--tx2)', maxWidth: '640px' }}>
                Tài liệu hướng dẫn đăng ký liên kết ủy quyền trích nợ tự động giữa khách hàng và Tingee, cho phép thu phí tự động định kỳ nhanh chóng qua kết nối API trực tiếp từ hệ thống.
              </p>
              <div className="intro-stats">
                <div className="stat">
                  <div className="stat-n">0</div>
                  <div className="stat-l">Dịch vụ hiện tại</div>
                </div>
                <div className="stat">
                  <div className="stat-n">Tokenization</div>
                  <div className="stat-l">Phương thức bảo mật</div>
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
                Giải thích các khái niệm trong quy trình Trích nợ tự động
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
                  <td className="ta">Direct Debit</td>
                  <td className="tf">Trích nợ tự động</td>
                  <td className="tn">Dịch vụ tự động trừ tiền từ tài khoản của khách hàng khi đến kỳ thanh toán sau khi đã có ủy quyền</td>
                </tr>
                <tr>
                  <td className="ta">Mandate</td>
                  <td className="tf">Ủy quyền trích nợ tự động</td>
                  <td className="tn">Văn bản hoặc xác nhận số thỏa thuận cho phép trích nợ tài khoản được ngân hàng phê duyệt</td>
                </tr>
                <tr>
                  <td className="ta">Tokenization</td>
                  <td className="tf">Mã hóa thông tin tài khoản</td>
                  <td className="tn">Quy trình thay thế số tài khoản bằng token an toàn để gọi giao dịch trích nợ tự động sau này</td>
                </tr>
                <tr>
                  <td className="ta">Recurring</td>
                  <td className="tf">Thanh toán định kỳ</td>
                  <td className="tn">Giao dịch được lập lịch thực hiện tự động vào mỗi chu kỳ (hàng tuần, hàng tháng, v.v.)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SKELETON / PLACEHOLDER FOR SERVICES */}
        <div className="section-card" style={{ padding: '40px 24px', textAlign: 'center', borderStyle: 'dashed', borderWidth: '2px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'var(--primary-light)',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: 'var(--primary)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px', color: 'var(--tx)' }}>
            Danh sách quy trình Trích nợ tự động trống
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--tx2)', maxWidth: '440px', margin: '0 auto', lineHeight: '1.5' }}>
            Nội dung chi tiết của các quy trình trích nợ tự động ngân hàng sẽ được cập nhật tại đây khi có thông tin thực tế.
          </p>
        </div>

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
