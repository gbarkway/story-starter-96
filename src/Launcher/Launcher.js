import { useState } from 'react';
import './Launcher.css';

function Launcher({ showLabel=true, onClick = (f) => f }) {
  return (
    <div className="launcher">
      <button aria-labelledby="launch-label" type="button" id="launch" title="Inspiration" onClick={onClick}></button>
      <span id="launch-label" hidden={!showLabel}>Click for inspiration</span>
    </div>
  );
}

export default Launcher;
