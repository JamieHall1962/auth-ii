// routes and db stuff go here

const express = require("express");

const knex = require("knex");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

const secret = "never play f3";

// Generate a token

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

// Set up the middleware function that will restrict access to unauthorized users.

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res
          .status(403)
          .json({
            message: "Are you a f****** hacker? Get the **** out of here!!"
          });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
}

// Design and build the following endpoints.

// | POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database.

router.post("/register", (req, res) => {
  const { username, password, department } = req.body;
  if (!username || !password || !department)
    res
      .status(422)
      .json({ message: "You must include the requested information" });

  const hash = bcrypt.hashSync(password, 14);

  db("users")
    .insert({ username, password: hash, department })
    .then(ids => {
      const id = ids[0];

      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res
            .status(201)
            .json({ id: user.id, token, message: "User successfully added" });
        })

        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

// | POST   | /api/login    | Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!' |

router.post("/login", (req, res) => {
    const { username, password } = req.body;
      
    db("users")
      .where({ username: username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
  
          res.status(200).json({ token, message: `Welcome ${username}` });
        } else {
          res.status(401).json({ message: "You shall not pass!" });
        }
      })
      .catch(err => res.status(500).send(err));
  });




// | GET    | /api/users    | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'. Use this endpoint to verify that the password is hashed before it is saved.

router.get("/users", restricted, (req, res) => {
    db("users")
      .select("id", "username", "password", "department")
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });


module.exports = router;
