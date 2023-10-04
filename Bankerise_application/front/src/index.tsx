import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import store from './store/store';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';



ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <Router>
          <Switch>
            <Route path="/auth" component={AuthLayout} />
            <Route path="/admin" component={AdminLayout} />
            <Redirect from="/" to="/auth/signin" />
          </Switch>
        </Router>
      </React.StrictMode>
    </Provider>
  </ChakraProvider>,
  document.getElementById('root')
);
