module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty : {msg: "Le nom du pokémon ne peut pas être vide."},
          notNull : { msg:  "Le nom du pokémon est obligatoire." }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie.",
          },
          min : {
            args: [0],
            msg: "Les points de vie doivent être supérieurs ou égal à 0"
          },
          max : {
            args: [999],
            msg: "Les points de vie doivent être inférieurs ou égales à 999"
          },
          notNull: { msg: "Les point de vie sont une propriété requise." },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        isInt: {
          msg: "Utilisez uniquement des nombres entiers pour les points de dégâts.",
        },
        min : {
          args: [0],
          msg: "Les points de vie doivent être supérieurs ou égal à 0"
        },
        max : {
          args: [99],
          msg: "Les points de vie doivent être inférieurs ou égales à 99"
        },
        notNull: { msg: "Les point de dégâts sont une propriété requise." },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          let stringyfiedTypes = this.getDataValue("types").split(",");
          return stringyfiedTypes;
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
