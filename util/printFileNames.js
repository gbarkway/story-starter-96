const adventure = require('../src/sceneManifests/family_and_friends.json');
const filename = (name) => name.replace(/[!.&,'-?]/g, '_');
adventure.scenes.forEach((scene) => {
  console.log(filename(scene));
});
