import { useEffect, useRef } from 'react';

function useAudio() {
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  function play(src) {
    audioRef.current.src = src;
    audioRef.current.load();
    return audioRef.current.play();
  }

  function stop() {
    audioRef.current.load();
  }

  return [play, stop];
}

export default useAudio;
