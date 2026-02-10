import React from 'react';

interface CustomIconProps {
  src: string;
  alt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white' | 'colored';
}

const CustomIcon: React.FC<CustomIconProps> = ({ 
  src, 
  alt, 
  className = '', 
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const variantClasses = {
    default: '',
    white: 'filter brightness-0 invert',
    colored: ''
  };

  return (
    <img 
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} ${variantClasses[variant]} object-contain ${className}`}
    />
  );
};

export default CustomIcon;