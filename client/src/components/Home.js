import React, { Component } from "react";
import { Router, Link } from "react-router-dom";

const Home = props => {
  return (
    <div>
    
      
      <h2>You are at the home page. What can you do here?</h2>
      <h3>
      <ol>
          <li>Home (this page)</li>
          <li>Members. Get a list of the members of your 2019 Detroit Tigers. Includes players and staff<br></br>
          You must be logged in to access this member list.</li>
          <li>Log In. Use this if you are already registered</li>
          <li>Register. Use this to enter a new member</li>
          <li>Log Out. End your session.</li>
      </ol>
      </h3>
    </div>
  );
};

export default Home;