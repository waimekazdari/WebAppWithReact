import React , {Component} from 'react';
import { NavLink } from 'react-router-dom';

class SignUpForm extends Component {

  constructor(props){
    super(props);
      }

  render() {

    return(
    <div>
      <h2 className="form-signin-heading"> Please Sign In </h2><br/><br/>
      <label htmlFor="inputName" className="sr-only">Enter Your Name &nbsp;&nbsp;&nbsp;&nbsp;</label>
      <input id="user_name" className="form-control" placeholder="Enter Your Name" required="" autoFocus="" /><br/><br/><br/>
      <label htmlFor="inputPassword" className="sr-only">Password &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <input type="password" id="pass_word" className="form-control" placeholder="Password" required="" /><br/><br/>
      <button style ={{width:100, marginLeft:120, backgroundColor:'gray', color:'white'}}  >Sign In</button><br/><br/>
      <NavLink exact  className="signUp" to ="/signUp">Sign Up</NavLink >
    </div>
    );
  }

}

export default SignUpForm;
