import React, {PropTypes} from 'react';  
import { Link } from 'react-router-dom';

const Header = () => {  
  return (
    <nav>
      <Link to="/" 
        activeClassName="active">Home</Link>
      {" | "}
      <Link to="/stats" activeClassName="active">Stats</Link>
    </nav>
  );
};

export default Header;  