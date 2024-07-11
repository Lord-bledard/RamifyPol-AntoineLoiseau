// loadPokemonInfo.js

document.addEventListener('DOMContentLoaded', (event) => {
    // Get Pokémon from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const playerPokemon = urlParams.get('pokemon1');
    const opponentPokemon = urlParams.get('pokemon2');

    if (playerPokemon && opponentPokemon) {
        fetchPokemonInfo(playerPokemon, 'player');
        fetchPokemonInfo(opponentPokemon, 'opponent');
    } else {
        console.error("Pokémon names are missing from URL parameters.");
    }
});

function fetchPokemonInfo(pokemonName, type) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
            updatePokemonInfo(data, type);
        })
        .catch(error => console.error('Error fetching Pokémon data:', error));
}

function updatePokemonInfo(pokemonData, type) {
    const nameElement = document.getElementById(`${type}-name`);
    const hpElement = document.getElementById(`${type}-hp`);
    const imageElement = document.getElementById(`${type}-pokemon`);

    nameElement.innerText = capitalizeFirstLetter(pokemonData.name);
    hpElement.innerText = `HP: ${pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat}`;
    imageElement.src = pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default;

    // Log Pokémon data for debugging
    console.log(`${type} Pokémon data:`, pokemonData);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
