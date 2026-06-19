import React, { useState } from 'react';
import { HighlightText } from './HighlightText';

export interface SidebarBankInfo {
  id: string;
  num: number;
  name: string;
  fullName: string;
  logoUrl: string;
  fallbackText: string;
  searchNames: string;
  fallbackBg: string;
}

export const BANKS_LIST: SidebarBankInfo[] = [
  {
    id: 'vtb',
    num: 1,
    name: 'Vietinbank',
    fullName: 'NH TMCP Công Thương Việt Nam · VTB',
    logoUrl: 'https://api.vietqr.io/img/ICB.png',
    fallbackText: 'VTB',
    searchNames: 'vietinbank vtb',
    fallbackBg: '#1a5276',
  },
  {
    id: 'bidv',
    num: 2,
    name: 'BIDV',
    fullName: 'NH TMCP Đầu tư và Phát triển Việt Nam',
    logoUrl: 'https://api.vietqr.io/img/BIDV.png',
    fallbackText: 'BIDV',
    searchNames: 'bidv',
    fallbackBg: '#004f9e',
  },
  {
    id: 'ocb',
    num: 3,
    name: 'OCB',
    fullName: 'Orient Commercial Joint Stock Bank',
    logoUrl: 'https://api.vietqr.io/img/OCB.png',
    fallbackText: 'OCB',
    searchNames: 'ocb phương đông',
    fallbackBg: '#d32f2f',
  },
  {
    id: 'mbbank',
    num: 4,
    name: 'MB Bank',
    fullName: 'NH TMCP Quân Đội · MB',
    logoUrl: 'https://api.vietqr.io/img/MB.png',
    fallbackText: 'MB',
    searchNames: 'mb bank mbbank',
    fallbackBg: '#880e4f',
  },
  {
    id: 'acb',
    num: 5,
    name: 'ACB',
    fullName: 'NH TMCP Á Châu',
    logoUrl: 'https://api.vietqr.io/img/ACB.png',
    fallbackText: 'ACB',
    searchNames: 'acb á châu',
    fallbackBg: '#1565c0',
  },
  {
    id: 'vcb',
    num: 6,
    name: 'Vietcombank',
    fullName: 'NH TMCP Ngoại Thương Việt Nam · VCB',
    logoUrl: 'https://api.vietqr.io/img/VCB.png',
    fallbackText: 'VCB',
    searchNames: 'vietcombank vcb ngoại thương',
    fallbackBg: '#1b5e20',
  },
  {
    id: 'vpbank',
    num: 7,
    name: 'VPBank',
    fullName: 'NH TMCP Việt Nam Thịnh Vượng · VPB',
    logoUrl: 'https://api.vietqr.io/img/VPB.png',
    fallbackText: 'VPB',
    searchNames: 'vpbank vp',
    fallbackBg: '#2e7d32',
  },
  {
    id: 'sacombank',
    num: 8,
    name: 'Sacombank',
    fullName: 'NH TMCP Sài Gòn Thương Tín · STB',
    logoUrl: 'https://api.vietqr.io/img/STB.png',
    fallbackText: 'STB',
    searchNames: 'sacombank stb',
    fallbackBg: '#0d47a1',
  },
  {
    id: 'vib',
    num: 9,
    name: 'VIB',
    fullName: 'NH TMCP Quốc Tế Việt Nam',
    logoUrl: 'https://api.vietqr.io/img/VIB.png',
    fallbackText: 'VIB',
    searchNames: 'vib quốc tế',
    fallbackBg: '#4a148c',
  },
  {
    id: 'pgbank',
    num: 10,
    name: 'PGBank',
    fullName: 'NH TMCP Xăng Dầu Petrolimex · PGB',
    logoUrl: 'https://api.vietqr.io/img/PGB.png',
    fallbackText: 'PGB',
    searchNames: 'pgbank xăng dầu',
    fallbackBg: '#c62828',
  },
  {
    id: 'shinhan',
    num: 11,
    name: 'ShinhanBank',
    fullName: 'NH Shinhan Việt Nam',
    logoUrl: 'https://api.vietqr.io/img/SHBVN.png',
    fallbackText: 'Shinhan',
    searchNames: 'shinhanbank shinhan hàn quốc',
    fallbackBg: '#ce1126',
  },
  {
    id: 'coopbank',
    num: 12,
    name: 'Co-op Bank',
    fullName: 'NH Hợp tác xã Việt Nam',
    logoUrl: 'https://api.vietqr.io/img/COOPBANK.png',
    fallbackText: 'Co-op',
    searchNames: 'coopbank co-op bank hợp tác',
    fallbackBg: '#0277bd',
  },
  {
    id: 'msb',
    num: 13,
    name: 'MSB',
    fullName: 'NH TMCP Hàng Hải Việt Nam',
    logoUrl: 'https://api.vietqr.io/img/MSB.png',
    fallbackText: 'MSB',
    searchNames: 'msb hàng hải',
    fallbackBg: '#b71c1c',
  },
  {
    id: 'tpbank',
    num: 14,
    name: 'TPBank',
    fullName: 'NH TMCP Tiên Phong · TPB',
    logoUrl: 'https://api.vietqr.io/img/TPB.png',
    fallbackText: 'TPB',
    searchNames: 'tpbank tpb tiên phong',
    fallbackBg: '#54208a',
  },
];

interface SidebarProps {
  activeId: string;
  onLinkClick: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeId,
  onLinkClick,
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
}) => {
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  const handleLogoError = (id: string) => {
    setLogoErrors((prev) => ({ ...prev, [id]: true }));
  };

  const filteredBanks = BANKS_LIST.filter((bank) =>
    !searchQuery || bank.searchNames.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <aside className={`sb ${isOpen ? 'open' : ''}`} id="sidebar">
      <div className="sb-search-wrap">
        <input
          className="sb-search"
          id="sbSearch"
          type="text"
          placeholder="Tìm ngân hàng..."
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
      <a
        className={`sb-link ${activeId === 'terminology' ? 'active' : ''}`}
        href="#terminology"
        onClick={(e) => {
          e.preventDefault();
          onLinkClick('terminology');
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
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <span>Thuật ngữ</span>
      </a>

      <div className="sb-section">Ngân hàng</div>

      {filteredBanks.map((bank) => (
        <a
          key={bank.id}
          className={`sb-link sb-bank ${activeId === bank.id ? 'active' : ''}`}
          href={`#${bank.id}`}
          onClick={(e) => {
            e.preventDefault();
            onLinkClick(bank.id);
            onClose();
          }}
        >
          <div className="sb-logo-wrap">
            {!logoErrors[bank.id] ? (
              <img
                className="sb-logo"
                src={bank.logoUrl}
                alt={bank.name}
                onError={() => handleLogoError(bank.id)}
              />
            ) : (
              <div className="sb-fallback" style={{ background: bank.fallbackBg }}>
                {bank.fallbackText}
              </div>
            )}
          </div>
          <span><HighlightText text={bank.name} highlight={searchQuery} /></span>
          <span className="sb-num">{bank.num}</span>
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
