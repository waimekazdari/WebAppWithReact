import React, { Component } from 'react';
import '../styles/style.css';
import Footer from './views/Footer';
import Header from './views/Header';
import Content from './Content';
import AuthService from './AuthService';
import withAuth from './withAuth';


const Auth = new AuthService();
class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      SignInBtn :'none',
      Logout:'none'
    }
  }


    callBackFromComponents = (signIn, Logout)=>{
      this.state.SignInBtn = signIn;
      this.state.Logout = Logout;
    }


  render() {

    return (
          <div>


                  <Content
                  ></Content>

            <Footer />
          </div>
    );
  }
}

//export default withAuth(App);
export default App;
