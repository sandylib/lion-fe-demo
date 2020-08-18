import React from 'react';
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme.js'
import LogIn from './views/LogIn'
import Home from './views/Home';
import NotFound from './views/NotFound'

import { AuthenticationManger, withAuth } from './components/Authentication/Authentication';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'


function App() {
  return (
    <BrowserRouter>
     <AuthenticationManger>
     <Switch>
      <Route exact path="/login"  component={withAuth(LogIn)} />
      <PrivateRoute exact path="/" permissions={['admin']}  component={Home} />
      <Route path="/*"  component={NotFound} />
     </Switch>
      </AuthenticationManger>
    </BrowserRouter>
  );
}

export default App;
