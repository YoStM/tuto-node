const EXPRESS = require("express");
const MORGAN = require("morgan");
const FAVICON = require("serve-favicon");
const BODY_PARSER = require("body-parser");
const { success, getUniqueId } = require("./helper");
let pokemons = require("./mock-pokemon");

const APP = EXPRESS();
const PORT = 3000;

APP.use(FAVICON(__dirname + "/favicon.ico"))
  .use(MORGAN("dev"))
  .use(BODY_PARSER.json());

APP.get("/", (req, res) => res.send("Mon pokédex avec Express.js !"));
APP.get("/api/pokemons", (req, res) => {
  const MESSAGE = "la liste des pokémons a bien été récupérée.";
  res.json(success(MESSAGE, pokemons));
});
APP.get("/api/pokemons/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  const POKEMON = pokemons.find((pokemon) => pokemon.id === ID);
  const MESSAGE = "Un pokémon a bien été trouvé.";
  res.json(success(MESSAGE, POKEMON));
});

APP.post("/api/pokemons", (req, res) => {
  const ID = getUniqueId(pokemons);
  const POKEMON_CREATED = { ...req.body, ...{ id: ID, created: new Date() } };
  pokemons.push(POKEMON_CREATED);
  const MESSAGE = `Le pokémon ${POKEMON_CREATED.name} a bien été crée.`;
  res.json(success(MESSAGE, POKEMON_CREATED));
});

APP.put("/api/pokemons/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  const POKEMON_UPDATED = { ...req.body, id: ID };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === ID ? POKEMON_UPDATED : pokemon;
  });
  const MESSAGE = `Le pokémon ${POKEMON_UPDATED.name} a bien été modifié.`;
  res.json(success(MESSAGE, POKEMON_UPDATED));
});

APP.delete("/api/pokemons/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  const POKEMON_DELETED = pokemons.find((pokemon) => pokemon.id === ID);
  pokemons.filter((pokemon) => pokemon.id !== ID);
  const MESSAGE = `Le pokémon ${POKEMON_DELETED.name} a bien été supprimé.`;
  res.json(success(MESSAGE, POKEMON_DELETED));
});

APP.listen(PORT, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${PORT}`
  )
);
