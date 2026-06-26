import React from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  placeholder?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  href,
  onClick,
  placeholder = false,
}) => {
  if (placeholder) {
    return (
      <div className="category-card placeholder">
        <div className="card-icon">{icon}</div>
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    );
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a href={href || '#'} onClick={handleLinkClick} className="category-card">
      <div className="card-icon">{icon}</div>
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <span className="card-arrow">→</span>
    </a>
  );
};
