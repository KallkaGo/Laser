import { useGLTF, useTexture } from "@react-three/drei"
import RES from "@/three/RES"
import { useEffect, useMemo } from "react"
import { DoubleSide, Mesh, MeshStandardMaterial, RepeatWrapping, Uniform } from "three"
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import vertexShader from './shader/vertex.glsl'
import fragmentShader from './shader/fragment.glsl'

const Skirt = () => {
  const skirtGltf = useGLTF(RES.model.skirt)
  
  const noiseTex = useTexture(RES.texture.noise)
  noiseTex.wrapS = noiseTex.wrapT = RepeatWrapping

  const uniforms = useMemo(() => ({
    uNoise: new Uniform(noiseTex)
  }), [noiseTex])

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
          side:DoubleSide,
          uniforms
        })
      }
    })
  },[])

  return (
    <primitive object={skirtGltf.scene} />
  )
}

export default Skirt