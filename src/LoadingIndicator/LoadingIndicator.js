import { useRef, useState } from 'react';

import Hourglass from './hourglass.png';
import './LoadingIndicator.css';

function useLoadingIndicator() {
  const [loading, setLoading] = useState(false);
  const loadingIndicatorTimer = useRef(null);

  const opened = () => {
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

  return [loading, opened, hide];
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
