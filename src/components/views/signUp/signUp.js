import React , {Component} from 'react'
import SignUpForm from './signUpForm'
import countries from '../../JsonFiles/countries'
import users from '../../JsonFiles/Users'
import AuthService from '../../AuthService';
import Header from '../Header';
import PropTypes from 'prop-types'
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

      static contextTypes = {
           router: PropTypes.object
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

  handleLogout = ()=>{
      this.Auth.logout()
      this.context.router.history.push(`/`)
      //this.props.history.replace('/');
    }

  //push the new user into localStorage of the server
  handleUserData = (newUser, allUsers)=>{
    localStorage.setItem('usersLocal',JSON.stringify(allUsers));
    console.log('newUser.id');
    console.log(newUser.id);


    //create the preferred list object for the new user
    this.CreatPreferredList(newUser);

    this.Auth.signup(newUser)
      .then(res =>{
        this.props.history.replace('/mainPage');
      })
      .catch(err=>{
        alert(err);
      })
    }

      //function to create the preferred list object for the new user
    CreatPreferredList = (newUser)=>{
      var preferredList = JSON.parse(localStorage.getItem('PreferredProdLocal'));
      var newObject = {id_user:newUser.id,products:[]};
      if(!preferredList){
        var tab = [];
        tab.push(newObject);
        localStorage.setItem('PreferredProdLocal',JSON.stringify(tab));

      }else {
        preferredList.push(newObject);
        localStorage.setItem('PreferredProdLocal',JSON.stringify(preferredList));

      }
    }

  render() {
    var countries = this.state.countries;
    var users = this.state.users;
    return (
        <div>
        <Header handleLogout={this.handleLogout} />
        <section id="content">
          <div id="wrapper">
            <div id="content_inside">
              <div id="main_block" className="style1">
                <SignUpForm
                countries = {countries}
                users = {users}
                handleUserData = {this.handleUserData}
                > </SignUpForm>
          </div>
        </div>
      </div>
    </section>
        </div>
    );
  }

}

export default SignUp;
