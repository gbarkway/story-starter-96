import { useCallback, useState } from 'react';
import './App.css';
import '98.css';
import collections from './scenes';
import useAudio from './useAudio';

function App() {
  const [collection, setCollection] = useState(collections[0]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [scene, setScene] = useState(collections[0].scenes[sceneIndex]);
  const [show, setShow] = useState(false);
  const [play, stop] = useAudio();

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
              id="ok"
              onClick={() => {
                setShow(false);
                stop();
              }}
            ></button>
            <button
              type="button"
              id="close"
              onClick={() => {
                setShow(false);
                stop();
              }}
            ></button>

          </div>
        </div>
      ) : (
        <div class="launcher">
          <button
            type="button"
            id="launch"
            onClick={() => {
              setShow(true);
              play(scene.sound);
            }}
          ></button>
          <label>Click here for inspiration</label>
        </div>
      )}
    </div>
  );
}

export default App;
