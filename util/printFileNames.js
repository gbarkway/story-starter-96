const adventure = require('../src/sceneManifests/adventure.full.json')
const filename = name => name.replace(/[!.&,'-?]/g, '_');
adventure.scenes.forEach((scene) => {
    console.log(filename(scene))
})
