import './Launcher.css';
import '../sprite-button.css';

function Launcher({ showLabel = true, onClick = (f) => f }) {
  return (
    <div className="launcher">
      <button aria-labelledby="launch-label" className="sprite-button" type="button" id="launch-button" title="Inspiration" onClick={onClick}></button>
      <span id="launch-label" hidden={!showLabel}>
        Click for inspiration
      </span>
    </div>
  );
}

export default Launcher;
