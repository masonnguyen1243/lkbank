import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/contact.css';
import '../styles/faqs.css';

interface ContactDetailsProps {
  onNavigateHome: () => void;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({ onNavigateHome }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolledPercent, setScrolledPercent] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Monitor page scroll to update progress bar
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

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    });
  };

  return (
    <div className="contact-layout">
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrolledPercent}%` }}
      ></div>

      {/* Header */}
      <header className="contact-hdr">
        <div className="contact-hdr-left">
          <button
            className="contact-back-btn"
            onClick={onNavigateHome}
            aria-label="Quay lại trang chủ"
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
          <div>
            <span className="contact-hdr-title">Thông tin liên hệ</span>
            <span className="contact-hdr-subtitle">— Nhân sự Sales &amp; Vận hành</span>
          </div>
        </div>

        <button
          className="theme-toggle-btn"
          style={{ position: 'static', boxShadow: 'none' }}
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
      <section className="faq-hero-section" style={{ marginTop: 'var(--sh)' }}>
        <div className="faq-hero-overlay"></div>
        <div className="faq-hero-inner">
          <h1>Đầu mối liên hệ HENO &amp; Tingee</h1>
          <p className="faq-hero-subtitle" style={{ marginBottom: 0 }}>
            Hệ thống danh bạ liên hệ hỗ trợ tích hợp dịch vụ, giải đáp vận hành và đầu mối kinh doanh của Tingee.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="contact-main" style={{ marginTop: 0 }}>
        <div className="contact-container">

          {/* Grid layout containing two support categories */}
          <div className="contact-service-grid">

            {/* GROUP 1: Speaker details */}
            <div>
              <h2 className="contact-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 11 18-5v12L3 14v-3z"></path>
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                </svg>
                Dịch vụ Loa thông báo (TingeeBox)
              </h2>

              <div className="contact-service-card">

                {/* Customer Support Center */}
                <div className="support-center-box">
                  <div className="qr-code-wrapper" style={{ padding: '4px' }}>
                    <img
                      className="qr-code-img"
                      src="/logo/zalo-oa-qr.png"
                      alt="Zalo OA QR Code"
                      style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                    />
                  </div>

                  <div className="support-details-list">
                    {/* Zalo OA */}
                    <div className="support-item">
                      <div className="support-item-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                      </div>
                      <div className="support-item-content">
                        <span className="support-item-label">Zalo OA</span>
                        <div className="support-item-value">
                          <span>TINGEE by HENO</span>
                          <button
                            className="copy-button"
                            onClick={() => handleCopy('TINGEE by HENO', 'zalo')}
                            title="Copy Zalo OA Name"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <span className={`copy-tooltip ${copiedId === 'zalo' ? 'show' : ''}`}>Đã copy!</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Hotline */}
                    <div className="support-item">
                      <div className="support-item-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div className="support-item-content">
                        <span className="support-item-label">Hotline</span>
                        <div className="support-item-value">
                          <span>1900.255.567</span>
                          <button
                            className="copy-button"
                            onClick={() => handleCopy('1900255567', 'hotline')}
                            title="Copy Hotline"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <span className={`copy-tooltip ${copiedId === 'hotline' ? 'show' : ''}`}>Đã copy!</span>
                          </button>
                        </div>
                        <span className="support-item-desc">Phím số 1 để hỗ trợ TingeeBox</span>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="support-item">
                      <div className="support-item-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <div className="support-item-content">
                        <span className="support-item-label">Email hỗ trợ</span>
                        <div className="support-item-value" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            hotro@heno.vn
                            <button
                              className="copy-button"
                              onClick={() => handleCopy('hotro@heno.vn', 'email1')}
                              title="Copy Email"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                              <span className={`copy-tooltip ${copiedId === 'email1' ? 'show' : ''}`}>Đã copy!</span>
                            </button>
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            doanhnghiep@heno.vn
                            <button
                              className="copy-button"
                              onClick={() => handleCopy('doanhnghiep@heno.vn', 'email2')}
                              title="Copy Email"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                              <span className={`copy-tooltip ${copiedId === 'email2' ? 'show' : ''}`}>Đã copy!</span>
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Region sales heads */}
                <h3 className="regional-sales-title">Đầu mối kinh doanh theo khu vực</h3>
                <div className="regional-grid">
                  {/* Northern */}
                  <div className="region-card north">
                    <span className="region-name">Miền Bắc</span>
                    <div className="region-contact-name">Như Quỳnh (Ms.)</div>
                    <div className="region-phone">
                      <span>096.362.1905</span>
                      <button
                        className="copy-button"
                        onClick={() => handleCopy('0963621905', 'north-phone')}
                        title="Copy Phone"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span className={`copy-tooltip ${copiedId === 'north-phone' ? 'show' : ''}`}>Đã copy!</span>
                      </button>
                    </div>
                  </div>

                  {/* Central */}
                  <div className="region-card central">
                    <span className="region-name">Miền Trung</span>
                    <div className="region-contact-name">Quỳnh Hương (Ms.)</div>
                    <div className="region-phone">
                      <span>086.936.4418</span>
                      <button
                        className="copy-button"
                        onClick={() => handleCopy('0869364418', 'central-phone')}
                        title="Copy Phone"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span className={`copy-tooltip ${copiedId === 'central-phone' ? 'show' : ''}`}>Đã copy!</span>
                      </button>
                    </div>
                  </div>

                  {/* Southern */}
                  <div className="region-card south">
                    <span className="region-name">Miền Nam</span>
                    <div className="region-contact-name">Lan Nhi (Ms.)</div>
                    <div className="region-phone">
                      <span>096.358.8914</span>
                      <button
                        className="copy-button"
                        onClick={() => handleCopy('0963588914', 'south-phone')}
                        title="Copy Phone"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span className={`copy-tooltip ${copiedId === 'south-phone' ? 'show' : ''}`}>Đã copy!</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* General Manager */}
                <div className="gm-card">
                  <div className="gm-info">
                    <div className="gm-avatar">ĐH</div>
                    <div className="gm-details">
                      <h4>Quản lý chung</h4>
                      <div className="gm-name">Mr. Đức Hạnh</div>
                    </div>
                  </div>
                  <div className="gm-contacts">
                    <div className="gm-contact-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--contact-primary)' }}>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>033.930.0802</span>
                      <button
                        className="copy-button"
                        onClick={() => handleCopy('0339300802', 'gm-phone')}
                        title="Copy Phone"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span className={`copy-tooltip ${copiedId === 'gm-phone' ? 'show' : ''}`}>Đã copy!</span>
                      </button>
                    </div>

                    <div className="gm-contact-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--contact-primary)' }}>
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>hanhvd@heno.vn</span>
                      <button
                        className="copy-button"
                        onClick={() => handleCopy('hanhvd@heno.vn', 'gm-email')}
                        title="Copy Email"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span className={`copy-tooltip ${copiedId === 'gm-email' ? 'show' : ''}`}>Đã copy!</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* GROUP 2: Open API (Pay by Bank) details */}
            <div>
              <h2 className="contact-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                Dịch vụ Open API (Pay by Bank)
              </h2>

              <div className="contact-service-card">
                {/* Email container */}
                <div className="support-center-box" style={{ gridTemplateColumns: '1fr' }}>
                  <div className="support-details-list" style={{ width: '100%' }}>
                    <div className="support-item">
                      <div className="support-item-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <div className="support-item-content">
                        <span className="support-item-label">Email liên hệ</span>
                        <div className="support-item-value">
                          <span>openapi@heno.vn</span>
                          <button
                            className="copy-button"
                            onClick={() => handleCopy('openapi@heno.vn', 'api-email')}
                            title="Copy Email"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <span className={`copy-tooltip ${copiedId === 'api-email' ? 'show' : ''}`}>Đã copy!</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operations & Tech heads */}
                <h3 className="regional-sales-title" style={{ marginTop: '20px' }}>Đầu mối hỗ trợ kinh doanh</h3>
                <div className="regional-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>

                  {/* Nguyễn Duy Đạt */}
                  <div className="region-card north">
                    <div className="region-contact-name">Nguyễn Duy Đạt</div>
                    <div className="region-phone">
                      <span>093.166.1035</span>
                      <button
                        className="copy-button"
                        onClick={() => handleCopy('0931661035', 'dat-phone')}
                        title="Copy Phone"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span className={`copy-tooltip ${copiedId === 'dat-phone' ? 'show' : ''}`}>Đã copy!</span>
                      </button>
                    </div>
                  </div>

                  {/* Lê Khánh Huyền */}
                  <div className="region-card central">
                    <div className="region-contact-name">Lê Khánh Huyền</div>
                    <div className="region-phone">
                      <span>086.861.6765</span>
                      <button
                        className="copy-button"
                        onClick={() => handleCopy('0868616765', 'huyen-phone')}
                        title="Copy Phone"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span className={`copy-tooltip ${copiedId === 'huyen-phone' ? 'show' : ''}`}>Đã copy!</span>
                      </button>
                    </div>
                  </div>

                  {/* VŨ HOÀNG MY */}
                  <div className="region-card south">
                    <div className="region-contact-name">Vũ Hoàng My</div>
                    <div className="region-phone">
                      <span>086.760.4772</span>
                      <button
                        className="copy-button"
                        onClick={() => handleCopy('0867604772', 'my-phone')}
                        title="Copy Phone"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span className={`copy-tooltip ${copiedId === 'my-phone' ? 'show' : ''}`}>Đã copy!</span>
                      </button>
                    </div>
                  </div>

                </div>

                {/* General Manager card */}
                <div className="gm-card" style={{ marginTop: '16px' }}>
                  <div className="gm-info">
                    <div className="gm-avatar" style={{ background: 'var(--primary)', color: '#fff' }}>TA</div>
                    <div className="gm-details">
                      <h4>Quản lý chung</h4>
                      <div className="gm-name">Mr. Trần Tiến Anh</div>
                    </div>
                  </div>
                  <div className="gm-contacts">
                    <div className="gm-contact-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--contact-primary)' }}>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>096.503.5659</span>
                      <button
                        className="copy-button"
                        onClick={() => handleCopy('0965035659', 'api-gm-phone')}
                        title="Copy Phone"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span className={`copy-tooltip ${copiedId === 'api-gm-phone' ? 'show' : ''}`}>Đã copy!</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
