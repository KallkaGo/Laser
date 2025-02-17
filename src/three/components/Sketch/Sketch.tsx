import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useInteractStore, useLoadedStore } from "@utils/Store";
import { useEffect } from "react";
import Skirt from "./items/Skirt";
import RES from "@/three/RES";
import { EquirectangularReflectionMapping, SRGBColorSpace } from "three";
import { useControls } from "leva";


const Sketch = () => {

  const environmentMap = useTexture(RES.texture.animeArtStyle);
  environmentMap.colorSpace = SRGBColorSpace
  environmentMap.mapping = EquirectangularReflectionMapping

  const controlDom = useInteractStore((state) => state.controlDom);

  const { envMapIntensity }= useControls('ENV',{
    envMapIntensity: {
      value: 2,
      min: 0,
      max: 5
    }
  })

  useEffect(() => {
    useLoadedStore.setState({ ready: true });
  }, []);

  return (
    <>
      <OrbitControls domElement={controlDom} />
      <color attach={"background"} args={["black"]} />
      <ambientLight intensity={1} />
      <Environment map={environmentMap} background environmentIntensity={envMapIntensity} />
      <Skirt/>
    </>
  );
};

export default Sketch;
