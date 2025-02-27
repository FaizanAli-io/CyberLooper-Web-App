import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { signInWithGoogle } from "../firebase/firebase"; // Import Google Sign-In function

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT; // Ensure this is set correctly in .env

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Manual login)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post(`${API_ENDPOINT}/users/login`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.status === 201 || response.status === 200) {
        setMessage("Login successful!");
        alert("Login successful!");
        localStorage.setItem("user_token", response.data.accessToken);
        navigate("/Chat");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log("Google Logged-in User:", user);
      alert(`Welcome, ${user.displayName}!`);
      localStorage.setItem("user_token", user.accessToken); // Store token
      navigate("/Chat"); // Redirect to chat page
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom login">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
               className="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <div className="d-flex flex-row align-items-center justify-content-center login">
            <p className="lead fw-normal mb-0 me-3 login">Sign in with</p>
            <MDBBtn floating size='md' tag='a' className='me-2'><MDBIcon fab icon='facebook-f' /></MDBBtn>
            <MDBBtn floating size='md' tag='a' className='me-2'><MDBIcon fab icon='twitter' /></MDBBtn>
            <MDBBtn floating size='md' tag='a' className='me-2'><MDBIcon fab icon='linkedin-in' /></MDBBtn>
          </div>

          <div className="divider d-flex align-items-center my-4 login">
            <p className="text-center fw-bold mx-3 mb-0 login">Or</p>
          </div>

          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}

          <form onSubmit={handleSubmit}>
            <MDBInput wrapperClass='mb-4 login' label='Email address' id='email' type='email' size="lg"
                      name="email" value={formData.email} onChange={handleChange} required />
            <MDBInput wrapperClass='mb-4 login' label='Password' id='password' type='password' size="lg"
                      name="password" value={formData.password} onChange={handleChange} required />

            <div className="d-flex justify-content-between mb-4 login">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>

            <div className='text-center text-md-start mt-4 pt-2 login'>
              <MDBBtn className="mb-0 px-5 login" size='lg' type="submit">Login</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2 login">
                Don't have an account? <a href="signup" className="link-danger login">Register</a>
              </p>
            </div>
          </form>

          <div className="text-center signup">
            <p>or sign in with:</p>

            <MDBBtn tag='a' color='none' className='mx-3 login' style={{ color: '#1266f1' }} onClick={handleGoogleSignIn}>
              <MDBIcon fab icon='google' size="sm" /> Sign in with Google
            </MDBBtn>
          </div>

        </MDBCol>
      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary login">
        <div className="text-white mb-3 mb-md-0 login">Copyright © 2024. All rights reserved.</div>
        <div>
          <MDBBtn tag='a' color='none' className='mx-3 login' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md"/>
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3 login' style={{ color: 'white' }}>
            <MDBIcon fab icon='twitter' size="md"/>
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3 login' style={{ color: 'white' }} onClick={handleGoogleSignIn}>
            <MDBIcon fab icon='google' size="md"/> Sign in with Google
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3 login' style={{ color: 'white' }}>
            <MDBIcon fab icon='linkedin-in' size="md"/>
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}

export default Login;
