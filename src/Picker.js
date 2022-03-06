import usePicker from './usePicker';
import { LoadingIndicator } from './LoadingIndicator';
import Launcher from './Launcher';
import collections from './scenes';

function Picker({ onOpening = (f) => f, onImagePicked = (f) => f, onCancel = (f) => f }) {
  const [scene, next, prev, collectionName, setCollectionByName, isLoading, hideLoading, play, opened, open, close] = usePicker();

  return opened ? (
    <div className="frame">
      <div className="dropdown">
        <select
          name="sceneCollections"
          value={collectionName}
          onChange={(event) => {
            setCollectionByName(event.target.value);
          }}
        >
          {collections
            .map((collection) => collection.name)
            .map((name, i) => (
              <option value={name} key={`dropdown${i}`}>
                {name}
              </option>
            ))}
        </select>
      </div>
      <div className="image">
        <img id="main-image" src={scene.image} alt={scene.name} onClick={() => play(scene.sound)} onLoad={hideLoading}></img>
        <LoadingIndicator visible={isLoading}></LoadingIndicator>
      </div>
      <div className="title">
        <label>{scene.name}</label>
      </div>
      <div className="buttons">
        <button type="button" id="left" title="Previous" onClick={prev}></button>
        <button type="button" id="right" title="Next" onClick={next}></button>
      </div>
      <div className="closeOk">
        <button
          type="button"
          id="ok"
          title="Ok"
          onClick={() => {
            close();
            onImagePicked(scene);
          }}
        ></button>
        <button
          type="button"
          id="close"
          title="Close"
          onClick={() => {
            close();
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
        onOpening();
        open();
      }}
    ></Launcher>
  );
}

export default Picker;
