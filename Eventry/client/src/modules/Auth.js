class Auth {
  //write methods in module to use in multiple places
  static authenticateToken(token) {
    sessionStorage.setItem('token', token);
  }

  //sets the token it's passed in session storage

  static isUserAuthenticated() {
    return sessionStorage.getItem('token') !== null;
  }

  //returns a boolean, true or false, that represents whether or not there is currently a token stored in storage

  static deauthenticateUser() {
    sessionStorage.removeItem('token');
  }

  //removes the token from the session storage, essentially logging out the user

  static getToken() {
    return sessionStorage.getItem('token');
  }
  //gets the token from storage
}

export default Auth;

// https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
// https://git.generalassemb.ly/wdi-nyc-thundercats/Rails-React-Token-Auth
