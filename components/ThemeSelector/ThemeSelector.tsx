import { faMoon, faSun } from '@fortawesome/sharp-light-svg-icons';
import { IconButton, IconButtonProps, Tooltip, TooltipProps } from '@mui/material';
import { Icon, IconProps } from 'components/Icon';
import { useColorMode } from 'components/ThemeRegistry';

export interface ThemeSelectorProps extends IconButtonProps {
  TooltipProps?: TooltipProps;
  IconProps?: Partial<IconProps>;
}

export const ThemeSelector = ({
  TooltipProps,
  IconProps,
  ...rest
}: ThemeSelectorProps) => {
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Tooltip
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      {...TooltipProps}
    >
      <IconButton onClick={toggleColorMode} {...rest}>
        <Icon icon={isDark ? faSun : faMoon} {...IconProps} />
      </IconButton>
    </Tooltip>
  );
};
