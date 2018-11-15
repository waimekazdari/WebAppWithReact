import React , {Component} from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div id="header">
        <div id="header_inside">

        <div width="999" height="222" border="0" usemap="#Map" text-align="center" > <h1> Shooping Site </h1></div>
          <ul id="menu">
            <li><Link to ="/" class="but1_active">Nearby Shops</Link></li>
            <li><Link to ="/myPreferred" class="but2">my preferred</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
