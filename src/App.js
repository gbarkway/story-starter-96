import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import collections from './scenes';
import useAudio from './useAudio';
import Hourglass from './hourglass.png';

function App() {
  const [collection, setCollection] = useState(collections[0]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [scene, setScene] = useState(collections[0].scenes[sceneIndex]);
  const [show, setShow] = useState(false);
  const [play, stop] = useAudio();
  const [pastedImages, setPastedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingIndicatorTimer = useRef(null);
  const audioTimer = useRef(null);


  const handleNext = () => {
    if (audioTimer.current) {
      clearTimeout(audioTimer.current);
    }
    const nextSceneIndex = (sceneIndex + 1) % collection.scenes.length;
    const nextScene = collection.scenes[nextSceneIndex];

    if (loadingIndicatorTimer.current) {
      clearTimeout(loadingIndicatorTimer.current);
    }
    loadingIndicatorTimer.current = setTimeout(() => {
      setLoading(true);
    }, 1000);

    setSceneIndex(nextSceneIndex);
    setScene(nextScene);

    audioTimer.current = setTimeout(() => {
      play(nextScene.sound);
    }, 500);
  };

  const handleSelectChange = useCallback(
    (event) => {
      const newCollection = collections.find((sc) => sc.name === event.target.value);
      const newScene = newCollection.scenes[0];

      setSceneIndex(0);
      setScene(newScene);
      setCollection(newCollection);

      play(newScene.sound);
    },
    [play]
  );

  const handlePrev = () => {
    if (audioTimer.current) {
      clearTimeout(audioTimer.current);
    }
    
    const nextSceneIndex = sceneIndex ? sceneIndex - 1 : collection.scenes.length - 1;
    const nextScene = collection.scenes[nextSceneIndex];

    if (loadingIndicatorTimer.current) {
      clearTimeout(loadingIndicatorTimer.current);
    }
    loadingIndicatorTimer.current = setTimeout(() => {
      setLoading(true);
    }, 1000);

    setSceneIndex(nextSceneIndex);
    setScene(nextScene);

    audioTimer.current = setTimeout(() => {
      play(nextScene.sound);
    }, 500);
  };

  return (
    <div className="App">
      <div id="topbar">
        <div id="title">Story Starter 1996</div>
        <div id="links">
          <a href="https://web.archive.org/web/20000815094541/http://www.microsoft.com/kids/creativewriter/" target="_blank" rel="noreferrer">
            About
          </a>
          <span>|</span>
          <a href="https://twitter.com/gregbarkway" target="_blank" rel="noreferrer">
            Twitter
          </a>
        </div>
      </div>
      <div id="bg" className="bg">
        {pastedImages.map((thing, i) => (
          <div
            style={{
              top: `${thing.top}%`,
              left: `${thing.left}%`,
              transform: `translateX(-33%) translateY(-33%) rotate(${thing.rotate}deg)`,
            }}
            key={`pasted${i}`}
            onClick={() => {
              play(thing.sound)
            }}
          >
            <img src={thing.src} alt={thing.name}></img>
          </div>
        ))}
      </div>
      {show ? (
        <div className="frame">
          <div className="dropdown">
            <select name="sceneCollections" value={collection.name} onChange={handleSelectChange}>
              {collections.map((collection, i) => (
                <option value={collection.name} key={`dropdown${i}`}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>
          <div className="image">
            <img id="main-image" src={scene.image} alt={scene.name} onClick={() => play(scene.sound)} onLoad={() => { 
              setLoading(false);
              if (loadingIndicatorTimer.current) {
                clearTimeout(loadingIndicatorTimer.current);
              }
            }}></img>
            <img id="loading" src={Hourglass} alt="Loading" style={{"visibility": loading ? "visible" : "hidden"}}></img>
          </div>
          <div className="title">
            <label>{scene.name}</label>
          </div>
          <div className="buttons">
            <button type="button" id="left" title="Previous" onClick={handlePrev}></button>
            <button type="button" id="right" title="Next" onClick={handleNext}></button>
          </div>
          <div className="closeOk">
            <button
              type="button"
              id="ok"
              title="Ok"
              onClick={() => {
                setShow(false);
                stop();
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
              }}
            ></button>
            <button
              type="button"
              id="close"
              title="Close"
              onClick={() => {
                setShow(false);
                stop();
              }}
            ></button>
          </div>
        </div>
      ) : (
        <div className="launcher">
          <button
            type="button"
            id="launch"
            title="Inspiration"
            onClick={() => {
              setShow(true);
              play(scene.sound);
            }}
          ></button>
          {/* {pastedImages.length ? null : <label>Turn on sound and click for inspiration</label>} */}
        </div>
      )}
    </div>
  );
}

export default App;
