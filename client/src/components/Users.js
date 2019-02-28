import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
  };

  render() {
    return (
      <div>
       
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}&nbsp;«»&nbsp;{user.department}</li>
          ))}
        </ul>
        <h2>
          If you cannot see the list of players, you will need to <Link to="/login">Login</Link>
        </h2>
      </div>
    );
  }
  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:4000/api/users", reqOptions)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error("Error Obtaining Members List:", err);
      });
  }
}
export default Users;