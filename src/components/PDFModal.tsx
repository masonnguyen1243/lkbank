import React, { useEffect } from 'react';

interface PDFModalProps {
  isOpen: boolean;
  url: string;
  title: string;
  onClose: () => void;
}

export const PDFModal: React.FC<PDFModalProps> = ({ isOpen, url, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div className={`pdf-modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`pdf-modal ${isOpen ? 'open' : ''}`}>
        <div className="pdf-modal-hdr">
          <div className="pdf-modal-title" title={title}>{title}</div>
          <div className="pdf-modal-actions">
            {isOpen && (
              <a className="pdf-modal-dl" href={url} download={url.split('/').pop() || 'document'}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Tải về
              </a>
            )}
            <button className="pdf-modal-close" onClick={onClose} aria-label="Đóng">
              ✕
            </button>
          </div>
        </div>
        <div className="pdf-modal-body">
          {isOpen && <iframe className="pdf-frame" src={url} title="Document Viewer"></iframe>}
        </div>
      </div>
    </>
  );
};
