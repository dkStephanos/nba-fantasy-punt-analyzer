import React, { PropTypes } from "react";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import fpaLogo from "../../assets/images/icons/CircleLogo.ico";

const Header = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <img
          src={fpaLogo}
          className="pull-left"
          style={{ maxWidth: "60px", padding: "3%", paddingRight: "5%" }}
        />
        <Navbar.Brand>
          <a href="/home">Fantasy Punt Analyzer</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/myTeam">
            My Team
          </NavItem>

          <NavDropdown eventKey={3} title="Actions" id="basic-nav-dropdown">
            <MenuItem href="/teamSelect" eventKey={3.1}>
              Team Select
            </MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Settings</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>About</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="/logout">
            Logout
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
