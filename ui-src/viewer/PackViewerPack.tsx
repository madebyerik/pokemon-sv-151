import { useRef } from "react";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { a, useSpring, easings } from "@react-spring/three";
import { Action, State } from "../reducer";

import Pack from "./Pack";

const springConfig = { mass: 1, tension: 170, friction: 26 };

const PackViewerPack = ({ 
  packRef,
  packRecycle,
  setPackRecycle,
  state, 
  dispatch
}: { 
  packRef: React.RefObject<THREE.Mesh | null>;
  packRecycle: boolean;
  setPackRecycle: (packRecycle: boolean) => void;
  state: State; 
  dispatch: (action: Action) => void;
}) => {
  const { opened } = state.packs.current;
  const hoverRef = useRef<THREE.Group>(null!);

  const { godPackEnabled } = state.packs;

  const godPackPulse = useSpring({
    from: { scale: [1, 1, 1] },
    to: godPackEnabled
      ? [
          { scale: [1.05, 1.05, 1.05] },
          { scale: [1, 1, 1] },
        ]
      : { scale: [1, 1, 1] },
    reset: godPackEnabled,
    config: {
      duration: 500,
      easing: easings.easeInOutQuad,
    },
  });

  // Pack rotation & scale spring
  const packRotationSpring = useSpring({
    rotationX: opened ? (packRecycle ? 0 : -Math.PI/2) : 0,
    positionY: opened ? (packRecycle ? 10 : -1.25) : 0,
    scale: opened ? (packRecycle ? [1,1,1] : [0.5,0.5,0.5]) : [1,1,1],
    config: springConfig,
    immediate: packRecycle
  });

  // Pack slide Z spring
  const packSlideSpring = useSpring({
    positionZ: opened ? (packRecycle ? 0 : 10) : 0,
    delay: opened ? 200 : 0,
    config: springConfig,
    immediate: packRecycle,
    onRest: () => { if (opened) setPackRecycle(true); }
  });

  // Hover animation when pack is closed
  useFrame(({ clock }) => {
    if (!opened && hoverRef.current) {
      const t = clock.getElapsedTime();
      const hoverY = Math.sin(t * 1.2) * 0.08;
      const rotateY = Math.sin(t * 1.2) * 0.05;
      hoverRef.current.position.y += (hoverY - hoverRef.current.position.y) * 0.1;
      hoverRef.current.rotation.y += (rotateY - hoverRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <group position-z={1.5}>
      <a.group 
        rotation-x={packRotationSpring.rotationX}
        position-y={packRotationSpring.positionY}
        position-z={packSlideSpring.positionZ}
        scale={(packRotationSpring as any).scale}>

        {godPackEnabled && (
          <Sparkles
            position={[0, 1, -0.5]}
            count={80}
            size={3}
            scale={[3, 4, 2]}
            color="#ffd700"
            speed={2}
          />
        )}
        <Sparkles 
          position={[0, 2, -0.5]} 
          count={15} 
          size={1}
          scale={[2, 1.5, 0]} 
          color={"#fff"} 
          speed={1} />
        <group ref={hoverRef} >
          <a.group scale={godPackPulse.scale}>
            <Pack 
              packRef={packRef} 
              rotator={!opened} 
              state={state} 
              dispatch={dispatch} />
          </a.group>
        </group>
      </a.group>
    </group>
  );
};

export default PackViewerPack;