import { useAppSelector } from '.';
import {
  selectTheme,
  selectThemeAvatar,
  selectThemeButton,
  selectThemeTextField,
  selectThemeTypography,
} from '../theme/theme.selectors';

export const useThemeStore = () => {
  const theme = useAppSelector(selectTheme);
  const avatar = useAppSelector(selectThemeAvatar);
  const typography = useAppSelector(selectThemeTypography);
  const button = useAppSelector(selectThemeButton);
  const textField = useAppSelector(selectThemeTextField);

  return {
    theme,
    avatar,
    button,
    textField,
    typography,
  };
};
