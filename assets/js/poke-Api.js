
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
   const pokemon = new Pokemon()
   pokemon.number = pokeDetail.id
   pokemon.name = pokeDetail.name
   
   const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

   const [ type ] = types

   pokemon.types = types
   pokemon.type = type

   pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
   return pokemon
}

pokeApi.getpokemonDetails = (pokemon) => {
   return fetch(pokemon.url)
   .then((response) => response.json())
   .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemon = (offset, limit) => {
   const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
   return fetch(url)
   .then((response) => response.json())
   .then((jsonBody) => jsonBody.results)
   .then((pokemons) => pokemons.map(pokeApi.getpokemonDetails))
   .then((detailRequests) => Promise.all(detailRequests))
   .then((pokemonDetails) => pokemonDetails)
   .catch((error) => console.error(error))
}

async function start(id) {
   let url = 'https://pokeapi.co/api/v2/';

   var subUrls = {
    pokemons: 'pokemon',
    specie: 'pokemon-species'
};

   if(typeof id === 'number') {
      const dataResponse = await fetch(`${url}${subUrls.pokemons}/${id}`);
      const speciesResponse = await fetch(`${url}${subUrls.specie}/${id}`);
    
      const data = await dataResponse.json();
      const specie = await speciesResponse.json();
    
      return {
         id: id,
         weight: data.weight,
         name: data.name,
         order: data.order,
         sprites: data.sprites.other.dream_world.front_default,
         habitat: specie.habitat.name,
         abilities: data.abilities[0].ability.name,
         type: data.types[0].type.name,
         types: data.types.map((typeSlot) => typeSlot.type.name),
         egg_groups: specie.egg_groups[0].name,
         capture_rate: specie.capture_rate,
         gender_rate: specie.gender_rate,

      };
   }
}

