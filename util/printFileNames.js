const adventure = require('../src/sceneManifests/animals.json');
const filename = (name) => name.replace(/[!.&,'-?]/g, '_');
adventure.scenes.forEach((scene) => {
  console.log(filename(scene));
});
