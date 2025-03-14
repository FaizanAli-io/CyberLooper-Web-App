import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { signInWithGoogle, signInWithMicrosoft } from "../firebase/firebase.js";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/users/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("user_token", response.data.accessToken);
        navigate("/Chat");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  const handleSocialLogin = async (provider) => {
    let user;
    if (provider === "google") {
      user = await signInWithGoogle();
    } else if (provider === "microsoft") {
      user = await signInWithMicrosoft();
    }

    if (user) {
      console.log(`${provider} Logged-in User:`, user);
      localStorage.setItem("user_token", user.accessToken);
      navigate("/Chat");
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom login">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <div className="d-flex flex-row align-items-center justify-content-center login">
            <p className="lead fw-normal mb-0 me-3 login">Sign in with</p>
            <MDBBtn
              floating
              size="md"
              tag="a"
              className="me-2"
              onClick={() => handleSocialLogin("google")}
            >
              <MDBIcon fab icon="google" />
            </MDBBtn>
            <MDBBtn
              floating
              size="md"
              tag="a"
              className="me-2"
              onClick={() => handleSocialLogin("microsoft")}
            >
              <MDBIcon fab icon="microsoft" />
            </MDBBtn>
          </div>

          <div className="divider d-flex align-items-center my-4 login">
            <p className="text-center fw-bold mx-3 mb-0 login">Or</p>
          </div>

          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}

          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4 login"
              label="Email address"
              id="email"
              type="email"
              size="lg"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="position-relative">
              <MDBInput
                wrapperClass="mb-4 login"
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                size="lg"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <MDBIcon icon={showPassword ? "eye-slash" : "eye"} />
              </span>
            </div>

            <div className="d-flex justify-content-between mb-4 login">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <div className="text-center text-md-start mt-4 pt-2 login">
              <MDBBtn className="mb-0 px-5 login" size="lg" type="submit">
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2 login">
                Don't have an account?{" "}
                <a href="signup" className="link-danger login">
                  Register
                </a>
              </p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
