export function useDetectWebView() {
  // SSR 환경 체크
  if (typeof window === 'undefined') {
    return {
      isWebView: false,
      isIOSWebView: false,
      isAndroidWebView: false,
      isIOS: false,
      isAndroid: false,
    };
  }

  const isReactNativeWebView = window.ReactNativeWebView !== undefined;

  const userAgent = navigator.userAgent;

  // iOS 감지
  const isIOS = /iPhone|iPad|iPod/.test(userAgent);
  const isWebKit = /AppleWebKit/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/CriOS|FxiOS/.test(userAgent);
  const isIOSWebView = isIOS && isWebKit && !isSafari;

  // Android 감지
  const isAndroid = /Android/.test(userAgent);
  const isAndroidWebView = isAndroid && /wv/.test(userAgent);

  return {
    isWebView: isReactNativeWebView || isIOSWebView || isAndroidWebView,
    isIOS,
    isAndroid,
  };
}
