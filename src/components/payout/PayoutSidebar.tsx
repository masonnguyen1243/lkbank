import React, { useState } from 'react';
import { HighlightText } from '../ui/HighlightText';

export interface PayoutServiceInfo {
  id: string;
  name: string;
  fullName: string;
  logoUrl?: string;
  fallbackText: string;
  searchNames: string;
  fallbackBg: string;
}

interface PayoutSidebarProps {
  activeId: string;
  onLinkClick: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  services: PayoutServiceInfo[];
}

export const PayoutSidebar: React.FC<PayoutSidebarProps> = ({
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
        <div className="sb-search-container">
          <input
            className="sb-search"
            id="sbSearch"
            type="text"
            placeholder="Tìm kiếm dịch vụ chi hộ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="sb-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Xóa tìm kiếm"
            >
              ✕
            </button>
          )}
        </div>
      </div>



      {filteredServices.length > 0 && (
        <>
          <div className="sb-section">Dịch vụ Chi hộ</div>
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
