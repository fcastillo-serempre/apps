import { forwardRef, ReactNode } from 'react';
import { Link, NavLink, To } from 'react-router-dom';

import { twMerge } from 'tailwind-merge';

import {
  ButtonColors,
  ButtonSizes,
  ButtonVariants,
  useThemeStore,
} from '@apps/store';

export type ButtonProps = {
  as?: 'button' | typeof Link | typeof NavLink | 'a';
  children?: ReactNode;
  className?: string;
  color?: keyof ButtonColors;
  disabled?: boolean;
  onClick?: () => void;
  size?: keyof ButtonSizes;
  to?: To;
  type?: 'button' | 'submit' | 'reset';
  variant?: keyof ButtonVariants;
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function ForwardedButton(props, ref) {
  const {
    children,
    className,
    color = 'info',
    disabled = false,
    onClick,
    size = 'md',
    to,
    type = 'button',
    variant = 'contained',
    ...rest
  } = props;

  const isLink = typeof to !== 'undefined';
  const { as: Component = isLink ? NavLink : 'button' } = props;

  const { button } = useThemeStore();

  const btnProps = { ...ref, ...rest };

  return (
    <Component
      to={to || ''}
      className={twMerge(
        disabled && button.disabled,
        button.base,
        button.size[size],
        button.color[color],
        button.variant[variant],
        className
      )}
      {...(!isLink && { type, disabled, onClick })}
      {...btnProps}
    >
      {children}
    </Component>
  );
});

export default Button;
