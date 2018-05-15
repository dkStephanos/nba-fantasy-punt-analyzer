import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import { auth } from "../../utils/init";

import Logged from "./logged";
import Login from "./login";

class Header extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Fantasy Punt Analyzer"
          iconElementLeft={
            <IconButton>
              <NavigationClose />
            </IconButton>
          }
          iconElementRight={auth.loggedIn() ? <Logged /> : <Login />}
        />
      </div>
    );
  }
}

export default Header;
