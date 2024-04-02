// Fetch som henter pokemon
async function fetchPokemon() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=250");
    const data = await response.json();
    const pokemonList = data.results;
    const randomPokemonlist = getRandomPokemon(pokemonList);
    makePokemonArray(randomPokemonlist);
  } catch (error) {
    console.log("Kunne ikke laste inn pokemon: " + error);
  }
}
//henter tilfeldige pokemon
function getRandomPokemon(pokemonList){

  const editPokemonOrder = pokemonList.sort(() => Math.random() - 0.5);
  const randomPokemon = editPokemonOrder.slice(0, 50);
  return randomPokemon;
}

// Funksjon som lager pokemon array med de forskjellige objektene vi vil ha med
async function makePokemonArray(randomPokemonList) {
  try {
    for (let i = 0; i < randomPokemonList.length; i++) {
      const response = await fetch(randomPokemonList[i].url);
      const data = await response.json();
      let pokemon = {
        image: data.sprites.front_default, // spirits = bilde til pokemonen
        name: randomPokemonList[i].name,
        type: data.types[0].type.name, // velger kun den første type-en til pokemonen
      };
      showPokemon(pokemon);
    }
    console.log(pokemonList);
  } catch (error) {
    console.log("Kunne ikke laste inn pokemon" + error);
  }
}
// Funksjon som lager pokemon kortene
function showPokemon(pokemon) {
  const cardSection = document.querySelector(".card-container");
  const pokemonCard = document.createElement("article");
  pokemonCard.classList.add("card");

  pokemonCard.innerHTML = `
  <h3>${pokemon.name}</h3>
    <img src="${pokemon.image}" alt="${pokemon.name}" style="width: 100%">
    <div class="container">
      <p>${pokemon.type}</p>
    </div>
  `;
  const savePokemonButton = document.createElement("button");
  savePokemonButton.classList.add("saveBtn");
  savePokemonButton.textContent = "Lagre";
  savePokemonButton.addEventListener("click", () => {
    //lagre funksjon  ;
  });

  pokemonCard.appendChild(savePokemonButton);

  const editButton = document.createElement("button");
  editButton.classList.add("editBtn");
  editButton.textContent = "Rediger";
  editButton.addEventListener("click", () => {
    //redigerings funksjon  ;
  });

  pokemonCard.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteBtn");
  deleteButton.textContent = "Slett";
  deleteButton.addEventListener("click", () => {
     //slette funksjon ;
  });

  pokemonCard.appendChild(deleteButton);

  pokemonCard.style.textAlign = "center";
  pokemonCard.style.borderRadius = "10px"
  pokemonCard.style.backgroundColor = "green"
  pokemonCard.style.border = "2px";
  pokemonCard.style.borderColor = "black";
  pokemonCard.style.borderStyle = "solid";
//endre første bokstaven til stor forbokstav 
  pokemonCard.querySelector("h3").style.textTransform = "capitalize";
  pokemonCard.querySelector("p").style.textTransform = "capitalize";

  cardSection.style.display = "grid";
  cardSection.style.gridTemplateColumns = "repeat(5, 1fr)";
  cardSection.style.gap = "20px"

  cardSection.appendChild(pokemonCard);
}
fetchPokemon();
