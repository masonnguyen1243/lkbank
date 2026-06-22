import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { CategoryCard } from '../components/ui/CategoryCard';
import '../styles/home.css';

interface HomeProps {
  onNavigateToBank: () => void;
  onNavigateToDisbursement: () => void;
  onNavigateToAutoDebit: () => void;
  onNavigateToWallet: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onNavigateToBank,
  onNavigateToDisbursement,
  onNavigateToAutoDebit,
  onNavigateToWallet,
}) => {
  const { toggleTheme } = useTheme();

  return (
    <div className="home-layout">
      {/* Theme Toggle Button */}
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Đổi giao diện"
      >
        <svg
          className="sun-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>

      <header className="home-header">
        <div className="logo-container">
          <img className="logo" src="https://developers.tingee.vn/img/logo_heno.png" alt="HENO Logo" />
          <h1>Cổng thông tin HENO</h1>
        </div>
        <p className="subtitle">Tài liệu, hướng dẫn và quy trình nghiệp vụ</p>
      </header>

      <main className="home-main">
        <section className="category-grid">
          <CategoryCard
            title="Quy trình Liên kết Ngân hàng"
            description="Hướng dẫn chi tiết quy trình liên kết tài khoản ngân hàng với hệ thống Tingee."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            }
            onClick={onNavigateToBank}
          />

          <CategoryCard
            title="Quy trình dịch vụ Chi hộ"
            description="Tài liệu nghiệp vụ, quy trình vận hành và tích hợp dịch vụ Chi hộ dành cho đối tác."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 16 16 12 12 8"></polyline>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            }
            onClick={onNavigateToDisbursement}
          />

          <CategoryCard
            title="Trích nợ tự động"
            description="Hướng dẫn đăng ký dịch vụ, kết nối cổng API và quản lý trích nợ tự động định kỳ."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 2.1l4 4-4 4"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 6"></path>
                <path d="M7 21.9l-4-4 4-4"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 18"></path>
              </svg>
            }
            onClick={onNavigateToAutoDebit}
          />

          <CategoryCard
            title="Ví điện tử"
            description="Tài liệu kỹ thuật tích hợp thanh toán, đối soát và kết nối với các hệ thống ví điện tử."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
                <path d="M4 6v12a2 2 0 0 0 2 2h14v-4"></path>
                <path d="M18 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4V12h-4z"></path>
              </svg>
            }
            onClick={onNavigateToWallet}
          />

          <CategoryCard
            title="Các tài liệu khác"
            description="Sắp ra mắt. Tài liệu kỹ thuật dành cho nhà phát triển."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            }
            placeholder={true}
          />
        </section>
      </main>

      <footer className="home-footer">
        <p>
          © 2026 Công ty CP Công Nghệ HENO ·{' '}
          <a href="https://tingee.vn" target="_blank" rel="noopener noreferrer">tingee.vn</a>
        </p>
      </footer>
    </div>
  );
};
