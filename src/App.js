import { Background, useBackground } from './Background/Background';
import Picker from './Picker/Picker';
import Topbar from './Topbar/Topbar';
import useAudio from './useAudio';

import './App.css';

function App() {
  const [backgroundScenes, addBackgroundScene] = useBackground();
  const [play, pause] = useAudio();

  return (
    <div className="App">
      <Topbar></Topbar>
      <Background backgroundScenes={backgroundScenes} onImageClick={(bgScene) => play(bgScene.sound)}></Background>

      <Picker
        onImagePicked={(scene) => {
          addBackgroundScene(scene);
        }}
        onOpening={() => {
          pause();
        }}
      ></Picker>
    </div>
  );
}

export default App;
