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
  { type: "steel", color: "LightGray" }, 
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
    await makePokemonArray(randomPokemonlist);
  } catch (error) {
    console.log("Kunne ikke laste inn pokemon: " + error);
  }
}

// Henter tilfeldige pokemon
function getRandomPokemon(pokemonList) {
  const editPokemonOrder = pokemonList.sort(() => Math.random() - 0.5);
  const randomPokemon = editPokemonOrder.slice(0, 50);
  return randomPokemon;
}

// Eventlistener for å gi type-knappene en funksjon
document.querySelectorAll(".filter-type button").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.textContent.toLowerCase();
    filterPokemon(type);
  });
});

// Filterfunksjon for pokemonene
function filterPokemon(type) {
  const filteredPokemon = pokemonArray.filter(
    (pokemon) => pokemon.type.toLowerCase() === type
  );
  const cardSection = document.querySelector(".card-container");
  cardSection.innerHTML = "";
  showPokemon(filteredPokemon);

  document.querySelector(".all-types").addEventListener("click", () => {
    cardSection.innerHTML = "";
    showPokemon(pokemonArray);
  });
}

// Funksjon som samler objektene våre i et array
async function makePokemonArray(randomPokemonList) {
  try {
    for (let i = 0; i < randomPokemonList.length; i++) {
      const response = await fetch(randomPokemonList[i].url);
      const data = await response.json();
      let pokemon = {
        image: data.sprites.front_default, // sprites = bilde til pokemonen
        name: randomPokemonList[i].name,
        type: data.types[0].type.name, // velger kun den første type-en til pokemonen
      };
      pokemonArray.push(pokemon); // legger til de 50 pokemonene i eget array
    }
    console.log(pokemonArray);
    showPokemon(pokemonArray);
  } catch (error) {
    console.log("Kunne ikke laste inn pokemon" + error);
  }
}

// Funksjon som lager pokemon kortene
function createPokemonCard(pokemon) {
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
    savedPokemon(pokemon);
  });

  pokemonCard.appendChild(savePokemonButton);

  const editButton = document.createElement("button");
  editButton.classList.add("editBtn");
  editButton.textContent = "Rediger";
  editButton.addEventListener("click", () => {
    editPokemon(pokemonCard);
    displayUsersPokemon();
  });

  pokemonCard.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteBtn");
  deleteButton.textContent = "Slett";
  deleteButton.addEventListener("click", () => {
    deletePokemon(pokemon);
  });

  pokemonCard.appendChild(deleteButton);

  pokemonCard.style.textAlign = "center";
  pokemonCard.style.borderRadius = "10px";
  pokemonCard.style.color = "black";
  pokemonCard.style.backgroundColor = getTypeColor(pokemon.type); // setter bakgrunnen til samme farge for alle som er samme type
  pokemonCard.style.border = "2px";
  pokemonCard.style.borderColor = "black";
  pokemonCard.style.borderStyle = "solid";
pokemonCard.style.height = "450px";
  // endrer første bokstaven til stor forbokstav
  pokemonCard.querySelector("h3").style.textTransform = "capitalize";
  pokemonCard.querySelector("p").style.textTransform = "capitalize";

  return pokemonCard;
}

function showPokemon(pokemonList) {
  const cardSection = document.querySelector(".card-container");
  cardSection.innerHTML = ""; 

  pokemonList.forEach((pokemon) => {
    const pokemonCard = createPokemonCard(pokemon);
    cardSection.appendChild(pokemonCard);
  });

  cardSection.style.display = "grid";
  cardSection.style.gridTemplateColumns = "repeat(5, 1fr)";
  cardSection.style.gap = "20px";
}

// Finner riktig farge til riktig pokemon basert på type
function getTypeColor(type) {
  const typeColorPokemon = typeColor.find(
    (item) => item.type === type.toLowerCase()
  );
  return typeColorPokemon.color;
}

function deletePokemon(pokemonToDelete) {
  // Fjern fra localStorage
  let usersPokemon = JSON.parse(localStorage.getItem("usersPokemon"));
  usersPokemon = usersPokemon.filter(
    (pokemon) => pokemon.name !== pokemonToDelete.name
  );
  localStorage.setItem("usersPokemon", JSON.stringify(usersPokemon));

  // Fjern fra pokemonArray
  pokemonArray = pokemonArray.filter((p) => p.name !== pokemonToDelete.name);

  // Fjern kortet fra visningen
  const cardSection = document.querySelector(".card-container");
  const pokemonCards = cardSection.querySelectorAll(".card");
  pokemonCards.forEach((card) => {
    if (card.querySelector("h3").textContent === pokemonToDelete.name) {
      card.remove();
    }
  });
  displayUsersPokemon();
}

