import { LinearProgress } from "@mui/material";
import React from 'react';

export const Loading = ({ children }: any) => {
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
