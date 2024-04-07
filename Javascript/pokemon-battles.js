let pokemonToSplit = [];//Alle pokemon objektene våre med infoen vi vil ha
let pokemonBase = [];//Pokemonene våre med all info
let usersPokemon =[];//Brukerns Pokemon
let opponentsPokemon =[];// Motstadners Pokemon
let battlingPokemonUser = 0; // brukerens aktive Pokemon starter med den første i usersPokemon
let battlingPokemonOpponent = 0; // brukerens aktive Pokemon  starter med den første i opponentsPokemon
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
//viser en pokemon hver når kampen starter, må nok endres for å kunne bytte pokemon
function showOnePokemonEach(){

  if (usersPokemon.length > 0 && opponentsPokemon.length >0){
    const showingUserPokemon = document.querySelector(".users-showing-pokemon");
   const usersPokemonImg = document.createElement("img");
    usersPokemonImg.src = usersPokemon[battlingPokemonUser].imageBack;
    usersPokemonImg.alt = usersPokemon[battlingPokemonOpponent].name;
    showingUserPokemon.appendChild(usersPokemonImg);

    const showingOpponentPokemon = document.querySelector(".opponents-showing-pokemon");
    const opponentsPokemonImg = document.createElement("img");
     opponentsPokemonImg.src = opponentsPokemon[battlingPokemonOpponent].imageFront;
    opponentsPokemonImg.alt = opponentsPokemon[battlingPokemonOpponent].name;
    showingOpponentPokemon.appendChild(opponentsPokemonImg);

    showMoves();
    
  }else(alert("Kampen er ferdig!"));
}
// Angreps funksjon for første angrepe som skal gå ut på attack staten
function attackSystem(){

  const damage = Math.max(usersPokemon[battlingPokemonUser].attack - opponentsPokemon[battlingPokemonOpponent].defense, 0)

  opponentsPokemon[battlingPokemonOpponent].hp -= damage;

  alert(`${usersPokemon[battlingPokemonUser]} gjorde ${damage} til ${opponentsPokemon[battlingPokemonOpponent]} med bruk av ${usersPokemon[battlingPokemonUser].firstMove}!`)
opponentsAttack();
}
// Angreps funksjon for første angrepe som skal gå ut på  special-attack staten
function spescialAttackSystem(){

  const damage = Math.max(usersPokemon[battlingPokemonUser].specialAttack - opponentsPokemon[battlingPokemonOpponent].specialDefense, 0)

  opponentsPokemon[battlingPokemonOpponent].hp -= damage;

  alert(`${usersPokemon[battlingPokemonUser]} gjorde ${damage} til ${opponentsPokemon[battlingPokemonOpponent]} med bruk av ${usersPokemon[battlingPokemonUser].secondMove}!`)

opponentsAttack();

}

function opponentsAttack(){

  const opponentsRandomMove = Math.floor(Math.random() * opponentsPokemon[battlingPokemonOpponent].moves.length);
  const opponentsRandomAttack = opponentsPokemon[battlingPokemonOpponent].moves[opponentsRandomMove].move.name;

  if(opponentsRandomMove === 0){
    const damage = Math.max(opponentsPokemon[battlingPokemonOpponent].attack - usersPokemon[battlingPokemonUser].defense, 0)

    usersPokemon[battlingPokemonUser].hp -= damage;

    alert(`${battlingPokemonOpponent} gjorde ${damage} til ${battlingPokemonUser} med bruk av ${opponentsRandomAttack}!`)
  }

  else if(opponentsRandomMove === 1){

    const damage = Math.max(opponentsPokemon[battlingPokemonOpponent].specialAttack - usersPokemon[battlingPokemonUser].specialDefense, 0)

    usersPokemon[battlingPokemonUser].hp -= damage;
    alert(`${battlingPokemonOpponent} gjorde ${damage} til ${battlingPokemonUser} med bruk av ${opponentsRandomAttack}!`)
  }
}

//viser moves 
function showMoves(){
  if(usersPokemon.length > 0){
    const moveSelection = document.querySelector(".move-selection");
    moveSelection.innerHTML ="";

    const moveList = document.createElement("div");
    moveList.classList.add("move-list");

    const firstAttackMove = document.createElement("button");
    firstAttackMove.textContent = `${usersPokemon[battlingPokemonUser].firstMove}`;
    firstAttackMove.addEventListener("click", () => {
      attackSystem()
    })
    moveList.appendChild(firstAttackMove);

    const secondAttackMove = document.createElement("button");
  secondAttackMove.textContent = `${usersPokemon[battlingPokemonUser].secondMove}`;
  secondAttackMove.addEventListener("click", () => {
  spescialAttackSystem()
  })
  moveList.appendChild(secondAttackMove);

moveSelection.appendChild(moveList);

  }
}
function switchPokemon(){

}

fetchBattlePokemon()
