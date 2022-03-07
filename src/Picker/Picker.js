import { useState } from 'react';

import collections from '../scenes';
import Launcher from '../Launcher/Launcher';
import usePicker from './usePicker';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';

import './Picker.css';

function Picker({ onOpening = (f) => f, onImagePicked = (f) => f, onCancel = (f) => f }) {
  const [scene, next, prev, collectionName, setCollectionByName, isLoading, hideLoading, play, opened, open, close] = usePicker();
  const [showLabel, setShowLabel] = useState(true);

  return (
    <main>
      {opened ? (
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
          <figure className="image">
            <img id="main-image" src={scene.image} alt={scene.name} onClick={() => play(scene.sound)} onLoad={hideLoading}></img>
            <LoadingIndicator visible={isLoading}></LoadingIndicator>
            <figcaption className="title">{scene.name}</figcaption>
          </figure>
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
