import { Component, MouseEventHandler, ButtonHTMLAttributes } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];

  className?: string;
  children: React.ReactNode;
};

export default class Button extends Component<Props> {
  render() {
    const { onClick, type = 'button', className, children } = this.props;

    return (
      <button
        type={type}
        onClick={onClick}
        className={`text-white p-2 rounded-md transition-colors duration-300 ${className}`}
      >
        {children}
      </button>
    );
  }
}
