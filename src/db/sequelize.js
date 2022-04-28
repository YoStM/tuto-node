const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const pokemons = require("./mock-pokemon");
const UserModel = require("../models/User");
const Bcrypt = require("bcryptjs");

let sequelize;

if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.JAWSDB_MARIA_URL)
}
sequelize = new Sequelize("pokedex", "", "", {
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
  return sequelize.sync().then((_) => {
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
