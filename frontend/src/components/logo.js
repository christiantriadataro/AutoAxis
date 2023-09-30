import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <img
      alt="Under development"
      src="/assets/logos/logo-autoAxis.png"
      style={{
        display: 'block',
        maxWidth: '100%',
        width: 600
      }} />
  );
};
