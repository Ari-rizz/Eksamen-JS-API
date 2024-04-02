// Fetch som henter pokemon
async function fetchPokemon() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=50");
    const data = await response.json();
    const pokemonList = data.results;
    makePokemonArray(pokemonList);
  } catch (error) {
    console.log("Kunne ikke laste inn pokemon: " + error);
  }
}
// Funksjon som lager pokemon array med de forskjellige objektene vi vil ha med
async function makePokemonArray(pokemonList) {
  try {
    for (let i = 0; i < pokemonList.length; i++) {
      const response = await fetch(pokemonList[i].url);
      const data = await response.json();
      let pokemon = {
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`, // spirits = bilde til pokemonen. ${i + 1} brukes for å oppnå riktig bilde per pokemon
        name: pokemonList[i].name,
        type: data.types[0].type.name, // velger kun den første type-en til pokemonen
      };
      showPokemon(pokemon);
    }
    console.log(pokemonList);
  } catch (error) {
    console.log("Kunne ikke laste inn pokemon" + error);
  }
}
function showPokemon(pokemon) {
    console.log(pokemon)
}
fetchPokemon();
