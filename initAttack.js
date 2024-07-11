document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerPokemon = urlParams.get('pokemon1');
    const opponentPokemon = urlParams.get('pokemon2');

    if (playerPokemon && opponentPokemon) {
        fetchPokemonAttacks(playerPokemon, 'player');
        fetchPokemonAttacks(opponentPokemon, 'opponent');
    } else {
        console.error("Pokémon names are missing from URL parameters.");
    }
});

function fetchPokemonAttacks(pokemonName, type) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
            initializeAttacks(data, type);
        })
        .catch(error => console.error('Erreur lors de la récupération des données Pokémon:', error));
}

function initializeAttacks(pokemonData, type) {
    const moves = pokemonData.moves;
    const selectedIndices = getRandomIndices(moves.length, 4); // Obtenir 4 indices aléatoires uniques
    const selectedMoves = selectedIndices.map(index => moves[index]); // Sélectionner les mouvements par indices
    const attackButtons = document.querySelectorAll(`.${type}-attack-button`);

    selectedMoves.forEach((move, index) => {
        if (attackButtons[index]) {
            fetch(move.move.url)
                .then(response => response.json())
                .then(moveData => {
                    attackButtons[index].innerText = moveData.name.charAt(0).toUpperCase() + moveData.name.slice(1);
                    attackButtons[index].setAttribute('data-power', moveData.power);
                    attackButtons[index].setAttribute('data-accuracy', moveData.accuracy);
                })
                .catch(error => console.error('Erreur lors de la récupération des données de l\'attaque:', error));
        }
    });
}

function getRandomIndices(max, count) {
    const indices = [];
    while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
        }
    }
    return indices;
}
