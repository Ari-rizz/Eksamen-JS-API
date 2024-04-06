let pokemonToSplit = [];//Alle pokemon objektene våre med infoen vi vil ha
let pokemonBase = [];//Pokemonene våre med all info
let usersPokemon =[];//Brukerns Pokemon
let opponentsPokemon =[];// Motstadners Pokemon
//Fetcher pokemon
async function fetchBattlePokemon(){
  try{
   const pokemonToGet = [1, 4, 7, 25, 74, 133,];
   for (let i = 0; i < pokemonToGet.length; i++){
   const id = pokemonToGet[i];
const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
const data = await response.json();
pokemonBase.push(data);
   }
   collectInfo();
  } catch(error){
    console.log("Fikk ikke hentet pokemon Informasjon" + error);
  }
}
//Henter infoen vi vil ha med
 async function collectInfo(){  
  try {
  for (let i = 0; i < pokemonBase.length; i++) {
    const data = pokemonBase[i];
    const pokemon = {
      id: data.id,
      name: data.name,
      type: data.types[0].type.name,
      imageFront: data.sprites.front_default,
      imageBack: data.sprites.back_default,
      firstMove: data.moves[0].move.name,
      secondMove: data.moves[1].move.name,
      hp:data.stats[0].base_stat,
      attack:data.stats[1].base_stat,
      defense:data.stats[2].base_stat,
      specialAttack:data.stats[3].base_stat,
      specialDefense:data.stats[4].base_stat,
      speed:data.stats[5].base_stat,
    };
pokemonToSplit.push(pokemon);
}
splitPokemon()
showOnePokemonEach()
console.log(pokemonToSplit);
  } catch (error) {
    console.log("Kunne ikke hente inn pokemon informasjon" + error);
  }
} 
// Fordeler Pokemonene mellom brukeren og motstaderen
function splitPokemon(){

  const halfOfPokemon = Math.floor(pokemonToSplit.length / 2);
  usersPokemon = pokemonToSplit.slice(0, halfOfPokemon);
  opponentsPokemon = pokemonToSplit.slice(halfOfPokemon);

  console.log("Brukerns pokemon:", usersPokemon);
  console.log("Motstaders pokemon:", opponentsPokemon);
}

function showOnePokemonEach(){

  if (usersPokemon.length > 0 && opponentsPokemon.length >0){
    const showingUserPokemon = document.querySelector(".users-showing-pokemon");
   const usersPokemonImg = document.createElement("img");
    usersPokemonImg.src = usersPokemon[0].imageBack;
    usersPokemonImg.alt = usersPokemon[0].name;
    showingUserPokemon.appendChild(usersPokemonImg);

    const showingOpponentPokemon = document.querySelector(".opponents-showing-pokemon");
    const opponentsPokemonImg = document.createElement("img");
     opponentsPokemonImg.src = opponentsPokemon[0].imageFront;
    opponentsPokemonImg.alt = opponentsPokemon[0].name;
    showingOpponentPokemon.appendChild(opponentsPokemonImg);
    
  }
}

function attackSystem(){


}

function spescialAttackSystem(){


}

function chooseMove(){

}
fetchBattlePokemon()
