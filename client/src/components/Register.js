import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    department: "",
    password: ""
  };

  render() {
    return (
      <div>
        <form  onSubmit={this.signUp}>
          <div>
            <label>Username:</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label>Position:</label>
            <input
              name="department"
              value={this.state.department}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
        <h3>
          {" "}
          If you are an existing player, please <Link to="/login">Login</Link>
        </h3>
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  signUp = event => {
    event.preventDefault();

    axios
      .post("http://localhost:4000/api/register", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error("Error Registering new Member:", err);
      });
  };
}

export default Register;