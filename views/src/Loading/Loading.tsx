import { LinearProgress } from '@mui/material';
import { ReactNode } from 'react';

export interface LoadingProps {
  children?: ReactNode;
}

export const Loading = ({ children }: LoadingProps) => {
  return (
    <>
      <LinearProgress
        color='secondary'
        sx={{
          height: 2,
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100vw',
          zIndex: 2000,
        }}
      />
      {children}
    </>
  );
};

export default Loading;
