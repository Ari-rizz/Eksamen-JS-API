// Fetch som henter pokemon
async function fetchPokemon() {
    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon/?limit=50"
        );
        const data = await response.json();
        const pokemonList = data.results;
        makePokemonArray(pokemonList);
    } catch (error) {
        console.log("Kunne ikke laste inn pokemon: " + error);
    }
}

function showPokemon(pokemon){}
fetchPokemon()