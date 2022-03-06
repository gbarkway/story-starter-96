import { useEffect, useState } from 'react';
import collections from '../scenes';
import { useLoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import useAudio from '../useAudio';

function usePicker() {
  const [collection, setCollection] = useState(collections[0]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [scene, setScene] = useState(collections[0].scenes[sceneIndex]);
  const [play, pause] = useAudio();
  const [isLoading, showLoading, hideLoading] = useLoadingIndicator();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const newCollection = collections[Math.floor(Math.random() * collections.length)];
    const nextSceneIndex = Math.floor(Math.random() * newCollection.scenes.length);
    const nextScene = newCollection.scenes[nextSceneIndex];
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

  const handlePrev = () => {
    showLoading();

    const nextSceneIndex = sceneIndex ? sceneIndex - 1 : collection.scenes.length - 1;
    const nextScene = collection.scenes[nextSceneIndex];
    setSceneIndex(nextSceneIndex);
    setScene(nextScene);

    play(nextScene.sound);
  };

  const setCollectionByName = (name) => {
    showLoading();

    const newCollection = collections.find((sc) => sc.name === name);
    const newScene = newCollection.scenes[0];
    setSceneIndex(0);
    setScene(newScene);
    setCollection(newCollection);

    play(newScene.sound);
  };

  const open = () => {
    setOpened(true);
    play(scene.sound);
  };

  const close = () => {
    pause();
    setOpened(false);
  };

  return [scene, handleNext, handlePrev, collection.name, setCollectionByName, isLoading, hideLoading, play, opened, open, close];
}

export default usePicker;
