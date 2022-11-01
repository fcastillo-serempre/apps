import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { TypographyVariants, useThemeStore } from '@apps/store';

interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  className?: string;
  variant?: keyof TypographyVariants;
}

export const Typography: FC<TypographyProps> = ({
  children,
  className,
  variant = 'body1',
}) => {
  const { typography } = useThemeStore();

  const isParagraph = variant === 'body1' || variant === 'body2';

  const Component = isParagraph ? 'p' : variant;

  return (
    <Component
      className={twMerge(
        typography.base,
        typography.variant[variant],
        className
      )}
    >
      {children}
    </Component>
  );
};
