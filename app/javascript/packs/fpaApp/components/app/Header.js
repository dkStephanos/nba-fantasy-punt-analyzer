import React, { PropTypes } from "react";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import fpaLogo from "../../assets/images/icons/CircleLogo.ico";
import { auth } from "../../utils/init";

const Header = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <img
          src={fpaLogo}
          className="pull-left img-fluid"
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
        </Nav>
        {auth.loggedIn() ? (
          <Nav pullRight>
            <NavDropdown eventKey={3} title="Actions" id="basic-nav-dropdown">
              <MenuItem
                href="/teamSelect"
                style={{ textAlign: "right" }}
                eventKey={3.1}
              >
                Team Select
              </MenuItem>
              <MenuItem style={{ textAlign: "right" }} eventKey={3.2}>
                Settings
              </MenuItem>
              <MenuItem style={{ textAlign: "right" }} eventKey={3.3}>
                About
              </MenuItem>
              <MenuItem divider />
              <MenuItem
                style={{ textAlign: "right" }}
                href="/logout"
                eventKey={3.3}
              >
                Logout
              </MenuItem>
            </NavDropdown>
          </Nav>
        ) : (
          ""
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
