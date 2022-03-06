import { useState, useRef } from 'react';
import Hourglass from './hourglass.png';

function useLoadingIndicator() {
  const [loading, setLoading] = useState(false);
  const loadingIndicatorTimer = useRef(null);

  const show = () => {
    if (loadingIndicatorTimer.current) {
      clearTimeout(loadingIndicatorTimer.current);
    }
    loadingIndicatorTimer.current = setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  const hide = () => {
    setLoading(false);
    if (!loadingIndicatorTimer.current) return;

    clearTimeout(loadingIndicatorTimer.current);
    loadingIndicatorTimer.current = null;
  };

  return [loading, show, hide];
}

function LoadingIndicator({ visible = false }) {
  return (
    <img
      id="loading"
      src={Hourglass}
      alt="Loading"
      style={{
        visibility: visible ? 'visible' : 'hidden',
      }}
    ></img>
  );
}

export { LoadingIndicator, useLoadingIndicator };
