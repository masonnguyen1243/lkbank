import React from 'react';

export interface FaqGroupInfo {
  id: string;
  name: string;
  fullName: string;
  num: number;
}

interface FaqsSidebarProps {
  activeId: string;
  onLinkClick: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  groups: FaqGroupInfo[];
}

export const FaqsSidebar: React.FC<FaqsSidebarProps> = ({
  activeId,
  onLinkClick,
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  groups,
}) => {
  return (
    <aside className={`sb ${isOpen ? 'open' : ''}`} id="sidebar">
      <div className="sb-search-wrap">
        <input
          className="sb-search"
          id="sbSearch"
          type="text"
          placeholder="Tìm câu hỏi..."
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

      <div className="sb-section">Danh mục câu hỏi</div>
      {groups.map((group) => (
        <a
          key={group.id}
          className={`sb-link sb-bank ${activeId === group.id ? 'active' : ''}`}
          href={`#${group.id}`}
          onClick={(e) => {
            e.preventDefault();
            onLinkClick(group.id);
            onClose();
          }}
        >
          <div className="sb-logo-wrap">
            <div 
              className="sb-fallback" 
              style={{ 
                background: group.id === 'technical' ? '#1e3a8a' :
                            group.id === 'onboarding' ? '#0d9488' :
                            group.id === 'operations' ? '#b45309' : '#be123c',
                fontWeight: 'bold',
                fontSize: '11px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              Q{group.num}
            </div>
          </div>
          <span>{group.name}</span>
          <span className="sb-num">{group.num}</span>
        </a>
      ))}

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
