import React , {Component} from 'react';
import { NavLink } from 'react-router-dom';

class SignUpForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:''
    }
  }


//handle submit of the login form
handleFormSubmit = (event)=>{
  event.preventDefault();
  const data = new FormData(event.target);
  var email;
  var password;
  email = data.get('useremail');
  password = data.get('password');
  this.state.email = email;
  this.state.password = password;
  // call the parent function
  this.props.handleFormSubmit(email,password);
}



  render() {

    return(
      <form onSubmit = {this.handleFormSubmit}>
        <h2 className="form-signin-heading"> Please Sign Up </h2><br/><br/>
        <label htmlFor="useremail" className="sr-only"> Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input id="useremail" name="useremail" className="form-control" placeholder="Enter Your Email" required="" autoFocus="" /><br/><br/><br/>
        <label htmlFor="password" className="sr-only">Password &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="password" name="password" id="pass_word" className="form-control" placeholder="Enter Your Password" required="" /><br/><br/><br/>
        <button style ={{width:100, marginLeft:120, backgroundColor:'gray', color:'white'}} >Sign In</button><br/><br/>
        <NavLink exact  className="signUp" to ="/signUp">Sign Up</NavLink >
      </form>
    );
  }

}

export default SignUpForm;
