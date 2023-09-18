import { Canvas, useThree } from "@react-three/fiber";
import { Box as Box3D, TrackballControls } from '@react-three/drei';

import { useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";

// TODO: Finish typing these components
export const ConfiguratorDevice = ({
  args  = [2, 2, 4],
  type,
  ...rest
}: any) => {
  const ref = useRef();
  const { palette } = useTheme();
  const [hovered, hover] = useState(false);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 25, 20); // Set an initial camera position
  }, [camera]);

  const baseColor = type.name === 'Transformer' ? palette.primary.main : palette.secondary.main;

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

export const ConfiguratorCanvas = ({ children }: any) => {
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
      <TrackballControls />
  </Canvas>
  );
};
