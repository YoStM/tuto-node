const EXPRESS = require("express");
const MORGAN = require("morgan");
const FAVICON = require("serve-favicon");
const BODY_PARSER = require("body-parser");
const SQL = require("./src/db/sequelize");
const res = require("express/lib/response");

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
require("./src/routes/login")(APP);

// add error management
APP.use(({ res }) => {
  const MESSAGE = `Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.`;
  res.status(404).json({ MESSAGE });
});

APP.listen(PORT, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${PORT}`
  )
);
