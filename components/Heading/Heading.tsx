import { Typography, TypographyProps } from '@mui/material';

export interface HeadingProps extends TypographyProps {}

export const Heading = ({ children, ...rest }: HeadingProps) => (
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
