import React from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdb-react-ui-kit";

const navbar = () => {
  return (
    <MDBNavbar expand="lg" light bgColor="light"  fixed="top">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <img
            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
            height="15"
            alt="MDB Logo"
            loading="lazy"
          />
        </MDBNavbarBrand>

        <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
          <MDBNavbarItem>
            <a className="nav-link" href="#">Dashboard</a>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <a className="nav-link" href="#">Team</a>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <a className="nav-link" href="#">Projects</a>
          </MDBNavbarItem>
        </MDBNavbarNav>

        <div className="d-flex align-items-center">
          <a className="text-reset me-3" href="#">
            <MDBIcon fas icon="shopping-cart" />
          </a>

          <MDBDropdown>
            <MDBDropdownToggle tag="a" className="text-reset me-3">
              <MDBIcon fas icon="bell" />
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link>Some news</MDBDropdownItem>
              <MDBDropdownItem link>Another news</MDBDropdownItem>
              <MDBDropdownItem link>Something else here</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>

          <MDBDropdown>
            <MDBDropdownToggle tag="a" className="d-flex align-items-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="25"
                alt="Avatar"
                loading="lazy"
              />
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link>My profile</MDBDropdownItem>
              <MDBDropdownItem link>Settings</MDBDropdownItem>
              <MDBDropdownItem link>Logout</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default navbar;
