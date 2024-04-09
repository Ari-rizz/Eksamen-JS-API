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
    showingUserPokemon.innerHTML = "";
   const usersPokemonImg = document.createElement("img");
    usersPokemonImg.src = usersPokemon[battlingPokemonUser].imageBack;
    usersPokemonImg.alt = usersPokemon[battlingPokemonUser].name;
    showingUserPokemon.appendChild(usersPokemonImg);

    const showingOpponentPokemon = document.querySelector(".opponents-showing-pokemon");
    showingOpponentPokemon.innerHTML = "";
    const opponentsPokemonImg = document.createElement("img");
     opponentsPokemonImg.src = opponentsPokemon[battlingPokemonOpponent].imageFront;
    opponentsPokemonImg.alt = opponentsPokemon[battlingPokemonOpponent].name;
    showingOpponentPokemon.appendChild(opponentsPokemonImg);

    showMoves();
    
  }else(alert("Kampen er ferdig!"));
}
// Angreps funksjon for første angrepe som skal gå ut på attack staten
function attackSystem(){

  const damage = Math.max(usersPokemon[battlingPokemonUser].attack - opponentsPokemon[battlingPokemonOpponent].defense, 5) // Gjør minst 5 damage

  opponentsPokemon[battlingPokemonOpponent].hp -= damage;

  alert(`${usersPokemon[battlingPokemonUser].name} gjorde ${damage} til ${opponentsPokemon[battlingPokemonOpponent].name} med bruk av ${usersPokemon[battlingPokemonUser].firstMove}!`)
opponentsAttack();
}
// Angreps funksjon for første angrepe som skal gå ut på  special-attack staten
function spescialAttackSystem(){

  const damage = Math.max(usersPokemon[battlingPokemonUser].specialAttack - opponentsPokemon[battlingPokemonOpponent].specialDefense, 5) // Gjør minst 5 damage

  opponentsPokemon[battlingPokemonOpponent].hp -= damage;

  alert(`${usersPokemon[battlingPokemonUser].name} gjorde ${damage} til ${opponentsPokemon[battlingPokemonOpponent].name} med bruk av ${usersPokemon[battlingPokemonUser].secondMove}!`)
opponentsAttack();

}

function opponentsAttack(){
  const opponentsMoveList = [opponentsPokemon[battlingPokemonOpponent].firstMove,opponentsPokemon[battlingPokemonOpponent].secondMove]
  const opponentsRandomMove = Math.floor(Math.random() * opponentsMoveList.length);
  const opponentsRandomAttack = opponentsMoveList[opponentsRandomMove];

  if(opponentsRandomAttack === opponentsPokemon[battlingPokemonOpponent].secondMove){
    const damage = Math.max(opponentsPokemon[battlingPokemonOpponent].attack - usersPokemon[battlingPokemonUser].defense, 5)// Gjør minst 5 damage

    usersPokemon[battlingPokemonUser].hp -= damage;

    alert(`${opponentsPokemon[battlingPokemonOpponent].name} gjorde ${damage} til ${usersPokemon[battlingPokemonUser].name} med bruk av ${opponentsRandomAttack}!`)
  }

  else if(opponentsRandomAttack === opponentsPokemon[battlingPokemonOpponent].firstMove){

    const damage = Math.max(opponentsPokemon[battlingPokemonOpponent].specialAttack - usersPokemon[battlingPokemonUser].specialDefense, 5)// Gjør minst 5 damage

    usersPokemon[battlingPokemonUser].hp -= damage;
    alert(`${opponentsPokemon[battlingPokemonOpponent].name} gjorde ${damage} til ${usersPokemon[battlingPokemonUser].name} med bruk av ${opponentsRandomAttack}!`)
  }
// Sender ut neste pokemon hvis den nåværende har 0 i hp
  if(opponentsPokemon[battlingPokemonOpponent].hp <= 0){
    alert(`${opponentsPokemon[battlingPokemonOpponent].name} har blitt beseiret og kan ikke sloss mer!`)
    battlingPokemonOpponent++;
    showOnePokemonEach()
    alert(`Motstanderen sender ut ${opponentsPokemon[battlingPokemonOpponent].name}!`)
  } 
  
  if(usersPokemon[battlingPokemonUser].hp <= 0){
    switchPokemon();
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
  const availablePokemon = usersPokemon.filter(pokemon => pokemon.hp > 0);
  if(availablePokemon.length > 0){
    const listOfPokemonToChoose = availablePokemon.map(pokemon => pokemon.name);
    const chosenPokemonName = prompt(`Velg en ny Pokemon. Dine Pokemon er ${listOfPokemonToChoose}`);

    const chosenPokemon = availablePokemon.find(pokemon => pokemon.name === chosenPokemonName);
    if(chosenPokemon){
      battlingPokemonUser = usersPokemon.indexOf(chosenPokemon);

      showOnePokemonEach();
    } else{
      alert("Pokemonen du har valgt finnes ikke. Prøv igjen");
    }
  }else{
    alert("Du har ingen pokemon igjen. Du tapte denne gangen");
  }
}


fetchBattlePokemon()
