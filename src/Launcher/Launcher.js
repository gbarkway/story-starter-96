import './Launcher.css';
import '../sprite-button.css';

function Launcher({ showLabel = true, onClick = (f) => f }) {
  return (
    <div className="launcher">
      <button aria-labelledby="launch-label" className="sprite-button launch-button" type="button" title="Inspiration" onClick={onClick}></button>
      <span id="launch-label" className="launch-label" hidden={!showLabel}>
        Click for inspiration
      </span>
    </div>
  );
}

export default Launcher;
