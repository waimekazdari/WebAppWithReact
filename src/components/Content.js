import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from './views/mainPage/Products';
import myPreferred from './views/myPreferred/products';
import signIn from './views/signIn/signIn';
import signUp from './views/signUp/signUp';

const Content = () => {
  return (
    <Switch>
      <Route exact path = '/' component={signIn} />
      <Route exact path = '/signUp' component={signUp} />
      <Route exact path = '/mainPage' component={Products} />
      <Route exact path = '/myPreferred' component={myPreferred} />
    </Switch>
  )
}

export default Content;
