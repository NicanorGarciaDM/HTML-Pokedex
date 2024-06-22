const container = document.getElementById('pokemon-container');
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');

let allPokemon = [];

// Colores asociados a cada tipo de Pokémon
const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};

const fetchPokemonData = async () => {
    for (let i = 1; i <= 1025; i++) { 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemon = await response.json();
        allPokemon.push(pokemon);
        createPokemonCard(pokemon);
    }
};

const createPokemonCard = (pokemon) => {
    const card = document.createElement('div');
    card.classList.add('card-pokemon');
    card.dataset.name = pokemon.name.toLowerCase();

    // Obtener el tipo principal del Pokémon
    const primaryType = pokemon.types[0].type.name;
    const backgroundColor = typeColors[primaryType] || '#777'; // Color por defecto si el tipo no está en el objeto

    // Establecer el color de fondo según el tipo
    card.style.backgroundColor = backgroundColor;

    const number = document.createElement('span');
    number.classList.add('numero-pokemon');
    number.textContent = `#${String(pokemon.id).padStart(3, '0')}`;
    
    const image = document.createElement('img');
    image.classList.add('sprite-pokemon');
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;
    
    const name = document.createElement('span');
    name.classList.add('nombre-pokemon');
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    card.appendChild(number);
    card.appendChild(image);
    card.appendChild(name);
    
    container.appendChild(card);
};

const searchPokemon = () => {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.includes(searchTerm));
    container.innerHTML = '';
    filteredPokemon.forEach(pokemon => createPokemonCard(pokemon));
};

searchButton.addEventListener('click', searchPokemon);
searchBar.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchPokemon();
    }
});

fetchPokemonData();
