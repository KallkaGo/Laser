import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useInteractStore, useLoadedStore } from "@utils/Store";
import { useEffect } from "react";
import Skirt from "./items/Skirt";
import RES from "@/three/RES";
import { EquirectangularReflectionMapping, SRGBColorSpace } from "three";


const Sketch = () => {

  const environmentMap = useTexture(RES.texture.animeArtStyle);
  environmentMap.colorSpace = SRGBColorSpace
  environmentMap.mapping = EquirectangularReflectionMapping

  const controlDom = useInteractStore((state) => state.controlDom);


  useEffect(() => {
    useLoadedStore.setState({ ready: true });
  }, []);

  return (
    <>
      <OrbitControls domElement={controlDom} />
      <color attach={"background"} args={["black"]} />
      <ambientLight intensity={1} />
      <Environment map={environmentMap} background environmentIntensity={2} />
      <Skirt/>
    </>
  );
};

export default Sketch;
