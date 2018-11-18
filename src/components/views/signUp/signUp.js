import React , {Component} from 'react'
import SignUpForm from './signUpForm'
import countries from '../../JsonFiles/countries'
import users from '../../JsonFiles/Users'
class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      contries: [],
      users: []
    }
      }

  getUsersList = (usersJson)=>{

        if(!localStorage.usersLocal){
          let usersAsArray = Object.keys(users).map((pid)=>
                          users[pid]);
          localStorage.usersLocal= JSON.stringify(usersAsArray);
        }
        var parseUsers = JSON.parse(localStorage.usersLocal);
        return parseUsers;
    }

  componentWillMount(){
    var usersTab = [];
    usersTab = this.getUsersList(users);
    let countriesAsArray = Object.keys(countries).map((pid)=>
                    countries[pid]);
      this.setState({
        countries:countriesAsArray,
        users:usersTab
      });
      //console.log(usersTab);
  }

  //push the new user into localStorage
  handleUserData = (usersData)=>{
    localStorage.usersLocal=JSON.stringify(usersData);
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
