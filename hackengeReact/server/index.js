const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

const pokemon = [];

const getPokemonById = (id) => {
  return pokemon.find((pokemon) => pokemon.id === id);
};

const getPokemonIndexById = (id) => {
  return pokemon.findIndex((pokemon) => pokemon.id === id);
};

// get all pokemons registered
app.get('/pokemon', (req, res) => {
  res.json(pokemon);
});

// get specific pokemon
app.get('/pokemon/:id', (req, res) => {
  const { id: pokemonId } = req.params;
  const pokemon = getPokemonById(pokemonId);

  if (!pokemon) {
    return (
      res
        .status(404)
        .json('Sorry, this pokemon was not found! 🙈')
    );
  }
  
  res.status(200).json(pokemon);
});

// create a new pokemon
app.post('/pokemon', (req, res) => {
  const { name, type, hp, attack, cost } = req.body;

  if (!( name && type && hp && attack && cost)) {
    return (
      res
        .status(400)
        .json(
          `Unable to create the pokemon, there are missing fields.`
        )
    );
  }

  const newPokemon = {
    id: uuid(),
    name, 
    type, 
    hp, 
    attack, 
    cost,
  };
  pokemon.push(newPokemon);

  res.status(201).json(newPokemon);
});

// edit pokemon
app.put('/pokemon/:id', (req, res) => {
  const { id: pokemonId } = req.params;
  const pokemon = getPokemonById(pokemonId);

  if (!pokemon) {
    return (
      res
        .status(404)
        .json('Sorry, this pokemon was not found! 🙈')
    );
  }

  const { name, type, hp, attack, cost } = req.body;
  
  pokemon.name = name || pokemon.name;
  pokemon.type = type || pokemon.type;
  pokemon.hp = hp || pokemon.hp;
  pokemon.attack = attack || pokemon.attack;
  pokemon.cost = cost || pokemon.cost;

  res.status(200).json(pokemon);
});

// delete pokemon
app.delete('/pokemon/:id', (req, res) => {
  const { id: pokemonId } = req.params;
  const pokemonIndex = getPokemonIndexById(pokemonId);

  if (pokemonIndex === -1) {
    return (
      res
        .status(404)
        .json('Sorry, this pokemon was not found! 🙈')
    );
  }
  pokemon.splice(pokemonIndex, 1);
  
  res.status(200).json('Pokemon deleted successfully! 🗑️');
});

app.listen(3000);
