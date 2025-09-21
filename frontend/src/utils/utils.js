export function getDeviceType() {
  const ua = navigator.userAgent;

  if (/Mobi|Android/i.test(ua)) {
    return "DESKTOP";
  }
  if (/Tablet|iPad/i.test(ua)) {
    return "TABLET";
  }
  return "DESKTOP";
}
