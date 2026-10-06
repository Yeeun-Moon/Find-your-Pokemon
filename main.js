const card = document.querySelector('#card');
const searchInput = document.querySelector('#search');

async function loadPokemon(query) {
  try {
    card.textContent = 'Loading...';
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }
    const data = await response.json();
    console.log(data);

    const { name, height, weight, types, sprites } = data;
    const typeNames = types.map(t => t.type.name).join(', ');

    card.innerHTML = `
      <img src="${sprites.other['official-artwork'].front_default}" alt="${name}">
      <h2>${name}</h2>
      <p>Type: ${typeNames}</p>
      <p>Height: ${height / 10} m</p>
      <p>Weight: ${weight / 10} kg</p>
    `;
  } catch (error) {
    card.textContent = error.message;
  }
}

document.querySelector('#searchBtn').addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query) loadPokemon(query);
});

document.querySelector('#randomBtn').addEventListener('click', () => {
  const id = Math.floor(Math.random() * 1000) + 1;
  loadPokemon(id);
});

loadPokemon(25);