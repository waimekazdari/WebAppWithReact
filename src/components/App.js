import React, { Component } from 'react';
import '../styles/style.css';
import Footer from './views/Footer';
import Header from './views/Header';
import Content from './Content';
import AuthService from './AuthService';
import withAuth from './withAuth';
import PropTypes from 'prop-types'

const Auth = new AuthService();
class App extends Component {
  constructor(props){
    super(props);
  }

  static contextTypes = {
       router: PropTypes.object
     }

    handleLogout = ()=>{
        Auth.logout()
        this.context.router.history.push(`/`)
        //this.props.history.replace('/');
      }

  render() {

    return (
          <div>
            <Header handleLogout = {this.handleLogout}  />
            <section id="content">
              <div id="wrapper">
                <div id="content_inside">
                	<div id="main_block" className="style1">
                  <Content />
                  </div>
                </div>
              </div>
            </section>
            <Footer />
          </div>
    );
  }
}

//export default withAuth(App);
export default App;
