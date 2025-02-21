import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import "./signup.css"
function signup() {
  return (
    <MDBContainer fluid className='p-4 signup-container'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center  signup'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3  signup">
            The best offer <br />
            <span className="text-primary signup">for your business</span>
          </h1>

          <p className='px-3 signup' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>

        </MDBCol>

        <MDBCol md='6'>

          <MDBCard className='my-5 signup'>
            <MDBCardBody className='p-5 signup'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4 signup' label='First name' id='form1' type='text'/>
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4 signup' label='Last name' id='form1' type='text'/>
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4 signup' label='Email' id='form1' type='email'/>
              <MDBInput wrapperClass='mb-4 signup' label='Password' id='form1' type='password'/>


                <div className='text-center text-md-start mt-4 pt-2 signup'>
                            <p className="small fw-bold mt-2 pt-1 mb-2 login">Already have an account <a href="login" className="link-danger login">Login</a></p>
                          </div>


              <MDBBtn className='w-100 mb-4 signup' size='md'>sign up</MDBBtn>

              <div className="text-center signup">

                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3 signup' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3 signup' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3 signup' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3 signup' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>

              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default signup;