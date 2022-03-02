import adventure from './sceneManifests/adventure.json';
import animals from './sceneManifests/animals.json';
import familyAndFriends from './sceneManifests/family_and_friends.json';

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
 adventure,
 animals,
 familyAndFriends,
].map(importScenes);

export default scenes;
