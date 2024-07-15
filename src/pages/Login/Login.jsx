import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../client.js";

export default function Login({ setToken }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
      if (error) throw error;

      setToken(data);
      // console.log(data);
      navigate("/menu/notes", { replace: true });
    } catch (error) {
      alert(error);
    }
  }

  const handleSignUpInstead = () => {
    navigate("/signUp", { replace: true });
  };
  return (
    <>
      <div className="login-container">
        <header>
          <h1>Welcome Back!</h1>
          <p>Fill out the form below to continue</p>
        </header>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="email">
            <strong>Email</strong>
            <br />
            <input
              className="user-input"
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder=""
            />
          </label>

          <label htmlFor="password">
            <strong>Password</strong>
            <br />
            <input
              className="user-input"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder=""
            />
          </label>
          <footer>
            <button className="button-top" type="submit">
              Login
            </button>
            <span>OR</span>
            <p style={{ fontWeight: 400 }}>
              Don't have an account?{" "}
              <strong
                style={{ textDecoration: "underline" }}
                onClick={handleSignUpInstead}
              >
                Sign up
              </strong>
            </p>
          </footer>
        </form>
      </div>
    </>
  );
}
