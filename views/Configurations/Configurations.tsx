import { ConfigurationsContent } from './ConfigurationsContent';
import React from 'react';

export const metadata = {
  title: 'Configurations',
};

export const Configurations = async () => {
  return (
    <ConfigurationsContent />
  );
};

export default Configurations;
