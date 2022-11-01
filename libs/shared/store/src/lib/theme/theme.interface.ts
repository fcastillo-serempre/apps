export interface Theme {
  avatar: {
    base: string;
    size: AvatarSizes;
    rounded: string;
    bordered: string;
    img: {
      off: string;
      on: string;
    };
  };
  button: {
    base: string;
    size: ButtonSizes;
    color: ButtonColors;
    disabled: string;
    variant: ButtonVariants;
  };
  textField: {
    base: string;
    size: TextFieldSizes;
    disabled: string;
    state: TextFieldStates;
  };
  typography: {
    base: string;
    variant: TypographyVariants;
  };
}

export interface ThemeStateColors {
  info: string;
  failure: string;
  success: string;
  warning: string;
}

export interface ThemeColors extends ThemeStateColors {
  [key: string]: string;
  blue: string;
  cyan: string;
  dark: string;
  gray: string;
  green: string;
  indigo: string;
  light: string;
  lime: string;
  pink: string;
  purple: string;
  red: string;
  teal: string;
  yellow: string;
}

export interface ThemeSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
}

export type ButtonSizes = Pick<ThemeSizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
export interface ButtonColors
  extends Pick<ThemeStateColors, 'info' | 'failure' | 'success' | 'warning'> {
  inherit: string;
}

export type ButtonVariants = {
  contained: string;
  outlined: string;
  link: string;
};

export type TextFieldSizes = Pick<ThemeSizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

export interface TextFieldStates
  extends Pick<ThemeStateColors, 'failure' | 'success' | 'warning'> {
  inherit: string;
}

export type TypographyVariants = {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  body1: string;
  body2: string;
};

export type AvatarSizes = Pick<ThemeSizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
