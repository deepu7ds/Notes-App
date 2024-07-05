import notes from "../../assets/notes.png";
import "./homeContent.css";
import { Link, useNavigate } from "react-router-dom";

export default function HomeContent() {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate("/signUp");
  }
  return (
    <>
      <div className="main-content">
        <div className="image-container">
          <img src={notes} alt="" />
        </div>
        <div className="bottom-panel">
          <p>
            Create & design your <strong>Notes Easily</strong>
          </p>
          <button onClick={handleClick}>Get Started</button>
          <span className="footer-text">
            Already have an account?{" "}
            <strong>
              <Link to="/login">Log In</Link>
            </strong>
          </span>
        </div>
      </div>
    </>
  );
}
