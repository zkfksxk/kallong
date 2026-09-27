export function useDetectWebView() {
  // SSR 환경 체크
  if (typeof window === 'undefined') {
    return {
      isWebView: false,
      canUseBridge: false,
      isIOS: false,
      isAndroid: false,
    };
  }

  const isReactNativeWebView = window.ReactNativeWebView !== undefined;
  //브릿지 메시지를 보낼 수 있는가?
  const canUseBridge =
    typeof window.ReactNativeWebView?.postMessage === 'function';
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
    canUseBridge,
    isIOS,
    isAndroid,
  };
}
