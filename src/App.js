import { useCallback, useEffect, useState } from 'react';
import './App.css';
import '98.css'
import collections from './scenes';


function App() {
  const [scene, setScene] = useState(collections[0].scenes[0]);
  const [collection, setCollection] = useState(collections[0])

  const handleSelectChange = useCallback((event) => {
    setCollection(collections.find(sc => sc.name === event.target.value));
  }, []);

  useEffect(() => {
    setScene(collection.scenes[0])
  }, [collection])

  useEffect(() => {
    console.log(scene)
  }, [scene])

  return (
    <div className="App">
      <audio autoPlay src={scene.sound}>Your browser does not support audio</audio>
      <div className="frame">
        <div className="dropdown">
          <select name="sceneCollections" value={collection.name} onChange = {handleSelectChange}>
            {collections.map((collection, i) => (
              <option value={collection.name} key={`dropdown${i}`}>{collection.name}</option>
            ))}
          </select>
        </div>
        <div className="image">
          <img src={scene.image}></img>
        </div>
      </div>
    </div>
  );
}

export default App;
