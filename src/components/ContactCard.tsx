import React from 'react';

interface ContactCardProps {
  type?: 'info' | 'warning' | 'important' | 'default';
  children: React.ReactNode;
}

export const ContactCard: React.FC<ContactCardProps> = ({ type = 'default', children }) => {
  let typeClass = '';
  if (type === 'info') typeClass = 'c-info';
  else if (type === 'warning') typeClass = 'c-warning';
  else if (type === 'important') typeClass = 'c-important';

  return (
    <div className={`c-card ${typeClass}`}>
      {children}
    </div>
  );
};
