const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      

      return knex("users").insert([
        { username: "Miguel", password: bcrypt.hashSync("Cabrera", 14), department: "Infield" },
        { username: "Michael", password:bcrypt.hashSync("Fulmer", 14), department: "Pitcher" },
        { username: "Jeimer", password:bcrypt.hashSync("Candelario", 14), department: "Infield" },
        { username: "Jacoby", password:bcrypt.hashSync("Jones", 14), department: "Outfield" },
        {
          username: "Nicholas",
          password:bcrypt.hashSync("Castellanos", 14),
          department: "Outfield"
        },
        { username: "Ron", password: bcrypt.hashSync("Gardenhire", 14), department: "Staff" },
        { username: "Daniel", password: bcrypt.hashSync("Norris", 14), department: "Pitcher" },
        { username: "Rick", password:bcrypt.hashSync("Anderson", 14), department: "Staff" },
        { username: "Grayson", password:bcrypt.hashSync("Greiner", 14), department: "Catcher" }
      ]);
    });
};
