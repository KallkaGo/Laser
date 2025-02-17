/* 
Reference：https://zhuanlan.zhihu.com/p/487204843
 */

varying vec3 vWorldPosition;
varying vec3 vCameraPosition;
varying vec3 vWolrdNormal;
varying vec2 vUv;

uniform sampler2D uNoise;

vec3 HUEToRGB(float h) {
  vec3 color;
  color.r = abs(h * 6. - 3.) - 1.;
  color.g = 2. - abs(h * 6. - 2.);
  color.b = 2. - abs(h * 6. - 4.);
  color = clamp(color, vec3(0.), vec3(1.));
  return color;
}

vec3 HSVToRGB(vec3 hsv) {
  vec3 rgb = HUEToRGB(hsv.x);
  vec3 color = ((rgb - 1.) * hsv.y + 1.) * hsv.z;
  return color;
}

vec3 CalcLaserColor(float fresnel, vec4 param) {
  float hueValue = fresnel * param.x + param.y;
  vec3 hsvValue = vec3(hueValue, param.z, param.w);
  vec3 color = HSVToRGB(hsvValue);
  color = pow(color, vec3(2.2));
  return color;
}

float blendOverlay(float base, float blend) {
  return base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
  return vec3(blendOverlay(base.r, blend.r), blendOverlay(base.g, blend.g), blendOverlay(base.b, blend.b));
}

void main() {
  vec2 newUV = vUv * vec2(3., 3.);
  float noiseSample = texture2D(uNoise, newUV).r;
  vec3 worldNormal = normalize(vWolrdNormal);
  if(!gl_FrontFacing)
    worldNormal *= -1.;
  float NDotV = clamp(dot(worldNormal, normalize(vCameraPosition - vWorldPosition)), 0., 1.);
  float fresnel = 1. - NDotV;
  fresnel += noiseSample * .2;
  vec4 param = vec4(.6, .4, .3, .8);
  vec3 laserColor = CalcLaserColor(fresnel, param);
  vec3 objectColor = csm_DiffuseColor.rgb;
  vec3 finalColor = blendOverlay(objectColor, laserColor);
  csm_DiffuseColor.rgb = finalColor;
  csm_Roughness = .1;
}