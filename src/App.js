import { useState } from 'react';
import './App.css';
import scenes from './scenes';

function App() {
  const [image, setImage] = useState(scenes[0].scenes[3].image);
  return (
    <div className="App">
      <div className="asdf">
        <img src={image}></img>
      </div>
    </div>
  );
}

export default App;
