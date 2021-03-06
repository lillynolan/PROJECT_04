import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import createHistory from 'history/createBrowserHistory';

import Auth from './modules/Auth';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Landing from './components/Landing';
import AddEvent from './components/AddEvent';
import CreatePersonalEvent from './components/CreatePersonalEvent';
import UserProfile from './components/UserProfile';

const history = createHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      redirect: false
      //keeps the user logged in even when the window is closed, session
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleRegister(e, data) {
    e.preventDefault();
    console.log(data)
    fetch('/users', {
    method: 'POST',
    body: JSON.stringify({
      user: data,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
    }).then(res => res.json())
    .then(res => {
      console.log(res)
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
      });
    }).catch(err => {
      console.log(err);
    })
  }

  handleLogin(e, data) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
        });
      }).catch(err => {
        console.log(err);
      })
  }

handleLogout() {
  fetch('/logout', {
    method: 'DELETE',
    headers: {
      token: Auth.getToken(),
      'Authorization': `Token ${Auth.getToken()}`,
    }
  }).then(res => {
    Auth.deauthenticateUser();
    this.setState({
      auth: Auth.isUserAuthenticated(),
    })
  }).catch(err => {
    console.log(err);
  })
}


  render() {
    return (
      <Router history={history}>
      <div className="App">
      <Route exact path='/' component={Landing} />
      <Route exact path='/register' render={() => (
        this.state.auth
        ? <Redirect to='/home' />
        : <RegisterForm handleRegister={this.handleRegister} />
        )}
      />
      <Route exact path='/login' render={() => (
        this.state.auth
        ? <Redirect to='/home' />
        : <LoginForm handleLogin={this.handleLogin} />
        )}
        />
        <Route exact path='/home' render={() => (
          !this.state.auth
          ? <Redirect to='/' />
          : <AddEvent handleLogout={this.handleLogout} history={history} add={() => this.setState({ redirect: !this.state.redirect})} />
          )}
        />
        <Route exact path='/profile' render={() => (
          !this.state.auth
          ? <Redirect to='/' />
          : <UserProfile handleLogout={this.handleLogout} />
          )}
        />
        <Route exact path='/createevent' render={() => (
          !this.state.auth
          ? <Redirect to='/' />
          : <CreatePersonalEvent handleLogout={this.handleLogout} history={history} add={() => this.setState({ redirect: !this.state.redirect})}/>
          )}
        />

        {
          this.state.redirect?
            <Redirect to='/profile' /> : null
        }
      </div>
      </Router>
    );
  }
}

export default App;
