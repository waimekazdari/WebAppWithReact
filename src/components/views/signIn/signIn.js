import React , {Component} from 'react'
import SignInForm from './signInForm'
import Header from '../Header';
import AuthService from '../../AuthService';
import PropTypes from 'prop-types'

class SignIn extends Component {

  constructor(props){
    super(props);
    this.Auth = new AuthService();

    this.state = {
      email:'',
      password:''
    }
      }

      static contextTypes = {
           router: PropTypes.object
         }

  componentWillMount(){
            if(this.Auth.loggedIn())
                this.props.history.replace('/mainPage');
  }

  handleLogout = ()=>{
      this.Auth.logout()
      this.context.router.history.push(`/`)
      //this.props.history.replace('/');
    }

  handleFormSubmit = (eml, psswd)=>{
    var email = eml;
    var password = psswd;

    this.state.email = email;
    this.state.password = password;

    this.Auth.login(email, password)
      .then(res =>{
        this.props.history.replace('/mainPage');
      })
      .catch(err=>{
        alert(err);
      })
  }
  /*
    //display or not the Sign In link
  DisplaySignInBtn = ()=>{
   return this.state.SignInBtn;
    }

    //display or not the Logout Button
  DisplayLogoutBtn = ()=>{
    return this.state.Logout;
  }*/


  render() {

    return (
      <div>
      <Header  handleLogout = {this.handleLogout}/>
          <section id="content">
            <div id="wrapper">
              <div id="content_inside">
                <div id="main_block" className="style1">
                  <SignInForm  handleFormSubmit = {this.handleFormSubmit} />
                  </div>
                </div>
              </div>
          </section>
      </div>
    );
  }

}

export default SignIn;
