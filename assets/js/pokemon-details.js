const pokeDetail = document.getElementById('pokemonDetail')
const pokemonInfo = document.getElementById('poke-Info')




async function getPokemonInfo(id){
  const pokemonData = await start(id);
  const newPokemon =
  `<li class="pokemon">
  <h2 class="name">${pokemonData.name}</h2>
  <span class="number">#0${pokemonData.order}</span>
  </li>
  <div class="detail">
      <ol class="${pokemonData.type}">
        ${pokemonData.types.map(() => `<li class="type ${pokemonData.type}">${pokemonData.type}</li>`).join('')} 
      </ol>
      <img src="${pokemonData.sprites}" alt="${pokemonData.name}">
  </div>`
  pokeDetail.innerHTML = newPokemon
  pokeDetail.classList.add(pokemonData.type);
  
  const newPokemonInfo =
  `<div class="navigation-info">
      <span class="about">About</span>
      <span class="base-status">Base Status</span>
      <span class="evolution">Evolution</span>
      <span class="moves">Moves</span>
  </div>

<ol class="pokemon-detail">
<li class="captureRate"><strong>capture rate:</strong> ${pokemonData.capture_rate}</li>
<li class="weigth"><strong>Weigth:</strong> ${pokemonData.weight}</li>
<li class="abilities"><strong>Ability:</strong> ${pokemonData.abilities}</li>
</ol>

<h2 class="breendingTitle">breending</h2>

<ol class="breending">
  <li class="gender"><strong>Gender Rate:</strong> ${pokemonData.gender_rate} </li>
  <li class="egg-groups"><strong>Egg Groups:</strong> ${pokemonData.egg_groups} </li>
</ol>`
  pokemonInfo.innerHTML = newPokemonInfo     
}

getPokemonInfo(1)
