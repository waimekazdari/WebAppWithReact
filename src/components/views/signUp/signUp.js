import React , {Component} from 'react'
import SignUpForm from './signUpForm'
import countries from '../../JsonFiles/countries'
import users from '../../JsonFiles/Users'
import AuthService from '../../AuthService';
//import { LocalStorage } from "node-localstorage";

//global.localStorage = new LocalStorage('./scratch');

class SignUp extends Component {

  constructor(props){
    super(props);
    this.Auth = new AuthService();
    this.state = {
      contries: [],
      users: []
    }
      }

  getUsersList = (usersJson)=>{

        if(!localStorage.getItem('usersLocal')){
          let usersAsArray = Object.keys(users).map((pid)=>
                          users[pid]);
          localStorage.setItem('usersLocal',JSON.stringify(usersAsArray));
        }
        var parseUsers = JSON.parse(localStorage.getItem('usersLocal'));
        return parseUsers;
    }

  componentWillMount(){
      if(this.Auth.loggedIn())
            this.props.history.replace('/mainPage');


    var usersTab = [];
    usersTab = this.getUsersList(users);
    let countriesAsArray = Object.keys(countries).map((pid)=>
              countries[pid]);
      this.setState({
        countries:countriesAsArray,
        users:usersTab
      });

  }

  //push the new user into localStorage
  handleUserData = (usersData)=>{
    localStorage.setItem('usersLocal',JSON.stringify(usersData));
    }


  render() {
    var countries = this.state.countries;
    var users = this.state.users;
    return (
        <SignUpForm
        countries = {countries}
        users = {users}
        handleUserData = {this.handleUserData}
        > </SignUpForm>
    );
  }

}

export default SignUp;
