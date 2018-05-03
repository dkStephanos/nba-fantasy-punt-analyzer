import React, {PropTypes} from 'react';  
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Header = () => {  
  return (
    <Navbar inverse collapseOnSelect>
	  <Navbar.Header>
	    <Navbar.Brand>
	      <a href="#home">Fantasy Punt Analyzer</a>
	    </Navbar.Brand>
	    <Navbar.Toggle />
	  </Navbar.Header>
	  <Navbar.Collapse>
	    <Nav>
	      <NavItem eventKey={1} href="#">
	        My Team
	      </NavItem>

	      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
	        <MenuItem eventKey={3.1}>Action</MenuItem>
	        <MenuItem eventKey={3.2}>Another action</MenuItem>
	        <MenuItem eventKey={3.3}>Something else here</MenuItem>
	        <MenuItem divider />
	        <MenuItem eventKey={3.3}>Separated link</MenuItem>
	      </NavDropdown>

	    </Nav>
	    <Nav pullRight>
	      <NavItem eventKey={1} href="#logout">
	        Logout
	      </NavItem>
	    </Nav>
	  </Navbar.Collapse>
	</Navbar>
  );
};

export default Header;  