import React, { Component } from 'react';

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      password: '',
      lastname: '',
      username: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

handleInputChange(e) {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({
    [name]: value,
  })
}

render() {
  return (
    <div className="registerform">
      <form onSubmit={(e) => this.props.handleRegister(e, this.state)}>
        <input type="text" name="firstname" value={this.state.firstname}
        placeholder="Firstname" onChange={this.handleInputChange} />
        <input type="text" name="lastname" value={this.state.lastname}
        placeholder="Lastname" onChange={this.handleInputChange} />
        <input type="text" name="username" value={this.state.username}
        placeholder="Username" onChange={this.handleInputChange} />
        <input type="password" name="password" value={this.state.password}
        placeholder="Password" onChange={this.handleInputChange} />
        <input type="submit" value="Register" />
      </form>
    </div>
    )
  }
}

export default RegisterForm

//Referenced Group Git Lap auth front end https://git.generalassemb.ly/wdi-nyc-thundercats/PROJECT_03-Team-Build-Practice/blob/master/phase-2/2-auth-frontend.md

