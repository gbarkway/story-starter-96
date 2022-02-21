import { useState } from 'react';
import './App.css';
import '98.css'
import scenes from './scenes';


function App() {
  const [image, setImage] = useState(scenes[0].scenes[3].image);

  return (
    <div className="App">
      <div className="frame">
        <div className="dropdown">
          <select name="sceneCollections">
            {scenes.map((scene) => (
              <option value={scene.directory}>{scene.name}</option>
            ))}
          </select>
        </div>
        <div className="image">
          <img src={image}></img>
        </div>
      </div>
    </div>
  );
}

export default App;
