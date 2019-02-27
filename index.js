const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

const usersRoutes = require("./users/router");

server.use("/api", usersRoutes);

const port=4000
server.listen({port}, () => console.log(`\nAPI now running on port ${port} \n`));