if (process.argv.length < 3) {
  console.log('Usage: node printFileNames.js ./path/to/scene/manifest.json');
  process.exit(1);
}

const sceneManifestPath = process.argv[2];
const adventure = require(sceneManifestPath);
const filename = (name) => name.replace(/[!.&,'-?]/g, '_');
adventure.scenes.forEach((scene) => {
  console.log(filename(scene));
});
