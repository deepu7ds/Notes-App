import "./login.css";
import { useNavigate } from "react-router-dom";
import { setGuestSession } from "../../utils/localStorage.js";

export default function Login() {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    setGuestSession();
    navigate("/menu/notes", { replace: true });
  };

  const handleSignUpInstead = () => {
    navigate("/signUp", { replace: true });
  };

  return (
    <>
      <div className="login-container">
        <header>
          <h1>Welcome Back!</h1>
          <p>Continue as a guest to start using the app</p>
        </header>
        <div className="guest-action">
          <button className="button-top" onClick={handleGuestLogin}>
            Continue as Guest
          </button>
          <span>OR</span>
          <p style={{ fontWeight: 400 }}>
            Don't have an account?{" "}
            <strong
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={handleSignUpInstead}
            >
              Sign up
            </strong>
          </p>
        </div>
      </div>
    </>
  );
}
