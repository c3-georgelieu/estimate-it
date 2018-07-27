import React from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

// FIXME: links are overriden under certain circumstances: redirect fires every time a user try to reach App component.
// TODO: improve navigation UX

const Header = () => (
  <Navbar color="light" light expand="xs">
    <NavbarBrand href="/">
      Estimate It!
    </NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink href="#/dashboard">
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/estimate/new">
          New
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/tatomyr/estimate-it">
          GitHub
        </NavLink>
      </NavItem>
    </Nav>
  </Navbar>
)

export default Header