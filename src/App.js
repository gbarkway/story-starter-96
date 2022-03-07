import { Background, useBackground } from './Background/Background';
import Picker from './Picker/Picker';
import Topbar from './Topbar/Topbar';
import useAudio from './useAudio';

import './App.css';

function App() {
  const [pastedImages, addScene] = useBackground();
  const [play, pause] = useAudio();

  return (
    <div className="App">
      <Topbar></Topbar>
      <Background pastedImages={pastedImages} onImageClick={(thing) => play(thing.sound)}></Background>

      <Picker
        onImagePicked={(scene) => {
          addScene(scene);
        }}
        onOpening={() => {
          pause();
        }}
      ></Picker>
    </div>
  );
}

export default App;
