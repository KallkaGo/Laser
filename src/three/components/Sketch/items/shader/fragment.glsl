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

void main() {
  vec2 newUV = vUv * vec2(3., 3.);
  float noiseSample = texture2D(uNoise, newUV).r;
  vec3 worldNormal = normalize(vWolrdNormal);
  if(!gl_FrontFacing)
    worldNormal *= -1.;
  float NDotV = clamp(dot(worldNormal, normalize(vCameraPosition - vWorldPosition)), 0., 1.);
  float fresnel = 1. - NDotV;
  fresnel += noiseSample * .2;
  vec4 param = vec4(1., .4, .3, 1.);
  vec3 color = CalcLaserColor(fresnel, param);
  csm_DiffuseColor.rgb *= color;
}