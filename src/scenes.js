import adventure from './sceneManifests/adventure.json';

// import everything in a folder
// https://webpack.js.org/guides/dependency-management/#context-module-api
const imageContext = require.context('./assets/', true, /\.png$/)
const soundContext = require.context('./assets/', true, /\.ogg$/)

const filename = name => name.replace(/[!.&,?'-]/g, '_');

const importScenes = sceneManifest => ({
    name: sceneManifest.name,
    scenes: sceneManifest.scenes.map(scene => ({
        name: scene,
        image: imageContext(`./${sceneManifest.directory}/${filename(scene)}.png`),
        sound: soundContext(`./${sceneManifest.directory}/${filename(scene)}.ogg`)
    }))
})

const scenes = [
    importScenes(adventure),
]

export default scenes;