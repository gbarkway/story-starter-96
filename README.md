# Story Starter 1996

Microsoft Creative Writer 2's uncanny story starters, now in your browser! Hosted [here](https://storystarter1996.ca/).

![Screenshot](screenshot.png)

## Getting Started

This project was developed with **node 16.14** and **npm 8.3.1**.

```
npm install
npm start
```

### Other Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- `npm test`
- `npm run build`

## Adding a New Scene Collection

1. Create a new folder in `./sceneResources`
2. Add an mp3 and a png to the folder. Name the files after the caption they should have. Replace all special characters with `_`. Give them the same name except for the extension.
   - E.g. for a scene called "My new scene!" there should be two files: `My new scene_.mp3` and `My new scene_.png`
3. Add a new json file to `./sceneCollectionManifests`.

```jsonc
{
  "name": "My scene collection", // appears in the dropdown
  "directory": "mySceneCollection", // name of folder in sceneResources containing mp3/png files
  "scenes": [
    "My new scene!" // scene name. Corresponds to "My new scene_.png"
  ]
}
```

4. Import the new json at the top of `sceneCollections.js`. In the same file add the imported object to the `scenes` array.

5. Open in a browser and inspect the browser console. If an image or sound in the json couldn't be found, you'll know right away.

## Imagemagick tips

Batch convert bmp files to png:

```sh
magick mogrify -format png *.bmp
```

Convert wmf files to png and resize to 400 width:

```sh
magick mogrify -format png -size 400 *.wmf
```

(These create a new image without modifying the old one.)
