import React , {Component} from 'react'
import { NavLink } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div>
          <div id="footer">
            <div id="footer_inside">
              <ul className="footer_menu">
              <li><NavLink to ="/">Nearby Shops</NavLink ></li>
              <li><NavLink to ="/myPreferred"  >my preferred</NavLink ></li>
              </ul>
              </div>
          </div>
      </div>
    );
  }
}

export default Footer;
