import Script from 'next/script';

export const GoogleAdSense = () => {
  if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
    return null;
  }
  return (
    <Script
      async
      src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3981909285877075'
      crossOrigin='anonymous'
      strategy='afterInteractive'
    />
  );
};
