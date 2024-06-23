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

// Nombres personalizados para ciertos Pokémon
const customNames = {
    29: 'Nidoran F',
    32: 'Nidoran M',
    122: 'Mr. Mime',
    386: 'Deoxys',
    413: 'Wormadam',
    439: 'Mime Jr.',
    474: 'Porygon-Z',
    487: 'Giratina',
    492: 'Shaymin',
    550: 'Basculin',
    555: 'Darmanitan',
    641: 'Tornadus',
    642: 'Thundurus',
    645: 'Landorus',
    647: 'Keldeo',
    648: 'Meloetta',
    678: 'Meowstic',
    681: 'Aegislash',
    710: 'Pumpkaboo',
    711: 'Gourgeist',
    718: 'Zygarde',
    741: 'Oricorio',
    745: 'Lycanroc',
    746: 'Wishiwashi',
    772: 'Type: Null',
    774: 'Minior',
    778: 'Mimikyu',
    785: 'Tapu Koko',
    786: 'Tapu Lele',
    787: 'Tapu Bulu',
    788: 'Tapu Fini',
    849: 'Toxtricity',
    866: 'Mr. Rime',
    875: 'Eiscue',
    876: 'Indeedee',
    877: 'Morpeko',
    892: 'Urshifu',
    902: 'Basculegion',
    905: 'Enamorus',
    984: 'Great Tusk',
    985: 'Scream Tail',
    986: 'Brute Bonnet',
    987: 'Flutter Mane',
    988: 'Slither Wing',
    989: 'Sandy Shocks',
    990: 'Iron Treads',
    991: 'Iron Bundle',
    992: 'Iron Hands',
    993: 'Iron Jugulis',
    994: 'Iron Moth',
    995: 'Iron Thorns',
    1001: 'Wo-Chien',
    1002: 'Chien-Pao',
    1003: 'Ting-Lu',
    1004: 'Chi-Yu',
    1005: 'Roaring Moon',
    1006: 'Iron Valiant',
    1009: 'Walking Wake',
    1010: 'Iron Leaves',
    1020: 'Gouging Fire',
    1021: 'Raging Bolt',
    1022: 'Iron Boulder',
    1023: 'Iron Crown',
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
    
    // Usar el nombre personalizado si existe, de lo contrario usar el nombre original
    const pokemonName = customNames[pokemon.id] || (pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
    name.textContent = pokemonName;
    
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
