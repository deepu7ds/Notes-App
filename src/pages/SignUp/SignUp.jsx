import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./signUp.css";
import { supabase } from "../../client.js";

export default function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);

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

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleLoginInstead = () => {
    navigate("/login", { replace: true });
  };
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
              required
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
              required
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
              required
            />
          </label>
          <label className="terms">
            <p>
              <strong
                style={{
                  fontWeight: 400,
                  color: isChecked ? "black" : "grey",
                }}
              >
                I agree with the term of use
              </strong>
            </p>
            <input type="checkbox" onChange={handleCheckboxChange} required />
          </label>

          <footer>
            <button className="button-top" type="submit">
              Sign Up
            </button>
            <span>OR</span>

            <p style={{ fontWeight: 400 }}>
              Already have an account?{" "}
              <strong
                style={{ textDecoration: "underline" }}
                onClick={handleLoginInstead}
              >
                Login
              </strong>
            </p>
          </footer>
        </form>
      </div>
    </>
  );
}
