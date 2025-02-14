varying vec3 vWorldPosition;
varying vec3 vCameraPosition;
varying vec3 vWolrdNormal;
varying vec2 vUv;

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
  float  hueValue = fresnel * param.x + param.y;
  vec3 hsvValue = vec3(hueValue, param.z, param.w);
  vec3 color = HSVToRGB(hsvValue);
  color = pow(color, vec3(2.2));
  return color;
}

void main() {
  vec3 normal = normalize(vWolrdNormal);
  float NDotV = dot(normal, normalize(vCameraPosition - vWorldPosition));
  vec4 param = vec4(1.,0.,.5,1.);
  vec3 color = CalcLaserColor(vUv.x, param);
  color = pow(color, vec3(1./2.2));
  gl_FragColor = vec4(color, 1.0);
}