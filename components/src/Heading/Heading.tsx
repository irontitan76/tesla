import { Typography, TypographyProps } from '@mui/material';

export const Heading = ({ children, ...rest }: TypographyProps) => (
  <Typography
    component='h2'
    fontWeight='bold'
    mb={3}
    variant='h5'
    {...rest}
  >
    {children}
  </Typography>
);
