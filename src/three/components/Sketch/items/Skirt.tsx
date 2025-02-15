import { useGLTF } from "@react-three/drei"
import RES from "@/three/RES"
import { useEffect } from "react"
import { DoubleSide, Mesh, MeshStandardMaterial } from "three"
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import vertexShader from './shader/vertex.glsl'
import fragmentShader from './shader/fragment.glsl'

const Skirt = () => {
  const skirtGltf = useGLTF(RES.model.skirt)
    console.log('skirtGltf',skirtGltf);

  useEffect(()=>{
    skirtGltf.scene.traverse((child)=>{
      if((child as Mesh).isMesh){
        const mesh = child as Mesh
        const oldMat = mesh.material as MeshStandardMaterial
        mesh.material = new CustomShaderMaterial({
          baseMaterial: oldMat,
          silent:true,
          vertexShader,
          fragmentShader,
          side:DoubleSide
        })
      }
    })
  },[])

  return (
    <primitive object={skirtGltf.scene} />
  )
}

export default Skirt