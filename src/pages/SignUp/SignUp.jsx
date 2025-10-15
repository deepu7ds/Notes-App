import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { setGuestSession } from "../../utils/localStorage.js";

export default function SignUp() {
  const navigate = useNavigate();

  const handleGuestSignup = () => {
    setGuestSession();
    navigate("/menu/notes", { replace: true });
  };

  const handleLoginInstead = () => {
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="signUp-container">
        <header>
          <h1>Get Started</h1>
          <p>Continue as a guest to start using the app</p>
        </header>
        <div className="guest-action">
          <button className="button-top" onClick={handleGuestSignup}>
            Continue as Guest
          </button>
          <span>OR</span>
          <p style={{ fontWeight: 400 }}>
            Already have an account?{" "}
            <strong
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={handleLoginInstead}
            >
              Login
            </strong>
          </p>
        </div>
      </div>
    </>
  );
}
