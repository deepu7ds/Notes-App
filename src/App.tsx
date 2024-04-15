import "./App.css";
import notes from "./assets/notes.png";

function App() {
  return (
    <>
      <div className="app-container">
        <div className="navbar">
          <h1>Notes</h1>
        </div>
        <div className="main-content">
          <div className="image">
            <img src={notes} alt="" />
          </div>
          <div className="bottom-panel">
            <p>
              Create & design your <strong>Notes Easily</strong>
            </p>
            <button>Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
