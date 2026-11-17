import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollManager() {
  const { key } = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previousRestoration; };
  }, []);

  useLayoutEffect(() => {
    let observer;
    let restoreTimeout;
    let restoreFrame;
    let restored = false;
    const saved = navigationType === "POP" ? positions.current.get(key) : null;
    const stopWatching = () => {
      observer?.disconnect();
      if (restoreFrame) window.cancelAnimationFrame(restoreFrame);
      if (restoreTimeout) window.clearTimeout(restoreTimeout);
    };

    if (!saved) {
      window.scrollTo(0, 0);
    } else {
      const restore = () => {
        if (restored) return;
        const neededHeight = saved.y + window.innerHeight - 1;
        if (document.documentElement.scrollHeight < neededHeight) return;
        window.scrollTo(saved.x, saved.y);
        restored = true;
        stopWatching();
      };
      observer = new MutationObserver(restore);
      observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
      restoreFrame = window.requestAnimationFrame(restore);
      restoreTimeout = window.setTimeout(() => {
        if (!restored) {
          window.scrollTo(saved.x, saved.y);
          restored = true;
          stopWatching();
        }
      }, 2000);
    }

    const save = () => positions.current.set(key, { x: window.scrollX, y: window.scrollY });
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      save();
      window.removeEventListener("scroll", save);
      stopWatching();
    };
  }, [key, navigationType]);

  return null;
}
