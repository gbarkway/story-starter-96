import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import '98.css'
import collections from './scenes';

function App() {
  const [collection, setCollection] = useState(collections[0])
  const [sceneIndex, setSceneIndex] = useState(0);
  const [scene, setScene] = useState(collections[0].scenes[sceneIndex]);
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  const handleNext = () => {
    const nextSceneIndex = (sceneIndex + 1) % collection.scenes.length;
    const nextScene = collection.scenes[nextSceneIndex];

    setSceneIndex(nextSceneIndex);
    setScene(nextScene);

    audioRef.current.src = nextScene.sound;
    audioRef.current.load();
    audioRef.current.play();
  }

  const handleSelectChange = useCallback((event) => {
    const newCollection = collections.find(sc => sc.name === event.target.value);
    const newScene = newCollection.scenes[0];

    setSceneIndex(0);
    setScene(newScene);
    setCollection(newCollection);
  }, []);

  const handlePrev = () => {
    const nextSceneIndex = sceneIndex ? (sceneIndex - 1) : (collection.scenes.length - 1)
    const nextScene = collection.scenes[nextSceneIndex]

    setSceneIndex(nextSceneIndex)
    setScene(nextScene)
  }

  return (
    <div className="App">
      <div className="frame">
        <div className="dropdown">
          <select name="sceneCollections" value={collection.name} onChange = {handleSelectChange}>
            {collections.map((collection, i) => (
              <option value={collection.name} key={`dropdown${i}`}>{collection.name}</option>
            ))}
          </select>
        </div>
        <div className="image">
          <img src={scene.image}></img>
        </div>
        <div className="title">
          <label>{scene.name}</label>
        </div>
        <div className="buttons">
          <button type="button" id="left" onClick={handlePrev}></button>
          <button type="button" id="right" onClick={handleNext}></button>
        </div>
      </div>
    </div>
  );
}

export default App;
