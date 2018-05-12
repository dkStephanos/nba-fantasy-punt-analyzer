import React, {PropTypes} from 'react';  
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Header = () => {  
  return (
    <Navbar inverse collapseOnSelect>
	  <Navbar.Header>
	    <Navbar.Brand eventKey={1} href="/home" >
	        Fantasy Punt Analyzer
	    </Navbar.Brand>
	    <Navbar.Toggle />
	  </Navbar.Header>
	  <Navbar.Collapse>
	    <Nav>
	      <NavItem eventKey={1} href="/myTeam">
	        My Team
	      </NavItem>

	      <NavDropdown eventKey={3} title="Actions" id="basic-nav-dropdown">
	        <MenuItem href="/teamSelect" eventKey={3.1}>Team Select</MenuItem>
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