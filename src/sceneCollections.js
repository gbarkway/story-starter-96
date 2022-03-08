import adventure from './sceneCollectionManifests/adventure.json';
import animals from './sceneCollectionManifests/animals.json';
import familyAndFriends from './sceneCollectionManifests/family_and_friends.json';
import fantasy from './sceneCollectionManifests/fantasy.json';
import mystery from './sceneCollectionManifests/mystery.json';
import romance from './sceneCollectionManifests/romance.json';
import sports from './sceneCollectionManifests/sports.json';
import whatsGoingOn from './sceneCollectionManifests/whats_going_on.json';

// import everything in a folder
// https://webpack.js.org/guides/dependency-management/#context-module-api
const imageContext = require.context('./sceneResources/', true, /\.png$/);
const soundContext = require.context('./sceneResources/', true, /\.mp3$/);

const filename = (name) => name.replace(/[!.&,?'-]/g, '_');

const importSceneCollection = (sceneManifest) => ({
  name: sceneManifest.name,
  scenes: sceneManifest.scenes.map((scene) => ({
    name: scene,
    image: imageContext(`./${sceneManifest.directory}/${filename(scene)}.png`),
    sound: soundContext(`./${sceneManifest.directory}/${filename(scene)}.mp3`),
  })),
});

const scenes = [adventure, animals, familyAndFriends, fantasy, mystery, romance, sports, whatsGoingOn].map(importSceneCollection);

export default scenes;
