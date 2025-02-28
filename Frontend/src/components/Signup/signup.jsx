import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';

import { signInWithGoogle, signInWithFacebook } from "../firebase/firebase"; // Import Google Sign-In function
import "./signup.css";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function Signup() {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'STANDARD'
  });

  // State for error message
  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post(`${API_ENDPOINT}/users`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201 || response.status === 200) {
        alert("Successful Signup");
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log("Google Logged-in User:", user);
      alert(`Welcome, ${user.displayName}!`);
      navigate('/home'); // Redirect after login
    }
  };
  const handleFacebookSignIn = async () => {
    const user = await signInWithFacebook();
    if (user) {
      console.log("facebook Logged-in User:", user);
      alert(`Welcome, ${user.displayName}!`);
      navigate('/home'); // Redirect after login
    }
  };


  return (
    <MDBContainer fluid className='p-4 signup-container'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center signup'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3 signup">
            The best offer <br />
            <span className="text-primary signup">for your business</span>
          </h1>
          <p className='px-3 signup' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>
        </MDBCol>

        <MDBCol md='6'>
          <MDBCard className='my-5 signup'>
            <MDBCardBody className='p-5 signup'>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4 signup'
                  label='Email'
                  id='email'
                  type='email'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <MDBInput
                  wrapperClass='mb-4 signup'
                  label='Password'
                  id='password'
                  type='password'
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                {error && <p className="text-danger">{error}</p>}

                <div className='text-center text-md-start mt-4 pt-2 signup'>
                  <p className="small fw-bold mt-2 pt-1 mb-2 login">
                    Already have an account? <a href="/login" className="link-danger login">Login</a>
                  </p>
                </div>

                <MDBBtn className='w-100 mb-4 signup' size='md' type="submit">
                  Sign Up
                </MDBBtn>
              </form>

              <div className="text-center signup">
                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3 signup' style={{ color: '#1266f1' }} onClick={handleGoogleSignIn}>
                  <MDBIcon fab icon='google' size="sm" /> Sign in with Google
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3 signup' style={{ color: '#1266f1' }} onClick={handleFacebookSignIn}>
                  <MDBIcon fab icon='facebook-f' size="sm" /> Sign in with Facebook
                </MDBBtn>


                <MDBBtn tag='a' color='none' className='mx-3 signup' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3 signup' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3 signup' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm" />
                </MDBBtn>
              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
