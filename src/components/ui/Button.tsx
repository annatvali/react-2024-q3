import React, { MouseEventHandler, ButtonHTMLAttributes } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({
  onClick,
  type = 'button',
  className,
  children,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white p-2 rounded-md transition-colors duration-300 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
