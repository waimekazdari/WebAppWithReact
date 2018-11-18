import React , {Component} from 'react'
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    //class = {current=="true" ? "but1_active" : "but1"}


    return (
      <div id="header">
        <div id="header_inside">

        <div width="999" height="222" border="0"  text-align="center" > <h1> Shooping Site </h1></div>
        <NavLink exact activeClassName="but3_active" className="signIn" to ="/">Sign In</NavLink >
          <ul id="menu">
            <li><NavLink exact activeClassName="but1_active"  to ="/mainPage">Nearby Shops</NavLink ></li>
            <li><NavLink exact activeClassName="but2_active" to ="/myPreferred"  >my preferred</NavLink ></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
