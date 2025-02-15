import { Environment, OrbitControls } from "@react-three/drei";
import { useInteractStore, useLoadedStore } from "@utils/Store";
import { useEffect } from "react";
import Skirt from "./items/Skirt";
import RES from "@/three/RES";


const Sketch = () => {

  const controlDom = useInteractStore((state) => state.controlDom);

  useEffect(() => {
    useLoadedStore.setState({ ready: true });
  }, []);

  return (
    <>
      <OrbitControls domElement={controlDom} />
      <color attach={"background"} args={["black"]} />
      <ambientLight intensity={.5} />
      <Environment files={RES.texture.hdr} />
      <Skirt/>
    </>
  );
};

export default Sketch;
