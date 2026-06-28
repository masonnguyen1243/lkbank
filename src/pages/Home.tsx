import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/home.css';

interface HomeProps {
  onNavigateToBank: () => void;
  onNavigateToDisbursement: () => void;
  onNavigateToAutoDebit: () => void;
  onNavigateToWallet: () => void;
  onNavigateToFaqs: () => void;
  onNavigateToContact: () => void;
}

interface SearchItem {
  id: string;
  category: 'ops' | 'dev' | 'faq';
  categoryLabel: string;
  title: string;
  desc: string;
  route: string;
}

const SEARCH_DATABASE: SearchItem[] = [
  // --- Banks ---
  { id: 'vtb', category: 'ops', categoryLabel: 'Ngân hàng', title: 'Vietinbank (VTB) Guideline', desc: 'Quy trình kết nối, biểu mẫu liên kết tài khoản Vietinbank.', route: '#/bank/vtb' },
  { id: 'bidv', category: 'ops', categoryLabel: 'Ngân hàng', title: 'BIDV Guideline', desc: 'Hướng dẫn kết nối tài khoản BIDV trực tuyến và qua biểu mẫu.', route: '#/bank/bidv' },
  { id: 'ocb', category: 'ops', categoryLabel: 'Ngân hàng', title: 'OCB Guideline', desc: 'Quy trình kết nối ví/tài khoản OCB cá nhân, doanh nghiệp.', route: '#/bank/ocb' },
  { id: 'mbbank', category: 'ops', categoryLabel: 'Ngân hàng', title: 'MB Bank Guideline', desc: 'Đăng ký liên kết tài khoản quân đội MB Bank cá nhân & HKD.', route: '#/bank/mbbank' },
  { id: 'acb', category: 'ops', categoryLabel: 'Ngân hàng', title: 'ACB Guideline', desc: 'Tài liệu hướng dẫn liên kết ngân hàng Á Châu ACB.', route: '#/bank/acb' },
  { id: 'vcb', category: 'ops', categoryLabel: 'Ngân hàng', title: 'Vietcombank (VCB) Guideline', desc: 'Liên kết VCB Digibank trực tiếp và biểu mẫu giấy cho Doanh nghiệp.', route: '#/bank/vcb' },
  { id: 'vpbank', category: 'ops', categoryLabel: 'Ngân hàng', title: 'VPBank Guideline', desc: 'Liên kết ngân hàng Việt Nam Thịnh Vượng VPBank.', route: '#/bank/vpbank' },
  { id: 'sacombank', category: 'ops', categoryLabel: 'Ngân hàng', title: 'Sacombank Guideline', desc: 'Hướng dẫn liên kết tài khoản ngân hàng Sài Gòn Thương Tín.', route: '#/bank/sacombank' },
  { id: 'vib', category: 'ops', categoryLabel: 'Ngân hàng', title: 'VIB Guideline', desc: 'Quy trình kết nối tài khoản VIB nhanh chóng.', route: '#/bank/vib' },
  { id: 'pgbank', category: 'ops', categoryLabel: 'Ngân hàng', title: 'PGBank Guideline', desc: 'Liên kết tài khoản ngân hàng Xăng Dầu Petrolimex PGB.', route: '#/bank/pgbank' },
  { id: 'shinhan', category: 'ops', categoryLabel: 'Ngân hàng', title: 'ShinhanBank Guideline', desc: 'Quy trình liên kết tài khoản ngân hàng Hàn Quốc Shinhan.', route: '#/bank/shinhan' },
  { id: 'coopbank', category: 'ops', categoryLabel: 'Ngân hàng', title: 'Co-op Bank Guideline', desc: 'Quy trình đăng ký ngân hàng Hợp tác xã Việt Nam.', route: '#/bank/coopbank' },
  { id: 'msb', category: 'ops', categoryLabel: 'Ngân hàng', title: 'MSB Guideline', desc: 'Hướng dẫn kết nối ngân hàng Hàng Hải MSB.', route: '#/bank/msb' },
  { id: 'tpbank', category: 'ops', categoryLabel: 'Ngân hàng', title: 'TPBank Guideline', desc: 'Quy trình kết nối ngân hàng Tiên Phong TPBank.', route: '#/bank/tpbank' },

  // --- Payout & Services ---
  { id: 'payout-bidv', category: 'dev', categoryLabel: 'Chi hộ', title: 'Tính năng Chi hộ BIDV (Direct Link)', desc: 'Tích hợp API chi hộ tự động và đối soát giao dịch với đối tác BIDV.', route: '#/payout' },
  { id: 'payout-baokim', category: 'dev', categoryLabel: 'Chi hộ', title: 'Tính năng Chi hộ Bao Kim (Ví điện tử)', desc: 'Tích hợp ví liên kết & đồng bộ tham số ví Bao Kim Payout.', route: '#/payout' },
  { id: 'autodebit', category: 'dev', categoryLabel: 'Trích nợ', title: 'Trích nợ tự động OnePay (Direct Debit)', desc: 'Hướng dẫn tích hợp cổng OnePay trích nợ tự động định kỳ.', route: '#/onepay' },
  { id: 'payoo', category: 'dev', categoryLabel: 'Thanh toán', title: 'Cổng thẻ & Thiết bị SmartPOS Payoo', desc: 'Quy trình tích hợp thanh toán thẻ, Payment Link và thiết bị SmartPOS.', route: '#/payoo' },

  // --- FAQs ---
  { id: 'faq-1', category: 'faq', categoryLabel: 'FAQs', title: 'Lấy Client ID & Secret Token tích hợp?', desc: 'Tra cứu thông tin Client ID & Secret Token từ tài khoản app.tingee.vn.', route: '#/faqs/faq-1' },
  { id: 'faq-2', category: 'faq', categoryLabel: 'FAQs', title: 'Cấu hình Webhook (IPN) nhận thông báo?', desc: 'Cách cài đặt URL webhook nhận kết quả thanh toán tức thời từ Tingee.', route: '#/faqs/faq-2' },
  { id: 'faq-3', category: 'faq', categoryLabel: 'FAQs', title: 'Xác thực chữ ký x-signature Webhook?', desc: 'Hướng dẫn verify chữ ký HMAC_SHA512 đảm bảo bảo mật IPN webhook.', route: '#/faqs/faq-3' },
  { id: 'faq-5', category: 'faq', categoryLabel: 'FAQs', title: 'Tingee hỗ trợ những ngân hàng nào?', desc: 'Danh sách 14 ngân hàng hỗ trợ liên kết với hệ thống thu hộ.', route: '#/faqs/faq-5' },
  { id: 'faq-7', category: 'faq', categoryLabel: 'FAQs', title: 'Làm thế nào liên kết ngân hàng?', desc: 'Quy trình đăng ký liên kết ngân hàng cho Cá nhân, Hộ kinh doanh & Doanh nghiệp.', route: '#/faqs/faq-7' },
  { id: 'faq-8', category: 'faq', categoryLabel: 'FAQs', title: 'Tiền thanh toán chuyển thẳng về đâu?', desc: 'Dòng tiền chuyển ngay về tài khoản ngân hàng hiện có mà không giữ qua ví trung gian.', route: '#/faqs/faq-8' },
  { id: 'faq-9', category: 'faq', categoryLabel: 'FAQs', title: 'Lỗi khách chuyển khoản thành công nhưng không nhận Webhook?', desc: 'Xử lý lỗi chậm phản hồi hoặc sai chữ ký webhook của máy chủ đối tác.', route: '#/faqs/faq-9' },
  { id: 'faq-10', category: 'faq', categoryLabel: 'FAQs', title: 'Cơ chế gửi lại Webhook (Retry IPN)?', desc: 'Tingee tự động retry tối đa 5 lần và giải pháp Idempotency tránh trùng lặp.', route: '#/faqs/faq-10' },
  { id: 'faq-13', category: 'faq', categoryLabel: 'FAQs', title: 'Biểu phí dịch vụ cổng thanh toán Tingee?', desc: 'Phí dịch vụ tiêu chuẩn 150đ trên mỗi giao dịch webhook thành công.', route: '#/faqs/faq-13' }
];

