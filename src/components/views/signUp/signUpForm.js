import React , {Component} from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import EmailValidator from 'email-validator';
class SignUpForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      user : {},
      countries : this.props.countries,
      users : this.props.users
    }
      }

  static contextTypes = {
       router: PropTypes.object
     }

  handleUserDataa = (newUser, allUsers)=>{
    this.props.handleUserData(newUser, allUsers);
  }

  handleForm = (data)=>{
    var checkForm;
    var checkMail;
    var checkPassword;
    var checkInputsEmptness;
    // check there is no empty input
    checkInputsEmptness = (data.get('useremail') !=="" && data.get('password') !=="" && data.get('confirmCassword')) ? false : true;
    console.log('checkInputsEmptness:'+checkInputsEmptness);
    //check format of the email
    checkMail = EmailValidator.validate(data.get('useremail'));
    console.log('checkMail:'+checkMail);
    //check if the password equal password confirmation
    checkPassword = data.get('password') === data.get('confirmPassword') ? true : false;
    console.log('checkPassword:'+checkPassword);

    checkForm = (checkInputsEmptness  && checkMail  && checkPassword) ? true : false;
    console.log('checkForm:'+checkForm);
    return checkForm;
  }

  //check the data if the user alrealy authenticated
  checkUsersDataBase = (data)=>{
    var checkUser= false;
    var users = this.state.users;
    users.map((user)=>{
      if (user.email === data.get('useremail')){
        checkUser = true;
      }
    });

    return checkUser;
  }

  // function to add user to Users Data file of users
  AddUser = (data)=>{
    var objUser;
    var lastUserId;
    var newId;
    var newEmail;
    var newDistance;
    var countries =this.state.countries;
    var users = this.state.users;
    //var country=data.get('countries');
    //check the last user id in the database
    lastUserId = users[users.length-1].id;

    //retrieve the distance of user's country
    /*countries.map((country)=>{
      if(country.label === data.get('countries')){
        distance = country.distance;
      }
    });*/

    // the user object to add
    objUser = {id:lastUserId+1,email:data.get('useremail'),password: data.get('password'),country: data.get('countries')};

    //Add the new User to Users table
    users.push(objUser);
    var newUser = [];
    console.log(users);
    //newUser= JSON.parse(objUser);
    //objUser =
    //update users table
    this.state.users = users;
    // update the users list in localstorage by calling the parent function
    this.handleUserDataa(objUser, users);
  }


  handleSubmit = (event)=>{
  //  var checkUser;
    var FormIsGood;

      event.preventDefault();
      const data = new FormData(event.target);

      //check the form
    FormIsGood = this.handleForm(data);
      //check the data if the user alrealy authenticated
    //checkUser = this.checkUsersDataBase(data);

    //check if all is good and then add the new user and go to sign in

    if(!FormIsGood){
      alert('alert: Please check your informations, something is wrong');
    }else{
      //addthe new User
      this.AddUser(data);
    }

  }


  render(){
    var countries = this.state.countries;
    // retrieve contries data
    let countriesSelection = [];
    countries.map((country)=>{
      countriesSelection.push(
        <option key = {country.id} id={country.distance} name={country.label} >{country.label}</option>
      );
    });
    return(

            <form onSubmit = {this.handleSubmit}>
              <h2 className="form-signin-heading"> Please Sign Up </h2><br/><br/>
              <label htmlFor="useremail" className="sr-only"> Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input id="useremail" name="useremail" className="form-control" placeholder="Enter Your Email" required="" autoFocus="" /><br/><br/><br/>
              <label htmlFor="countries" className="sr-only"> Select Your Country &nbsp;&nbsp;&nbsp;&nbsp;</label>
              <select name = "countries" style = {{width:155, color:'gray'}}>
                  {countriesSelection}
              </select><br/><br/><br/>
              <label htmlFor="password" className="sr-only">Password &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="password" name="password" id="pass_word" className="form-control" placeholder="Enter Your Password" required="" /><br/><br/><br/>
              <label htmlFor="password" className="sr-only">Password &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="password" name="confirmPassword" id="pass_conf" className="form-control" placeholder="Confirme your Password" required="" /><br/><br/>
              <button style ={{width:100, marginLeft:120, backgroundColor:'gray', color:'white'}} >Sign Up</button><br/><br/>
              <NavLink exact  className="signIn" to ="/">Sign In</NavLink >
            </form>

    );
  }

}

export default SignUpForm;
