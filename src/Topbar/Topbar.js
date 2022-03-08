import './Topbar.css';

function Topbar() {
  return (
    <header className="top-bar">
      <h1 className="title">Story Starter 1996</h1>
      <nav className="links">
        <a href="https://web.archive.org/web/20000815094541/http://www.microsoft.com/kids/creativewriter/" target="_blank" rel="noreferrer">
          About
        </a>
        <span className="separator"></span>
        <a href="https://twitter.com/gregbarkway" target="_blank" rel="noreferrer">
          Twitter
        </a>
      </nav>
    </header>
  );
}

export default Topbar;
