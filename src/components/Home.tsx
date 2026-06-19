import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { CategoryCard } from './CategoryCard';
import '../styles/home.css';

interface HomeProps {
  onNavigateToBank: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigateToBank }) => {
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
