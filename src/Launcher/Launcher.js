import './Launcher.css';
import '../sprite-button.css';

function Launcher({ showLabel = true, onClick = (f) => f }) {
  return (
    <div className="launcher">
      <button id="launch-button" className="sprite-button launch-button" type="button" title="Inspiration" onClick={onClick}></button>
      <label htmlFor="launch-button" className="launch-label" hidden={!showLabel}>
        Click for inspiration
        <br />
        (Turn sound on)
      </label>
    </div>
  );
}

export default Launcher;