function editPokemon(pokemonCard) {
  // Spør brukeren om ny info
  const newName = prompt("Rediger navnet til Pokemonen", pokemonCard.querySelector("h3").textContent);
  const newType = prompt("Rediger typen til Pokemonen", pokemonCard.querySelector("p").textContent);

  const index = pokemonArray.findIndex(pokemon => pokemon.name === pokemonCard.querySelector("h3").textContent);

  pokemonCard.querySelector("h3").textContent = newName;
  pokemonCard.querySelector("p").textContent = newType;

  pokemonArray[index].name = newName;
  pokemonArray[index].type = newType;

  pokemonCard.style.backgroundColor = getTypeColor(newType);

  const usersPokemon = JSON.parse(localStorage.getItem("usersPokemon"));
  if (usersPokemon) {
    usersPokemon.forEach((userPokemon) => {
      if (userPokemon) {
        userPokemon.name = newName;
        userPokemon.type = newType;
        displayUsersPokemon();
      }
    });
    localStorage.setItem("usersPokemon", JSON.stringify(usersPokemon));
  }
  // Passer på at de redigerte kortene ender i riktig type-filtrering
  filterPokemon(newType);
}


// Lager eventlistener for lag pokemon knappen
const makeNewPokemon = document.querySelector(".make-pokemon");
makeNewPokemon.addEventListener("click", () => {
  makePokemon();
});

// Funksjon for å lage pokemon
function makePokemon() {
  const newPokemonCard = document.createElement("article");
  newPokemonCard.classList.add("card");

  // Spør brukeren om ny info
  const newPokemonName = prompt("Hva er navnet til din nye Pokemon?");
  const newPokemonType = prompt("Hva er typen til din nye Pokemon?");
  // Lager en const som samler objektene og lages det til et kort
  const newPokemon = {
    name: newPokemonName,
    image: "/assets/pikachu-5992504_640.png",
    type: newPokemonType,
  };
  newPokemonCard.innerHTML = `
    <h3>${newPokemon.name}</h3>
    <img src="${newPokemon.image}" alt="${newPokemon.name}" style="width: 100%">
    <div class="container">
      <p>${newPokemon.type}</p>
    </div>
  `;
  // Legger til kortet med de andre
  const cardSection = document.querySelector(".card-container");
  cardSection.appendChild(newPokemonCard);
  // Legger til kort i arrayet
  pokemonArray.push(newPokemon);

  newPokemonCard.style.backgroundColor = getTypeColor(newPokemonType);

  savedPokemon(newPokemon);
}

function savedPokemon(pokemon) {
  let usersPokemon = JSON.parse(localStorage.getItem("usersPokemon"));
  if (!usersPokemon) {
    usersPokemon = [];
  } // vis usersPokemon = null så lages et tomt array

  if (usersPokemon.length >= 5) {
    alert(
      "Du har allerede 5 Pokemon. Om du vil ha flere må du slette noen av de gamle."
    );
    return;
  }
  usersPokemon.push(pokemon);

  localStorage.setItem("usersPokemon", JSON.stringify(usersPokemon));
  displayUsersPokemon();
}
function displayUsersPokemon() {
  const usersPokemon = JSON.parse(localStorage.getItem("usersPokemon"));
  if (usersPokemon) {
    const cardSection = document.querySelector(".show-users-pokemon");
    cardSection.innerHTML = ""; // Fjern eksisterende kort før vi viser de nye

    usersPokemon.forEach((pokemon) => {
      const pokemonCard = createPokemonCard(pokemon);
      cardSection.appendChild(pokemonCard);
    });

    cardSection.style.display = "grid";
    cardSection.style.gridTemplateColumns = "repeat(5, 1fr)";
    cardSection.style.gap = "20px";
  }
}

document.body.style.backgroundColor = "silver";
document.body.style.textAlign = "center";
document.body.style.fontFamily = "fantasy";

document.querySelectorAll("h1").forEach(h1 => {
  h1.style.fontSize = "50px";
});

document.querySelectorAll(".make-pokemon-container button").forEach(button => {
  button.style.fontFamily = "fantasy";
button.style.margin = "10px";
button.style.height = "40px";
button.style.width = "170px";
button.style.borderRadius = "25px";
});
document.querySelectorAll(".filter-type").forEach(div => {
  div.style.display = "flex";
  div.style.flexWrap = "wrap";
  div.style.justifyContent = "space-between";
});
document.querySelectorAll(".filter-type button").forEach(button => {
  button.style.fontFamily = "fantasy";
button.style.margin = "10px";
button.style.height = "60px";
button.style.width = "120px";
button.style.fontSize = "20px";
button.style.borderRadius = "25px";
});



localStorage.clear();
fetchPokemon();
displayUsersPokemon();