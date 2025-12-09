const pokemonSelect = document.getElementById("pokemon");
const pokemonList = document.getElementById("pokemonList");
const pokemonCount = document.getElementById("pokemonCount");
const pokeBody = document.getElementById("pokeBody");
let pokecount = 0;

function capitalizeFirstLetter(text) { // funcion para que en los títulos sean capitalizados (ej: Juan, Pepe)
    return text.charAt(0).toUpperCase() + text.slice(1);
}

fetch('https://pokeapi.co/api/v2/type')
    .then(response => response.json())
    .then(types => {
        types.results.forEach(type => insertType(type));
    });

pokemonSelect.addEventListener("change", () => {
    console.log(pokemonSelect.value);
    fetch(`https://pokeapi.co/api/v2/type/${pokemonSelect.value}`)
        .then(response => response.json())
        .then(type => {
            pokecount = 0;
            pokemonList.innerHTML = "";
            type.pokemon.forEach(pokemon => {
                insertPokemon(pokemon);
            });
        });
    pokeBody.style.backgroundImage = "../images/" + pokemonSelect.value + ".gif";
});

function insertPokemon(pokemones) {
    const li = document.createElement("li");
    let url = pokemones.pokemon.url;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            pokecount++;
            pokemonCount.textContent = pokecount;
            pokeType = data.types.map(type => type.type.name).join(", ");
            poketypeArray = pokeType.split(", ");

            li.classList.add("pokemoncard");
            li.innerHTML = `
                <p>${capitalizeFirstLetter(data.name)}</p>
                <img class="imgpoke" src="${data.sprites.front_shiny}" alt="${pokemones.pokemon.name}" style="width: 150px;">
                <img class="imgpoke" src="${data.sprites.front_default}" alt="${pokemones.pokemon.name}" style="width: 150px;">
                <p>Habilidades: ${data.abilities.map(ability => ability.ability.name).join(", ")}</p>
                <p>Tipo/s: ${pokeType}</p>
            `;
            poketypeArray.forEach(type => {
                li.innerHTML += `<img src = "${type}.svg" class="type" id="${type}"></img>`;
            })

            li.innerHTML += `
                <p>Altura: ${data.height / 10} m | Peso: ${data.weight / 10} kg</p>
                <p>Movimientos: ${data.moves.length}</p>
                <select>${data.moves.map(moveset => `<option value="${moveset.move.name}">${moveset.move.name}</option>`).join("")}</select>
                <input type="checkbox" class="teamCheckbox" name="selectPokemon" id="selectPokemon">
            `;//ponemos la información necesaria para cada pokemon
            pokemonList.appendChild(li);
        });

    li.classList.add("pokemoncard");
    let textoLimpio = (pokemones.pokemon.name).charAt(0).toUpperCase() + (pokemones.pokemon.name).slice(1)
    li.textContent = textoLimpio;
    pokemonList.appendChild(li);
}

function insertType(type) { //función para insertar el tipo en el select 
    const option = document.createElement("option");
    option.value = type.name;
    option.textContent = capitalizeFirstLetter(type.name);
    pokemonSelect.appendChild(option);
}