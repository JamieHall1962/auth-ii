exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Miguel", password: "Cabrera", department: "Infield" },
        { username: "Michael", password: "Fulmer", department: "Pitcher" },
        { username: "Jeimer", password: "Candelario", department: "Infield" },
        { username: "Jacoby", password: "Jones", department: "Outfield" },
        {
          username: "Nicholas",
          password: "Castellanos",
          department: "Outfield"
        },
        { username: "Ron", password: "Gardenhire", department: "Staff" },
        { username: "Daniel", password: "Norris", department: "Pitcher" },
        { username: "Rick", password: "Anderson", department: "Staff" },
        { username: "Grayson", password: "Greiner", department: "Catcher" }
      ]);
    });
};
