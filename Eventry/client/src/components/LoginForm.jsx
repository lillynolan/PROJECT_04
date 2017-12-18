import React, { Component } from 'react';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

handleInputChange(e) {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({
    [name]: value,
  });
}


render() {
  return (
    <div className="loginform">
      <h1>Eventry</h1>
      <form onSubmit={(e) => this.props.handleLogin(e, this.state)}>
        <input type="text" name="username"
        value={this.state.username} placeholder="Username" onChange={this.handleInputChange} />
        <input type="password" name="password"
        value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
        <input type="submit" value="Login" />
      </form>
    </div>
  )}
}

export default LoginForm;
//referenced Class auth lesson https://git.generalassemb.ly/wdi-nyc-thundercats/LECTURE_U02_D09_Express-Auth
//referenced Git Group project for auth backend https://git.generalassemb.ly/wdi-nyc-thundercats/PROJECT_03-Team-Build-Practice/blob/master/phase-2/1-auth-backend.md
//referenced https://git.generalassemb.ly/wdi-nyc-thundercats/Rails-React-Token-Auth
