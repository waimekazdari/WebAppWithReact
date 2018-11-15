import React, { Component } from 'react';
import '../styles/style.css';
import Footer from './views/Footer';
import Header from './views/Header';
import Content from './Content';


class App extends Component {

  render() {

    return (
          <div>
            <Header />
            <section id="content">
              <div id="wrapper">
                <div id="content_inside">
                	<div id="main_block" class="style1">
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

export default App;
