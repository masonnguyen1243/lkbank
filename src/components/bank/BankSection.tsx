import React, { useState } from 'react';
import { HighlightText } from '../ui/HighlightText';

export type FilterType = 'all' | 'cn' | 'hkd' | 'dn';

interface BankSectionProps {
  id: string;
  num: number;
  name: string;
  fullName: string;
  logoUrl: string;
  fallbackText: string;
  borderColor: string;
  fallbackBg: string;
  searchQuery?: string;
  hideFilter?: boolean;
  children: (filter: FilterType) => React.ReactNode;
}

export const BankSection: React.FC<BankSectionProps> = ({
  id,
  num,
  name,
  fullName,
  logoUrl,
  fallbackText,
  borderColor,
  fallbackBg,
  searchQuery = '',
  hideFilter = false,
  children,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [logoError, setLogoError] = useState(false);

  return (
    <div 
      className="bank-card" 
      id={id} 
      style={{ borderLeftColor: borderColor, scrollMarginTop: 'calc(var(--sh) + 16px)' }}
    >
      <div className="bank-hdr">
        <div className="bank-num">{num}</div>
        <div className="bank-logo-wrap">
          {!logoError ? (
            <img 
              className="bank-logo" 
              src={logoUrl} 
              alt={name} 
              onError={() => setLogoError(true)} 
            />
          ) : (
            <div className="bank-logo-fb" style={{ background: fallbackBg }}>
              {fallbackText}
            </div>
          )}
        </div>
        <div className="bank-hdr-info">
          <h2><HighlightText text={name} highlight={searchQuery} /></h2>
          <span className="bank-code"><HighlightText text={fullName} highlight={searchQuery} /></span>
        </div>
      </div>

      <div className="bank-body">
        {/* Segmented Filter */}
        {!hideFilter && (
          <div className="acct-filter">
            <span className="acct-filter-label">Loại tài khoản:</span>
            <div className="acct-filter-options">
              <button 
                className={`acct-filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Tất cả
              </button>
              <button 
                className={`acct-filter-btn ${filter === 'cn' ? 'active' : ''}`}
                onClick={() => setFilter('cn')}
              >
                Cá nhân
              </button>
              <button 
                className={`acct-filter-btn ${filter === 'hkd' ? 'active' : ''}`}
                onClick={() => setFilter('hkd')}
              >
                Hộ kinh doanh
              </button>
              <button 
                className={`acct-filter-btn ${filter === 'dn' ? 'active' : ''}`}
                onClick={() => setFilter('dn')}
              >
                Doanh nghiệp
              </button>
            </div>
          </div>
        )}

        {/* Dynamic content rendering with current filter value */}
        {children(hideFilter ? 'all' : filter)}
      </div>
    </div>
  );
};

interface DocItemProps {
  type: 'pdf' | 'doc';
  name: string;
  meta: string;
  url: string;
  onViewPDF?: (url: string, title: string) => void;
}

export const DocItem: React.FC<DocItemProps> = ({ type, name, meta, url, onViewPDF }) => {
  return (
    <div className="doc-item">
      <div className="doc-icon-box">
        {type === 'pdf' ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
        )}
      </div>
      <div className="doc-info">
        <div className="doc-name">{name}</div>
        <div className="doc-meta">
          <span className="doc-size">{meta}</span>
          <span className={`doc-badge ${type}`}>{type}</span>
        </div>
      </div>
      <div className="doc-actions">
        {type === 'pdf' && onViewPDF && (
          <button 
            className="doc-btn doc-btn-view" 
            onClick={() => onViewPDF(url, name)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Xem
          </button>
        )}
        <a className="doc-btn doc-btn-dl" href={url} download>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Tải về
        </a>
      </div>
    </div>
  );
};

interface DocSectionProps {
  children?: React.ReactNode;
}

export const DocSection: React.FC<DocSectionProps> = ({ children }) => {
  const isEmpty = React.Children.count(children) === 0;

  return (
    <div className="doc-section">
      <div className="doc-section-hdr">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        Tài liệu đính kèm
      </div>
      {isEmpty ? (
        <div className="doc-list doc-list-empty">
          <div className="doc-empty">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              opacity={0.35}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="12" y2="17" />
            </svg>
            <span>Chưa có tài liệu — sẽ cập nhật sau</span>
          </div>
        </div>
      ) : (
        <div className="doc-list">{children}</div>
      )}
    </div>
  );
};
