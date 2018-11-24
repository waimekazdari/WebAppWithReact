import React , {Component} from 'react'
import { NavLink } from 'react-router-dom';
import AuthService from '../AuthService';


class Header extends Component {

  constructor (props){
    super(props);
    this.Auth = new AuthService();
    this.state = {
      SignIn: '',
      Logout: ''
    }

  }


  handleLogout = ()=>{
    this.onClickLink();
    this.props.handleLogout();
  }

  /*handleSignInBtn = ()=>{


  }*/

onClickLink = ()=>{
  var signIn = "";
  var logout = "";
      if(this.Auth.loggedIn()){

          logout = <p className='App-intro'><button type='button' className='logout' onClick={this.handleLogout}>Logout</button></p>;
          signIn = '';

          this.setState({Logout:logout});
          this.setState({SignIn:signIn});

        }else{
          signIn =  <NavLink exact activeClassName="but3_active" className='signIn' to ='/'>Sign In</NavLink > ;
          logout = '';
          this.setState({Logout: logout});
          this.setState({SignIn: signIn});
}
}
  componentWillMount(){
    this.onClickLink();
  }

  render() {
    //setTimeout(this.onClickLink, 1000);
    var SignIn = this.state.SignIn;
    var Logout = this.state.Logout;
    return (
      <div id="header">
        <div id="header_inside">

        <div width="999" height="222" border="0"  text-align="center" > <h1> Shooping Site </h1></div>

        {SignIn}
        {Logout}
          <ul id="menu">
            <li><NavLink exact activeClassName="but1_active"  to ="/mainPage"  >Nearby Shops</NavLink ></li>
            <li><NavLink exact activeClassName="but2_active" to ="/myPreferred" >my preferred</NavLink ></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
