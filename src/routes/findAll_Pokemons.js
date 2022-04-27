const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const NAME = req.query.name;
      const LIMIT = parseInt(req.query.limit) || 5;

      if (NAME.length < 2) {
        const MESSAGE =
          "Le terme de recherche doit contenir au moins 2 caractères.";
        return res.status(400).json({ MESSAGE });
      }

      return Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${NAME}%`,
          },
        },
        order: ["name"], // default to ASC
        limit: LIMIT,
      }).then(({ count, rows }) => {
        const MESSAGE = `Il y a ${count} pokémons qui correspondent au terme de recherche ${NAME}.`;
        res.json({ found: count, MESSAGE, data: rows });
      });
    } else {
      Pokemon.findAll({
        order: [["name", "ASC"]],
      }) // /!\ when specifying order direction, order property takes an array of arrays
        // order: [["name", "ASC"],["hp","DESC"]]
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const MESSAGE = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`;
          res.status(500).json({ MESSAGE, data: error });
        });
    }
  });
};
