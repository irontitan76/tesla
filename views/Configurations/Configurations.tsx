import { ConfigurationsContent } from './ConfigurationsContent';
import React from 'react';

export const metadata = {
  title: 'Devices',
};

export const Configurations = async () => {
  return (
    <ConfigurationsContent />
  );
};

export default Configurations;
