import React, { useState } from 'react';
import './Header.css';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [openBasic, setOpenBasic] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('user_token');
      navigate('/Login');
    }
  };

  return (
    <MDBNavbar expand='lg' className='header-main-navbar'>
      <MDBContainer fluid>
        <MDBNavbarBrand tag="div" className='header-web-name'>
          <Link to="/" className='header-navbar-brand'>CyberLoop</Link>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 header-nav-buttons'>
            <MDBNavbarItem>
              <Link to="/home" className='nav-link'>
                Home
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/chat" className='nav-link header-nav-buttons'>
                Chat
              </Link>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <Link to="/blogs" className='nav-link header-nav-buttons'>
                Blogs
              </Link>
            </MDBNavbarItem>
            
            <MDBNavbarItem>
              <Link to="/faq" className='nav-link header-nav-buttons'>
                FAQ
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <span className='nav-link header-nav-buttons' style={{ cursor: 'pointer' }} onClick={handleLogout}>
                Logout
              </span>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar >
  );
}
