import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  tags?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  displayStyle?: React.CSSProperties;
  className?: string;
  dataAccType?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  tags,
  defaultOpen = true,
  children,
  displayStyle,
  className = '',
  dataAccType,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div 
      className={`ag ${className}`} 
      style={displayStyle}
      data-acc-type={dataAccType}
    >
      <div className="ag-hdr" onClick={() => setIsOpen(!isOpen)}>
        <span className="ag-title">{title}</span>
        {tags}
        <span className={`ag-toggle ${isOpen ? 'open' : ''}`}>▾</span>
      </div>
      <div className={`ag-body ${isOpen ? '' : 'collapsed'}`}>
        {children}
      </div>
    </div>
  );
};
