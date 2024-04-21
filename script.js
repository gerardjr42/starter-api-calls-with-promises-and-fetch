const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

//We can directly just get it by e.target.id.value
// const input = document.getElementById("pokemon-id");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const num = e.target.id.value;
    getPokemonByID(num);
  })
  
  
  function getPokemonByID(num) {
    console.log(num);
    fetch(`${BASE_URL}/${num}`)
    .then((response) => response.json())
    .then((JSONresponse) => displayPokemon(JSONresponse))
    .catch(displayError);

    //If error occurs we can then remove the error so next time we submit it is removed
    if(displayError) {
      const errorSection = document.querySelector(".error");
      errorSection.remove();
    }
  }

  function displayError(error) {
    const sectionPokemon = document.querySelector(".pokemon");
    const section = document.createElement("section");
    section.classList.add("error");

    const paragraph = document.createElement("p");
    paragraph.innerText = "There was an error!";

    const paraTwo = document.createElement("p");
    paraTwo.innerText = `${error}`
    
    section.append(paragraph, paraTwo);
    sectionPokemon.append(section);
  }

  function displayPokemon(response) {
    const pokemon = response;
    const article = document.createElement("article");
    const all = document.querySelectorAll("article")
    
    const img = document.createElement("img");
    img.setAttribute("src", pokemon.sprites.front_shiny);
    img.setAttribute("alt", pokemon.name);

    const h2 = document.createElement("h2");
    h2.textContent = `${pokemon.name.toUpperCase()} #${pokemon.order}`
    
    const move1 = document.createElement("h3");
    move1.textContent = `${pokemon.abilities[0].ability.name}`

    const move2 = document.createElement("h3");
    move2.textContent = `${pokemon.abilities[1].ability.name}`

    article.append(img, h2, move1, move2);
    document.querySelector("main").append(article);
  }