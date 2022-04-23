import { useState } from 'react';

import './Background.css';

function useBackground() {
  const [backgroundScenes, setBackgroundScenes] = useState([]);
  const addBackgroundScene = (scene) => {
    setBackgroundScenes(
      backgroundScenes.concat([
        {
          src: scene.image,
          name: scene.name,
          sound: scene.sound,
          // ensure first image centered
          top: backgroundScenes.length ? Math.random() * 100 : 40,
          left: backgroundScenes.length ? Math.random() * 100 : 30,
          rotate: Math.random() * 60 - 30,
        },
      ])
    );
  };

  return [backgroundScenes, addBackgroundScene];
}

function Background({ backgroundScenes = [], onImageClick = (f) => f }) {
  return (
    <div className="bg">
      {backgroundScenes.map((bgScene, i) => (
        <div
          style={{
            top: `${bgScene.top}%`,
            left: `${bgScene.left}%`,
            transform: `translateX(-33%) translateY(-33%) rotate(${bgScene.rotate}deg)`,
          }}
          key={`bg-scene-${i}`}
          onClick={() => {
            onImageClick(bgScene);
          }}
        >
          <img src={bgScene.src} alt={bgScene.name}></img>
        </div>
      ))}
    </div>
  );
}

export { Background, useBackground };
