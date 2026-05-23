'use client';

import { useGLTF } from '@react-three/drei';

/* =========================================================
   MineralMesh — Stibine mineral 360 interaction.

   Loads the Stibine mineral GLB. The actual rotation drift is
   handled by InteractiveGemRotation one level above so the
   PINS rotate in lockstep with the surface — otherwise the
   raycast-derived tether targets quickly become stale and
   the lines no longer touch the gem.
   ========================================================= */

const MODEL_PATH = '/models/mineral_-_stibine.glb';

export default function MineralMesh() {
  const { scene } = useGLTF(MODEL_PATH, true);

  return (
    <group scale={1} name="MineralMesh">
      <primitive object={scene} />
    </group>
  );
}

// Preload the model
useGLTF.preload(MODEL_PATH);
