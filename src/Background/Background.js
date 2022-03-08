import { useState } from 'react';

import './Background.css';

function useBackground() {
  const [pastedImages, setPastedImages] = useState([]);
  const addScene = (scene) => {
    setPastedImages(
      pastedImages.concat([
        {
          src: scene.image,
          name: scene.name,
          sound: scene.sound,
          // ensure first image centered
          top: pastedImages.length ? Math.random() * 100 : 40,
          left: pastedImages.length ? Math.random() * 100 : 30,
          rotate: Math.random() * 60 - 30,
        },
      ])
    );
  };

  return [pastedImages, addScene];
}

function Background({ pastedImages = [], onImageClick = (f) => f }) {
  return (
    <div className="bg">
      {pastedImages.map((thing, i) => (
        <div
          style={{
            top: `${thing.top}%`,
            left: `${thing.left}%`,
            transform: `translateX(-33%) translateY(-33%) rotate(${thing.rotate}deg)`,
          }}
          key={`pasted${i}`}
          onClick={() => {
            onImageClick(thing);
          }}
        >
          <img src={thing.src} alt={thing.name}></img>
        </div>
      ))}
    </div>
  );
}

export { Background, useBackground };
