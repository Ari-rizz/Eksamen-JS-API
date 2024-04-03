const typeColor = [
  { type: "normal", color: "beige" },
  { type: "fire", color: "red" },
  { type: "water", color: "DodgerBlue" },
  { type: "electric", color: "yellow" },
  { type: "grass", color: "green" },
  { type: "ice", color: "cornflowerBlue" },
  { type: "fighting", color: "Chocolate" },
  { type: "poison", color: "purple" },
  { type: "ground", color: "DarkGoldenRod" },
  { type: "flying", color: "DeepSkyBlue" },
  { type: "psychic", color: "DarkViolet" },
  { type: "bug", color: "DarkKhaki" },
  { type: "rock", color: "Grey" },
  { type: "ghost", color: "Indigo" },
  { type: "dragon", color: "AquaMarine" },
  { type: "dark", color: "DimGray" },
  { type: "steel", color: "LigthGray" },
  { type: "fairy", color: "DeepPink" },
  
];

let pokemonArray = []; // Array for 50 tilfeldige pokemon


// Fetch som henter pokemon
async function fetchPokemon() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=250"
    );
    const data = await response.json();
    const pokemonList = data.results;
    const randomPokemonlist = getRandomPokemon(pokemonList);
    makePokemonArray(randomPokemonlist);
  } catch (error) {
    console.log("Kunne ikke laste inn pokemon: " + error);
  }
}
// Eventlistner for å gi type-knappene en funksjon
document.querySelectorAll(".filter-type button").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.textContent.toLowerCase();
    filterPokemon(type);
  });
});
// filterfunskjon for pokemonene
function filterPokemon(type) {
  const filteredPokemon = pokemonArray.filter(
    (pokemon) => pokemon.type.toLowerCase() === type
  );
  cardSection = document.querySelector(".card-container");
  cardSection.innerHTML = "";
  showPokemon(filteredPokemon);

  document.querySelector(".all-types").addEventListener("click", () => {
    cardSection.innerHTML = "";
    showPokemon(pokemonArray)
  });
  console.log(filteredPokemon);
}

//henter tilfeldige pokemon
function getRandomPokemon(pokemonList) {
  const editPokemonOrder = pokemonList.sort(() => Math.random() - 0.5);
  const randomPokemon = editPokemonOrder.slice(0, 50);
  return randomPokemon;
}

// Funksjon som samler objektene våre i et array 
async function makePokemonArray(randomPokemonList) {
  try {
    for (let i = 0; i < randomPokemonList.length; i++) {
      const response = await fetch(randomPokemonList[i].url);
      const data = await response.json();
      let pokemon = {
        image: data.sprites.front_default, // spirites = bilde til pokemonen
        name: randomPokemonList[i].name,
        type: data.types[0].type.name, // velger kun den første type-en til pokemonen
      };
      pokemonArray.push(pokemon); //legger til de 50 pokemonene i eget array
    }
    console.log(pokemonArray);
    showPokemon(pokemonArray);
  } catch (error) {
    console.log("Kunne ikke laste inn pokemon" + error);
  }
}
// Funksjon som lager pokemon kortene
function showPokemon(pokemon) {
  const cardSection = document.querySelector(".card-container");
  pokemon.forEach((pokemon) => {
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
      editPokemon(pokemonCard) ;
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
    pokemonCard.style.borderRadius = "10px";
    pokemonCard.style.color = "black";
    pokemonCard.style.backgroundColor = getTypeColor(pokemon.type);//setter bakrunnen til samme farge for alle som er samme type
    pokemonCard.style.border = "2px";
    pokemonCard.style.borderColor = "black";
    pokemonCard.style.borderStyle = "solid";

    //endre første bokstaven til stor forbokstav
    pokemonCard.querySelector("h3").style.textTransform = "capitalize";
    pokemonCard.querySelector("p").style.textTransform = "capitalize";

    cardSection.style.display = "grid";
    cardSection.style.gridTemplateColumns = "repeat(5, 1fr)";
    cardSection.style.gap = "20px";

    cardSection.appendChild(pokemonCard);
  });
}
// finner riktig farge til rikig pokemon basert på type
function getTypeColor(type) {
  const typeColorPokemon = typeColor.find(item => item.type === type.toLowerCase());
  return typeColorPokemon.color 
}
function editPokemon(pokemonCard) {
  // bruker .dataset.index for å finne riktig kort
  const name = pokemonCard.dataset.name;
  const type = pokemonCard.dataset.type;
  const index = parseInt(pokemonCard.dataset.index);

  //Spør brukeren om ny info
  const newName = prompt("Rediger navnet til Pokemonen", name);
  const newType = prompt("Rediger typen til Pokemonen", type);
   
 
  //Redigere den nye infoen og legger til bildet
  pokemonCard.dataset.name = newName;
  pokemonCard.dataset.type = newType;

  pokemonCard.querySelector("h3").textContent = newName;
  pokemonCard.querySelector("p").textContent = newType;
  pokemonCard.querySelector("img").src ="/assets/pikachu-5992504_640.png";
// oppdaterer arrayet
  pokemonArray[index].name = newName;
  pokemonArray[index].type = newType;
  pokemonArray[index].image = "/assets/pikachu-5992504_640.png";
}

fetchPokemon();
