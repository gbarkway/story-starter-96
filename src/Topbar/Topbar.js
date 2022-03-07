import './Topbar.css';

function Topbar() {
  return (
    <header id="topbar">
      <div id="title">Story Starter 1996</div>
      <div id="links">
        <a href="https://web.archive.org/web/20000815094541/http://www.microsoft.com/kids/creativewriter/" target="_blank" rel="noreferrer">
          About
        </a>
        <span>|</span>
        <a href="https://twitter.com/gregbarkway" target="_blank" rel="noreferrer">
          Twitter
        </a>
      </div>
    </header>
  );
}

export default Topbar;
