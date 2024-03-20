import { useEffect, useRef } from "react";

export function useEffectOnce(callback, when) {
  const hasRunOnce = useRef(false);
  useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [when]);
}
