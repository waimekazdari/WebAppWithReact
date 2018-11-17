import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from './views/mainPage/Products';
import myPreferred from './views/myPreferred/products';

const Content = () => {
  return (
    <Switch>
      <Route exact path = '/' component={Products} />
      <Route exact path = '/myPreferred' component={myPreferred} />
    </Switch>
  )
}

export default Content;
