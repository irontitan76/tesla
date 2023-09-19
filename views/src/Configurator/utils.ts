import { Device } from '@nexus/utils/supabase';

export const calculateTotal = (items: number[], batteries: Device[]) => {
  return items.reduce((acc, cur, index) => {
    const battery = batteries.find((item) => item.id === cur);

    if (battery) {
      acc = {
        totalBatteries: index + 1,
        totalCost: acc.totalCost + battery.cost,
        totalDepth: acc.totalDepth + battery.depth,
        totalEnergy: acc.totalEnergy + battery.energy,
        totalTransformers: Math.ceil((index + 1) / 2),
        totalWidth: acc.totalWidth + battery.width,
      };
    }

    return acc;
  }, {
    totalBatteries: 0,
    totalCost: 0,
    totalDepth: 0,
    totalEnergy: 0,
    totalTransformers: 0,
    totalWidth: 0,
  })};
