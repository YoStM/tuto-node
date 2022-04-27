const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const pokemons = require("./mock-pokemon");
const UserModel = require("../models/User");
const Bcrypt = require("bcrypt");
const { hash } = require("bcrypt");

const sequelize = new Sequelize("pokedex", "root", "iP_hone/!indi4_Vaisselle", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });
    Bcrypt.hash("pikachu", 10).then((hash) => {
      User.create({
        username: "pikachu",
        password: hash,
      });
    });
    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
