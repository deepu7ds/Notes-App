import { Link, useNavigate } from "react-router-dom";
import "./signUp.css";
import { useState } from "react";
import { supabase } from "../../client.js";

export default function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
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
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
          },
        },
      });
      console.log(data);
      if (error) throw error;
      alert("Check Your mail for verification");
      navigate("/login", { replace: true });
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <div className="signUp-container">
        <header>
          <h1>Get Started</h1>
          <p>Fill out the form below to continue</p>
        </header>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="name">
            <strong>Name</strong>
            <br />
            <input
              className="user-input"
              type="text"
              id="name"
              name="name"
              placeholder=""
              onChange={handleChange}
            />
          </label>

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
          <label className="terms">
            <p>
              <strong>I agree with the term of use</strong>
            </p>
            <input type="checkbox" />
          </label>

          <footer>
            <button className="button-top" type="submit">
              Sign Up
            </button>
            <span>OR</span>

            <p>
              Already have an account?{" "}
              <Link to="/login">
                <strong>Login</strong>
              </Link>
            </p>
          </footer>
        </form>
      </div>
    </>
  );
}
