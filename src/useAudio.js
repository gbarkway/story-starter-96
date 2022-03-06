import { useCallback, useEffect, useRef } from 'react';

function useAudio() {
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  const play = useCallback(
    (src) => {
      audioRef.current.src = src;
      audioRef.current.load();
      return audioRef.current.play().catch(() => {});
    },
    [audioRef]
  );

  const pause = useCallback(() => {
    audioRef.current.pause();
  }, [audioRef]);

  return [play, pause];
}

export default useAudio;
