import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Box as Box3D, OrbitControls, TrackballControls } from '@react-three/drei';

import { useTheme } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Device } from "database/objects";

export interface ConfiguratorDeviceProps {
  args: [number, number, number];
  position: [number, number, number];
  type?: string;
}

// TODO: Finish typing these components (beta)
export const ConfiguratorDevice = ({
  args  = [2, 2, 4],
  type,
  ...rest
}: ConfiguratorDeviceProps) => {
  const ref = useRef<any>();
  const { palette } = useTheme();
  const [hovered, hover] = useState(false);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 25, 20); // Set an initial camera position
  }, [camera]);

  const baseColor = type === 'Transformer' ? palette.primary.main : palette.secondary.main;

  return (
    <Box3D
      args={args}
      castShadow
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}
      ref={ref}
      {...rest}
    >
      <meshStandardMaterial
        attach='material'
        color={hovered ? palette.error.main : baseColor} />
    </Box3D>
  );
};

export interface ConfiguratorCanvas {
  children: ReactNode;
}

export const ConfiguratorCanvas = ({ children }: ConfiguratorCanvas) => {
  return (
    <Canvas>
      <ambientLight
        intensity={0.5}
      />
      <spotLight
        angle={0.15}
        penumbra={1}
        position={[10, 10, 10]}
      />
      <pointLight
        position={[-10, -10, -10]}
      />
      {children}
      <OrbitControls />
    </Canvas>
  );
};
