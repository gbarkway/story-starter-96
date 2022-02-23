import { useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './App.css';
import '98.css';
import collections from './scenes';
import useAudio from './useAudio';

function App() {
  const [collection, setCollection] = useState(collections[0]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [scene, setScene] = useState(collections[0].scenes[sceneIndex]);
  const [show, setShow] = useState(false);
  const [bgSrc, setBgSrc] = useState("http://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif")
  const [play, stop] = useAudio();
  const intervalRef = useRef();
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    if (show) {
      intervalRef.current = setInterval(() => {
        setInProp((i) => !i)
      }, 12000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [show, setShow]);

  const handleNext = () => {
    const nextSceneIndex = (sceneIndex + 1) % collection.scenes.length;
    const nextScene = collection.scenes[nextSceneIndex];

    setSceneIndex(nextSceneIndex);
    setScene(nextScene);

    play(nextScene.sound);
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
    const nextSceneIndex = sceneIndex ? sceneIndex - 1 : collection.scenes.length - 1;
    const nextScene = collection.scenes[nextSceneIndex];

    setSceneIndex(nextSceneIndex);
    setScene(nextScene);

    play(nextScene.sound);
  };

  return (
    <div className="App">
      <CSSTransition in={inProp} timeout={10000} classNames="bg">
        <img
          id="bg"
          className="bg"
          src={bgSrc}
          alt=""
        ></img>
      </CSSTransition>
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
            <img src={scene.image} alt={scene.name}></img>
          </div>
          <div className="title">
            <label>{scene.name}</label>
          </div>
          <div className="buttons">
            <button type="button" id="left" onClick={handlePrev}></button>
            <button type="button" id="right" onClick={handleNext}></button>
          </div>
          <div className="closeOk">
            <button
              type="button"
              id="close"
              onClick={() => {
                setShow(false);
                stop();
                setInProp(false);
              }}
            ></button>
          </div>
        </div>
      ) : (
        <div className="launcher">
          <button
            type="button"
            id="launch"
            onClick={() => {
              setShow(true);
              play(scene.sound);
              setInProp(true);
            }}
          ></button>
          <label>Click here for inspiration</label>
        </div>
      )}
    </div>
  );
}

export default App;
