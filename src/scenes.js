import adventure from './sceneManifests/adventure.json';
import animals from './sceneManifests/animals.json';

// import everything in a folder
// https://webpack.js.org/guides/dependency-management/#context-module-api
const imageContext = require.context('./scenes/', true, /\.png$/);
const soundContext = require.context('./scenes/', true, /\.mp3$/);

const filename = (name) => name.replace(/[!.&,?'-]/g, '_');

const importScenes = (sceneManifest) => ({
  name: sceneManifest.name,
  scenes: sceneManifest.scenes.map((scene) => ({
    name: scene,
    image: imageContext(`./${sceneManifest.directory}/${filename(scene)}.png`),
    sound: soundContext(`./${sceneManifest.directory}/${filename(scene)}.mp3`),
  })),
});

const scenes = [
  importScenes(adventure),
  importScenes(animals),
];

export default scenes;
