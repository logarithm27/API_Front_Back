import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { router } from './router'
import NavbarApp from './components/NavbarApp';

const App = () => <main>
  <NavbarApp />
  {
    router.map( (props, index) => 
     <Route path={props.pathname} component={props.components} key={index} />
    )
  }
</main>

export default App