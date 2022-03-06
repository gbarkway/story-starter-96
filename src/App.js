import { useEffect, useState } from 'react';
import './App.css';
import collections from './scenes';
import useAudio from './useAudio';
import { Background, useBackground } from './Background';
import { LoadingIndicator, useLoadingIndicator } from './LoadingIndicator';

function App() {
  // first scene+collection is randomized in below useEffect hook
  const [collection, setCollection] = useState(collections[0]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [scene, setScene] = useState(collections[0].scenes[sceneIndex]);
  const [show, setShow] = useState(false);
  const [play, pause] = useAudio();
  const [pastedImages, addScene] = useBackground();
  const [isLoading, showLoading, hideLoading] = useLoadingIndicator();

  useEffect(() => {
    const newCollection = collections[Math.floor(Math.random() * collections.length)]
    const nextSceneIndex = Math.floor(Math.random() * newCollection.scenes.length)

    setCollection(newCollection);
    setSceneIndex(nextSceneIndex);
    setScene(newCollection.scenes[nextSceneIndex]);
  }, []);

  const handleNext = () => {
    showLoading();

    const nextSceneIndex = (sceneIndex + 1) % collection.scenes.length;
    const nextScene = collection.scenes[nextSceneIndex];
    setSceneIndex(nextSceneIndex);
    setScene(nextScene);

    play(nextScene.sound);
  };

  const handleSelectChange = (event) => {
    showLoading();

    const newCollection = collections.find((sc) => sc.name === event.target.value);
    const newScene = newCollection.scenes[0];
    setSceneIndex(0);
    setScene(newScene);
    setCollection(newCollection);

    play(newScene.sound);
  }

  const handlePrev = () => {
    showLoading();

    const nextSceneIndex = (sceneIndex + 1) % collection.scenes.length;
    const nextScene = collection.scenes[nextSceneIndex];
    setSceneIndex(nextSceneIndex);
    setScene(nextScene);

    play(nextScene.sound);
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
      <Background pastedImages={pastedImages} onImageClick={(thing) => play(thing.sound)}></Background>
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
              hideLoading();
            }}></img>
            <LoadingIndicator visible={isLoading}></LoadingIndicator>
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
                pause();
                addScene(scene);
              }}
            ></button>
            <button
              type="button"
              id="close"
              title="Close"
              onClick={() => {
                setShow(false);
                pause();
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
