const adventure = require('../src/sceneManifests/fantasy.json');
const filename = (name) => name.replace(/[!.&,'-?]/g, '_');
adventure.scenes.forEach((scene) => {
  console.log(filename(scene));
});
