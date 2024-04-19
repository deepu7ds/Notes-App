import { useNavigate } from "react-router";
import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate("/");
    window.location.reload();
  }
  return (
    <>
      <div className="profile-container">
        <button className="sign-out" onClick={handleClick}>
          Sign Out
        </button>
      </div>
    </>
  );
}
