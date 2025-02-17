import { useGLTF, useTexture } from "@react-three/drei"
import RES from "@/three/RES"
import { useEffect, useMemo } from "react"
import { DoubleSide, Mesh, MeshStandardMaterial, RepeatWrapping, Uniform } from "three"
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import vertexShader from './shader/vertex.glsl'
import fragmentShader from './shader/fragment.glsl'
import { useControls } from "leva";

const Skirt = () => {
  const skirtGltf = useGLTF(RES.model.skirt)
  
  const noiseTex = useTexture(RES.texture.noise)
  noiseTex.wrapS = noiseTex.wrapT = RepeatWrapping

  
  const uniforms = useMemo(() => ({
    uNoise: new Uniform(noiseTex),
    uSaturation:new Uniform(0),
    uBrightness:new Uniform(0),
    uLightSpan:new Uniform(0),
    uLightOffset:new Uniform(0),
  }), [noiseTex])

  useControls('Laser',{
    lightSpan: {
      // 0.6
      value:1,
      min: 0,
      max: 1,
      step: 0.01,
      onChange:(v:number)=>{
        uniforms.uLightSpan.value = v
      }
    },
    lightOffset: {
      // 0.4
      value:0,
      min: 0,
      max: 1,
      step: 0.01,
      onChange:(v:number)=>{
        uniforms.uLightOffset.value = v
      }
    },
    saturation: {
      // 0.3
      value: 0.4,
      min: 0,
      max:1,
      step:0.01,
      onChange: (v: number) => {
        uniforms.uSaturation.value = v
      }
    },
    brightness: {
      value: 0.8,
      min: 0,
      max:1,
      step:0.01,
      onChange:(v:number)=>{
        uniforms.uBrightness.value = v
      }
    },
  
  })

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
          uniforms,
        })
      }
    })
  },[])

  return (
    <primitive object={skirtGltf.scene} />
  )
}

export default Skirt