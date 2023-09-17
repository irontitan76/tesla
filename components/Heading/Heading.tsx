import { Typography, TypographyProps } from '@mui/material';

export interface HeadingProps extends TypographyProps {}

export const Heading = ({ children }: HeadingProps) => (
  <Typography
    component='h2'
    fontWeight='bold'
    mb={3}
    variant='h5'
  >
    {children}
  </Typography>
);
