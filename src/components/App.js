import React, { Component } from 'react';
import '../styles/style.css';
import Footer from './views/Footer';
import Content from './Content';


class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      SignInBtn :'none',
      Logout:'none'
    }
  }


    callBackFromComponents = (signIn, Logout)=>{
      this.setState({SignInBtn: signIn});
      this.setState(Logout);
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