export const Home: React.FC<HomeProps> = ({
  onNavigateToBank,
  onNavigateToDisbursement,
  onNavigateToAutoDebit,
  onNavigateToWallet,
  onNavigateToFaqs,
  onNavigateToContact,
}) => {
  const { toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Remove accents for Vietnamese search matching
  const removeAccents = (str: string): string => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .trim();
  };

  // Filter search results
  const filteredResults = React.useMemo(() => {
    if (!searchQuery) return [];
    const query = removeAccents(searchQuery);
    return SEARCH_DATABASE.filter((item) => {
      const matchTitle = removeAccents(item.title).includes(query);
      const matchDesc = removeAccents(item.desc).includes(query);
      const matchCat = removeAccents(item.categoryLabel).includes(query);
      return matchTitle || matchDesc || matchCat;
    });
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(value.length > 0);
  };

  const handleResultClick = (route: string) => {
    window.location.hash = route;
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
    setIsDropdownOpen(true);
  };

  return (
    <div className="home-layout">
      {/* Theme Toggle Button */}
      <button
        className="home-theme-toggle"
        onClick={toggleTheme}
        aria-label="Đổi giao diện"
      >
        <svg
          className="sun-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
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
        <svg
          className="moon-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>

      {/* Hero Section */}
      <header className="home-hero">
        <div className="logo-container">
          <img className="logo" src="https://developers.tingee.vn/img/logo_heno.png" alt="HENO Logo" />
        </div>

        <h1>Cổng Nghiệp Vụ & <span>Tích Hợp API</span></h1>
        <p className="subtitle">
          Giải pháp quản lý luồng thanh toán tức thời, hướng dẫn kết nối ngân hàng thương mại Việt Nam và tích hợp cổng thanh toán kỹ thuật.
        </p>

        {/* Global Search Box */}
        <div className="search-container" ref={dropdownRef}>
          <div className="search-input-wrapper">
            <svg
              className="search-icon-left"
              xmlns="http://www.w3.org/2000/svg"
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
              className="search-input"
              placeholder="Tìm kiếm ngân hàng, dịch vụ chi hộ, hướng dẫn tích hợp..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length > 0 && setIsDropdownOpen(true)}
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => {
                  setSearchQuery('');
                  setIsDropdownOpen(false);
                }}
                aria-label="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {isDropdownOpen && (
            <div className="search-results-dropdown">
              {filteredResults.length > 0 ? (
                <>
                  {/* Categorized rendering: Ngân hàng */}
                  {filteredResults.filter(r => r.category === 'ops').length > 0 && (
                    <div className="search-result-group">
                      <div className="search-group-title">Ngân Hàng Liên Kết</div>
                      {filteredResults.filter(r => r.category === 'ops').map((item) => (
                        <div
                          key={item.id}
                          className="search-item"
                          onClick={() => handleResultClick(item.route)}
                        >
                          <div className="search-item-left">
                            <span className="search-item-title">{item.title}</span>
                            <span className="search-item-desc">{item.desc}</span>
                          </div>
                          <span className="search-item-badge ops">{item.categoryLabel}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Categorized rendering: Chi hộ / Dịch vụ */}
                  {filteredResults.filter(r => r.category === 'dev').length > 0 && (
                    <div className="search-result-group">
                      <div className="search-group-title">Tích Hợp & Dịch Vụ</div>
                      {filteredResults.filter(r => r.category === 'dev').map((item) => (
                        <div
                          key={item.id}
                          className="search-item"
                          onClick={() => handleResultClick(item.route)}
                        >
                          <div className="search-item-left">
                            <span className="search-item-title">{item.title}</span>
                            <span className="search-item-desc">{item.desc}</span>
                          </div>
                          <span className="search-item-badge dev">{item.categoryLabel}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Categorized rendering: FAQs */}
                  {filteredResults.filter(r => r.category === 'faq').length > 0 && (
                    <div className="search-result-group">
                      <div className="search-group-title">Hỏi Đáp FAQs</div>
                      {filteredResults.filter(r => r.category === 'faq').map((item) => (
                        <div
                          key={item.id}
                          className="search-item"
                          onClick={() => handleResultClick(item.route)}
                        >
                          <div className="search-item-left">
                            <span className="search-item-title">{item.title}</span>
                            <span className="search-item-desc">{item.desc}</span>
                          </div>
                          <span className="search-item-badge faq">{item.categoryLabel}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="search-no-results">
                  <p>Không tìm thấy kết quả phù hợp cho "{searchQuery}"</p>
                  <a 
                    className="search-no-results-btn" 
                    href="https://t.me/tingeesupport" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Hỏi hỗ trợ qua Telegram
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Tags */}
        <div className="quick-tags">
          <span className="quick-tag-label">Tìm nhanh:</span>
          <button className="quick-tag" onClick={() => handleQuickTagClick('Liên kết')}>Quy trình liên kết</button>
          <button className="quick-tag" onClick={() => handleQuickTagClick('Chi hộ')}>Dịch vụ chi hộ</button>
          <button className="quick-tag" onClick={() => handleQuickTagClick('Trích nợ')}>Trích nợ tự động</button>
          <button className="quick-tag" onClick={() => handleQuickTagClick('Thẻ')}>Thanh toán thẻ / POS</button>
          <button className="quick-tag" onClick={() => handleQuickTagClick('Webhook')}>Webhook / IPN</button>
          <button className="quick-tag" onClick={() => handleQuickTagClick('Biểu phí')}>Biểu phí dịch vụ</button>
        </div>
      </header>

      {/* Main Section - Dual Workspace */}
      <main className="workspace-container">
        {/* Operations Center Section */}
        <section className="workspace-section ops-center">
          <div className="section-header">
            <h2>
              <span className="section-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              Vận Hành & Hỗ Trợ
            </h2>
            <p>Tài liệu tra cứu nghiệp vụ dành cho nhân viên Sales, CS và Đối tác</p>
          </div>

          <div className="cards-list">
            <a href="#/bank" onClick={(e) => { e.preventDefault(); onNavigateToBank(); }} className="category-card">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="21" width="18" height="2" />
                  <rect x="5" y="10" width="2" height="8" />
                  <rect x="11" y="10" width="2" height="8" />
                  <rect x="17" y="10" width="2" height="8" />
                  <path d="M2 10L12 3L22 10Z" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-title-row">
                  <span className="card-title">Quy trình Liên kết Ngân hàng</span>
                  <span className="card-arrow">→</span>
                </div>
                <p className="card-description">Tra cứu điều kiện, thủ tục đăng ký liên kết tài khoản của 14 ngân hàng thương mại Việt Nam.</p>
              </div>
            </a>

            <a href="#/faqs" onClick={(e) => { e.preventDefault(); onNavigateToFaqs(); }} className="category-card">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="8" r="1" />
                  <path d="M12 11v3" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-title-row">
                  <span className="card-title">FAQs Pay By Bank</span>
                  <span className="card-arrow">→</span>
                </div>
                <p className="card-description">Các câu hỏi thường gặp về luồng tiền, biểu phí cổng thanh toán và cách thức xử lý sự cố giao dịch.</p>
              </div>
            </a>

            <a href="#/contact" onClick={(e) => { e.preventDefault(); onNavigateToContact(); }} className="category-card">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-title-row">
                  <span className="card-title">Thông tin liên hệ HENO</span>
                  <span className="card-arrow">→</span>
                </div>
                <p className="card-description">Hotline hỗ trợ kỹ thuật, kênh Zalo OA, thông tin hỗ trợ thiết bị TingeeBox và đội ngũ kinh doanh các vùng miền.</p>
              </div>
            </a>
          </div>
        </section>

        {/* Developer Hub Section */}
        <section className="workspace-section dev-hub">
          <div className="section-header">
            <h2>
              <span className="section-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </span>
              Tích Hợp & Dịch Vụ
            </h2>
            <p>Hệ sinh thái API, cổng thanh toán thẻ, và hướng dẫn tích hợp hệ thống</p>
          </div>

          <div className="cards-list">
            <a href="#/payout" onClick={(e) => { e.preventDefault(); onNavigateToDisbursement(); }} className="category-card">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </div>
              <div className="card-content">
                <div className="card-title-row">
                  <span className="card-title">Tính năng Chi hộ (Payout)</span>
                  <span className="card-arrow">→</span>
                </div>
                <p className="card-description">Hướng dẫn kết nối ERP/Heno chi hộ tự động qua cổng BIDV Direct Link và liên kết đồng bộ ví điện tử Bao Kim Payout.</p>
              </div>
            </a>

            <a href="#/onepay" onClick={(e) => { e.preventDefault(); onNavigateToAutoDebit(); }} className="category-card">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 2.1l4 4-4 4"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 6"></path>
                  <path d="M7 21.9l-4-4 4-4"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 18"></path>
                </svg>
              </div>
              <div className="card-content">
                <div className="card-title-row">
                  <span className="card-title">Trích nợ tự động (OnePay Direct Debit)</span>
                  <span className="card-arrow">→</span>
                </div>
                <p className="card-description">Giải pháp ủy quyền trích nợ tài khoản tự động định kỳ, tích hợp cổng kỹ thuật đối tác OnePay.</p>
              </div>
            </a>

            <a href="#/payoo" onClick={(e) => { e.preventDefault(); onNavigateToWallet(); }} className="category-card">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-title-row">
                  <span className="card-title">Thanh toán thẻ, Payment Link & SmartPOS</span>
                  <span className="card-arrow">→</span>
                </div>
                <p className="card-description">Quy trình tích hợp cổng thẻ ATM/Quốc tế Payoo, tạo link thanh toán nhanh trực tuyến và vận hành SmartPOS.</p>
              </div>
            </a>

            {/* External Developer Documentation link */}
            <a 
              href="https://developers.tingee.vn" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="category-card dev-link"
            >
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                  <line x1="10" y1="21" x2="14" y2="3" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-title-row">
                  <span className="card-title">Tài liệu nhà phát triển (developers.tingee.vn)</span>
                  <span className="card-arrow">↗</span>
                </div>
                <p className="card-description">Đến trang tài liệu chính thức chứa đặc tả kỹ thuật API, SDK, mã lỗi hệ thống và hướng dẫn tích hợp chi tiết.</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>
          © 2026 Công ty CP Công Nghệ HENO ·{' '}
          <a href="https://tingee.vn" target="_blank" rel="noopener noreferrer">tingee.vn</a>
        </p>
      </footer>
    </div>
  );
};
