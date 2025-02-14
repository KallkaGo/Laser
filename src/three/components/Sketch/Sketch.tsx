import { OrbitControls } from "@react-three/drei";
import { useInteractStore, useLoadedStore } from "@utils/Store";
import { useEffect } from "react";
import vertexShader from '../shader/vertex.glsl'
import fragmentShader from '../shader/fragment.glsl'

const Sketch = () => {
  const controlDom = useInteractStore((state) => state.controlDom);

  useEffect(() => {
    useLoadedStore.setState({ ready: true });
  }, []);

  return (
    <>
      <OrbitControls domElement={controlDom} />
      <color attach={"background"} args={["black"]} />
      <mesh>
        <planeGeometry args={[2,2,128,128]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </>
  );
};

export default Sketch;
