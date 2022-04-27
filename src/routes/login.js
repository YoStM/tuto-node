const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const PVTK = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          const message = `L'Utilisateur demandé n'existe pas.`;
          return res.status(404).json({ message });
        }

        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Le mot de passe est incorrect.`;
              return res.json({ message });
            }

            // JWT
            const token = JWT.sign({ userId: user.id }, PVTK, {
              expiresIn: "24h",
            });

            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token });
          });
      })
      .catch((error) => {
        const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`;
        return res.json({ message, data: error });
      });
  });
};
