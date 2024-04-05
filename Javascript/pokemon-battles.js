let usersPokemon =[];
let opponentsPokemon =[];

async function fetchBattlePokemon(){
  try{
   const pokemonToGet = [1, 4, 7, 25, 74, 133,];
   for (let i = 0; i < pokemonToGet.length; i++){
   const id = pokemonToGet[i];
const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
const data = await response.json();
usersPokemon.push(data);
   }
console.log(usersPokemon)
  } catch(error){
    console.log("Fikk ikke hentet pokemon Informasjon" + error)
  }
}
//

fetchBattlePokemon()