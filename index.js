const fs = require('fs');
var fetch = require('node-fetch');
var Promise = require('bluebird');
fetch.Promise = Promise;

let catchPokemon = (currentFile) => {
  const pokePromise = new Promise((resolve, reject) => {
    fs.readFile(`./${currentFile}`, 'utf8', (err, content) => {
      if (err) reject(err)
      else {
        resolve(content); 
      }    
    });
  })
  .then(pokemonList => {
    let pokemonArray = pokemonList.split('\n');
    for(let x = 0; x<pokemonArray.length;x++){
      let pokemonName = pokemonArray[x];
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      .then(response => response.json())
      .then(data => {
        let pokemonTypes = pokemonName; // || data.species.name PokemonName : type, type type
        pokemonTypes = pokemonTypes[0].toUpperCase() + pokemonTypes.slice(1);
        for(let x = 0; x<data.types.length;x++) {
          let pokemonType = x === 0 ? `: ${data.types[x].type.name}` : `, ${data.types[x].type.name}`
          pokemonTypes += pokemonType;
        }
        console.log(pokemonTypes);
      })
      .catch(error=>{
        console.log(`${pokemonName} is not a valid pokemon name. Did you pass a digimon?`)
      })
    };
  })

};

catchPokemon('pokemon.txt');