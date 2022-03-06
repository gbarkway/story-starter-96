import { useEffect, useState } from 'react';
import collections from './scenes';
import { LoadingIndicator, useLoadingIndicator } from './LoadingIndicator';
import useAudio from './useAudio';
import Launcher from './Launcher';

function Picker({ onLauncherClicked = f => f, onImagePicked = f => f, onCancel = f => f}) {
  const [collection, setCollection] = useState(collections[0]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [scene, setScene] = useState(collections[0].scenes[sceneIndex]);
  const [play, pause] = useAudio();
  const [isLoading, showLoading, hideLoading] = useLoadingIndicator();
  const [show, setShow] = useState(false)

  useEffect(() => {
    const newCollection = collections[Math.floor(Math.random() * collections.length)]
    const nextSceneIndex = Math.floor(Math.random() * newCollection.scenes.length)
    const nextScene = newCollection.scenes[nextSceneIndex]
    setCollection(newCollection);
    setSceneIndex(nextSceneIndex);
    setScene(nextScene);
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

    const nextSceneIndex = sceneIndex ? (sceneIndex - 1) : collection.scenes.length -1;
    const nextScene = collection.scenes[nextSceneIndex];
    setSceneIndex(nextSceneIndex);
    setScene(nextScene);

    play(nextScene.sound);
  };

  return show ? (
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
            pause();
            setShow(false);
            onImagePicked(scene);
          }}
        ></button>
        <button
          type="button"
          id="close"
          title="Close"
          onClick={() => {
            pause();
            setShow(false);
            onCancel();
          }}
        ></button>
      </div>
    </div>
  ) : (
    // Play sound on launcher click instead of on frame shown b/c mobile browsers 
    // block sounds unless played from onclick
    <Launcher
      onClick={() => {
        onLauncherClicked();
        setShow(true);
        play(scene.sound);
      }}
    ></Launcher>
  )
}

export default Picker;