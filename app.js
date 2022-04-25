const EXPRESS = require('express');
const MORGAN = require('morgan');
const FAVICON = require('serve-favicon');
const {success} = require('./helper');
let pokemons = require('./mock-pokemon');

const APP = EXPRESS();
const PORT = 3000;

APP.use(FAVICON(__dirname + '/favicon.ico')).use(MORGAN('dev'));

APP.get('/', (req,res) => res.send('Mon pokédex avec Express.js !'));
APP.get('/api/pokemons', (req,res) => {
    const MESSAGE = 'la liste des pokémons a bien été récupérée.';
    res.json(success(MESSAGE,pokemons));
})
APP.get('/api/pokemons/:id', (req,res) => {
    const ID = parseInt(req.params.id);
    const POKEMON = pokemons.find(pokemon => pokemon.id === ID);
    const MESSAGE = 'Un pokémon a bien été trouvé.';
    res.json(success(MESSAGE, POKEMON));
});

APP.listen(PORT, () => console.log(`Notre application Node est démarrée sur : http://localhost:${PORT}`));