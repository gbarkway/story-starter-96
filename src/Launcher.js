function Launcher({ onClick = (f) => f }) {
  return (
    <div className="launcher">
      <button type="button" id="launch" title="Inspiration" onClick={onClick}></button>
    </div>
  );
}

export default Launcher;
