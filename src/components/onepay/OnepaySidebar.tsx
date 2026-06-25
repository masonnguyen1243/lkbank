import React, { useState } from 'react';
import { HighlightText } from '../ui/HighlightText';

export interface OnepayServiceInfo {
  id: string;
  name: string;
  fullName: string;
  logoUrl?: string;
  fallbackText: string;
  searchNames: string;
  fallbackBg: string;
}

interface OnepaySidebarProps {
  activeId: string;
  onLinkClick: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  services: OnepayServiceInfo[];
}

export const OnepaySidebar: React.FC<OnepaySidebarProps> = ({
  activeId,
  onLinkClick,
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  services,
}) => {
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  const handleLogoError = (id: string) => {
    setLogoErrors((prev) => ({ ...prev, [id]: true }));
  };

  const filteredServices = services.filter((service) =>
    !searchQuery || service.searchNames.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <aside className={`sb ${isOpen ? 'open' : ''}`} id="sidebar">
      <div className="sb-search-wrap">
        <input
          className="sb-search"
          id="sbSearch"
          type="text"
          placeholder="Tìm kiếm dịch vụ OnePay..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="sb-section">Điều hướng</div>
      <a
        className={`sb-link ${activeId === 'intro' ? 'active' : ''}`}
        href="#intro"
        onClick={(e) => {
          e.preventDefault();
          onLinkClick('intro');
          onClose();
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ flexShrink: 0, color: '#6b7280' }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
        <span>Tổng quan</span>
      </a>


      {filteredServices.length > 0 && (
        <>
          <div className="sb-section">Dịch vụ OnePay</div>
          {filteredServices.map((service, index) => (
            <a
              key={service.id}
              className={`sb-link sb-bank ${activeId === service.id ? 'active' : ''}`}
              href={`#${service.id}`}
              onClick={(e) => {
                e.preventDefault();
                onLinkClick(service.id);
                onClose();
              }}
            >
              <div className="sb-logo-wrap">
                {service.logoUrl && !logoErrors[service.id] ? (
                  <img
                    className="sb-logo"
                    src={service.logoUrl}
                    alt={service.name}
                    onError={() => handleLogoError(service.id)}
                  />
                ) : (
                  <div className="sb-fallback" style={{ background: service.fallbackBg }}>
                    {service.fallbackText}
                  </div>
                )}
              </div>
              <span>
                <HighlightText text={service.name} highlight={searchQuery} />
              </span>
              <span className="sb-num">{index + 1}</span>
            </a>
          ))}
        </>
      )}

      <div style={{ padding: '12px', marginTop: 'auto' }}>
        <div
          style={{
            fontSize: '11px',
            color: 'var(--tx3)',
            textAlign: 'center',
            lineHeight: '1.6',
          }}
        >
          © 2026 HENO &nbsp;·&nbsp; tingee.vn
          <br />
          1900 255 567
        </div>
      </div>
    </aside>
  );
};
