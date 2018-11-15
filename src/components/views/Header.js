import React , {Component} from 'react'
//import './App.css';
//import Products from './Products'

class Header extends Component {
  render() {
    return (
      <div id="header">
        <div id="header_inside">

        <div width="999" height="222" border="0" usemap="#Map" text-align="center" > <h1> Shooping Site </h1></div>
          <ul id="menu">
            <li><a href="index.html" class="but1_active">Nearby Shops</a></li>
            <li><a href="index.html" class="but2">my preferred</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
