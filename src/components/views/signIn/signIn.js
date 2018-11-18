import React , {Component} from 'react'
import SignInForm from './signInForm'
import AuthService from '../../AuthService';

class SignIn extends Component {

  constructor(props){
    super(props);
    this.Auth = new AuthService();

    this.state = {
      email:'',
      password:''
    }
      }

  componentWillMount(){
    console.log(this.Auth.loggedIn());
            if(this.Auth.loggedIn())
                this.props.history.replace('/mainPage');
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


  render() {

    return (
        <SignInForm handleFormSubmit={this.handleFormSubmit}> </SignInForm>
    );
  }

}

export default SignIn;
