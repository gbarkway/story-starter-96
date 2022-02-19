export default function importAssets(path) {
    // import everything in a folder
    // https://webpack.js.org/guides/dependency-management/#context-module-api
    const imageContext = require.context('./assets/adventure/', true, /\.png$/)
    const soundContext = require.context('./assets/adventure/', true, /\.ogg$/)

    return name => ({
        image: imageContext(`./${name}.png`),
        sound: soundContext(`./${name}.ogg`)
    })
}
