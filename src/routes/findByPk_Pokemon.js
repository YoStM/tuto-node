const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const MESSAGE =
            "Le pokemon demandé n'existe pas. Réessayez avec un autre identifiant.";
          return res.status(404).json({ MESSAGE });
        }
        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const MESSAGE =
          "Le pokémon n'a pas pu être récupéré. Réessayez dans quelques instant.";
        res.status(500).json({ MESSAGE, data: error });
      });
  });
};
