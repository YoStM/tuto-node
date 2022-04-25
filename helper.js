exports.success = (message, data) => {
  return { message, data };
};

exports.getUniqueId = (pokemons) => {
  const POKEMONS_IDS = pokemons.map((pokemon) => pokemon.id);
  const MAX_ID = POKEMONS_IDS.reduce((a, b) => Math.max(a, b));
  const UNIQUE_ID = MAX_ID + 1;

  return UNIQUE_ID;
};
