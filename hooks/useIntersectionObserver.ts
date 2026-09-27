import { useCallback, useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number; // 교차 비율 (0~1)
  rootMargin?: string; // 루트 범위
  root?: Element | null; //기준이 되는 viewport
}

export const useIntersectionObserver = (
  callback: () => void,
  options: UseIntersectionObserverOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '0px', root = null } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const callbackRef = useRef(callback);

  // 항상 최신 callback 참조
  callbackRef.current = callback;

  const elementRef = useCallback(
    (node: Element | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          //교차된 경우
          if (entry.isIntersecting) {
            callbackRef.current();
          }
        },
        { threshold, rootMargin, root }
      );

      observerRef.current.observe(node);
    },
    [threshold, rootMargin, root]
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { elementRef };
};
