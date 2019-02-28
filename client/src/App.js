import React, { Component } from "react";
import { Route, withRouter, NavLink } from "react-router-dom";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Users from "./components/Users";
import Home from "./components/Home";


import "./App.css";

class App extends Component {
  render() {
    return (
      <div >
        <header >
                   <h1>Detroit Tigers 2019</h1>
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            &nbsp;▐&nbsp;&nbsp;
            <NavLink  to="/users" exact>
              Members 
            </NavLink>
            &nbsp;▐&nbsp;&nbsp;
            <NavLink to="/login" exact>
              Login
            </NavLink>
            &nbsp;▐&nbsp;&nbsp;
            <NavLink to="/register" exact>
              Register
            </NavLink>
            &nbsp;▐&nbsp;&nbsp;
            <NavLink
              onClick={this.logout}
             
              to="/login"
              exact
            >
              Log Out
            </NavLink>
          </nav>
        </header>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/users" component={Users} />
      </div>
    );
  }

  logout = event => {
    localStorage.removeItem("jwt");
    this.props.history.push("/login");
  };
}

export default withRouter(App);
