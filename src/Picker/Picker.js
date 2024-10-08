import { useState } from 'react';

import Launcher from '../Launcher/Launcher';
import { usePicker, collectionNames } from './usePicker';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';

import './Picker.css';
import '../sprite-button.css';

function Picker({ onOpening = (f) => f, onImagePicked = (f) => f, onCancel = (f) => f }) {
  const [scene, next, prev, collectionName, setCollectionByName, isLoading, hideLoading, play, opened, open, close] = usePicker();
  const [showLabel, setShowLabel] = useState(true);

  return (
    <main>
      {opened ? (
        <div className="frame">
          <div className="dropdown-area">
            <select
              name="scene-collections"
              value={collectionName}
              onChange={(event) => {
                setCollectionByName(event.target.value);
              }}
            >
              {collectionNames.map((name, i) => (
                <option value={name} key={`dropdown${i}`}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <figure className="image-area">
            <img id="main-image" src={scene.image} alt={scene.name} onClick={() => play(scene.sound)} onLoad={hideLoading}></img>
            <LoadingIndicator visible={isLoading}></LoadingIndicator>
            <figcaption className="caption">{scene.name}</figcaption>
          </figure>
          <div className="nav-button-area">
            <button type="button" className="sprite-button" id="left" title="Previous" aria-label="Previous" onClick={prev}></button>
            <button type="button" className="sprite-button" id="right" title="Next" aria-label="Next" onClick={next}></button>
          </div>
          <div className="confirmation-button-area">
            <button
              type="button"
              id="ok"
              title="Ok"
              aria-label="Ok"
              className="sprite-button"
              onClick={() => {
                close();
                onImagePicked(scene);
              }}
            ></button>
            <button
              type="button"
              id="close"
              title="Close"
              aria-label="Close"
              className="sprite-button"
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
          showLabel={showLabel}
          onClick={() => {
            onOpening();
            open();
            setShowLabel(false);
          }}
        ></Launcher>
      )}
    </main>
  );
}

export default Picker;
