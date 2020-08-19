import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme.js'
import LogIn from './views/LogIn'
import Home from './views/Home';
import MyCart from './views/MyCart';
import NotFound from './views/NotFound';
import AppBar from './components/AppBar/AppBar';

import { AuthenticationManger, withAuth } from './components/Authentication/Authentication';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import createStore from './store/createStore';


const store = createStore();

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
     <AuthenticationManger>
       <AppBar />
     <Switch>
      <Route exact path="/login"  component={withAuth(LogIn)} />
      <PrivateRoute exact path="/" permissions={['admin']}  component={Home} />
      <PrivateRoute exact path="/cart/:userId/" permissions={['admin']} component={MyCart} />
      <Route path="/*"  component={NotFound} />
     </Switch>
      </AuthenticationManger>
    </BrowserRouter>
   </Provider>
  );
}

export default App;
