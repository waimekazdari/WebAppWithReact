import decode from 'jwt-decode';
import {Component} from 'react'
//import { LocalStorage } from 'node-localstorage';

//global.localStorage = new LocalStorage('./scratch');

class AuthService extends Component {

  constructor(domain){
    super(domain);
    this.domain = domain || 'http://localhost:8080'
      }

  componentWillMount(){
            if(this.Auth.loggedIn())
                this.props.history.replace('/');
  }

login = (email, password)=>{
  //Get a token
  return this.fetch(`${this.domain}`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  }).then(res => {
    this.setToken(res.token);
    this.setUserId(res.users_id);
    console.log('user id : '+JSON.parse(localStorage.getItem('user_id')));
    return Promise.resolve(res);
  })
}

signup = (userData)=>{
  return this.fetch(`${this.domain}/signUp`, {
    method: 'POST',
    body: JSON.stringify(userData)
  }).then(res => {
    this.setToken(res.token);
    console.log('user id: '+res.users_id);
    this.setUserId(res.users_id);
    return Promise.resolve(res);
  })
}
//function to creat a localStorage for user's Id
setUserId = (usersId)=>{
  localStorage.setItem('user_id',JSON.stringify(usersId));
}

// function to remove user's Id from localStorage
removeUserId = ()=>{
  localStorage.removeItem('user_id');
}

loggedIn(){
  // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) // handwaiving here
}

isTokenExpired(token){
  try {
    const decoded = decode(token);
    if(decoded.exp < Date.now() / 1000){
      return true;
    }
    else {
      return false;
    }
  }
    catch (err){
      return false;
    }
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    //Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }


  logout = ()=>{
    console.log("inside logout");
    // Clear user token and profile data from localStorage
     console.log(localStorage.getItem('id_token'));
     //remove user's id when he/she had deconnected
       localStorage.removeItem('id_token');
       this.removeUserId();
       //console.log(localStorage.getItem('id_token'));
  }

  getProfile = ()=>{
    return decode(this.getToken());
  }

  fetch = (url, options)=>{

    // performs api calls sending the required authentication headers
       const headers = {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       }

       if (this.loggedIn()) {
           headers['Authorization'] = 'Bearer ' + this.getToken()
       }

       return fetch(url, {
           headers,
           ...options
       })
           .then(this._checkStatus)
           .then(response => response.json())

  }

    _checkStatus(response) {
         // raises an error in case response status is not a success
         if (response.status >= 200 && response.status < 300) {
             return response
         } else {
             var error = new Error(response.statusText)
             error.response = response
             throw error
         }
     }


}

export default AuthService;
