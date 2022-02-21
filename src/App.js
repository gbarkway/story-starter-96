import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import '98.css'
import next from './next.ogg';
import prev from './prev.ogg';
import collections from './scenes';

function App() {
  const [collection, setCollection] = useState(collections[0])
  const [sceneIndex, setSceneIndex] = useState(0);
  const [scene, setScene] = useState(collections[0].scenes[sceneIndex]);
  const nextAudio = useRef();
  const prevAudio = useRef();

  useEffect(() => {
    setSceneIndex(0);
  }, [collection]);

  useEffect(() => {
    if (collection.scenes[sceneIndex]) {
      setScene(collection.scenes[sceneIndex])
    }
  }, [sceneIndex, collection.scenes]);

  const handleNext = () => {
    nextAudio.current.play().catch(() => {});
    setSceneIndex((sceneIndex + 1) % collection.scenes.length)
  }

  const handleSelectChange = useCallback((event) => {
    setCollection(collections.find(sc => sc.name === event.target.value));
  }, []);

  const handlePrev = () => {
    prevAudio.current.play().catch(() => {});
    if (sceneIndex) {
      setSceneIndex(sceneIndex - 1)
    } else {
      setSceneIndex(collection.scenes.length - 1)
    }
  }

  return (
    <div className="App">
      <audio src={next} ref={nextAudio}></audio>
      <audio src={prev} ref={prevAudio}></audio>
      <audio autoPlay src={scene.sound}>Your browser does not support audio</audio>
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
