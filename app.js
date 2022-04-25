const EXPRESS = require("express");
const MORGAN = require("morgan");
const FAVICON = require("serve-favicon");
const BODY_PARSER = require("body-parser");
const SQL = require("./src/db/sequelize");

const APP = EXPRESS();
const PORT = 3000;

APP.use(FAVICON(__dirname + "/favicon.ico"))
  .use(MORGAN("dev"))
  .use(BODY_PARSER.json());

SQL.initDb();

require("./src/routes/findAll_Pokemons")(APP);
require("./src/routes/findByPk_Pokemon")(APP);
require("./src/routes/create_Pokemon")(APP);
require("./src/routes/update_Pokemon")(APP);
require("./src/routes/destroy_Pokemon")(APP);

APP.listen(PORT, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${PORT}`
  )
);
