varying vec3 vWorldPosition;
varying vec3 vCameraPosition;
varying vec3 vWolrdNormal;
varying vec2 vUv;
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = modelPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
  vCameraPosition = cameraPosition;
  vWolrdNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  vUv = uv;
}