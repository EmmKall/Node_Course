const {http} = require('../plugins');

const urlPokemon = 'https://pokeapi.co/api/v2/';

const getPokemonById = async(id) => {
    // return await fetch(`${urlPokemon}pokemon/${id}`)
    // .then(response => response.json())
    // .then(data => data)
    // .catch(error => console.log(error))
    // .finally(() => console.log('finally'));
    
    // const url = `${urlPokemon}pokemon/${id}`;
    // const resp = await fetch(`${urlPokemon}pokemon/${id}`);
    // const data = await resp.json();
    // return data;

    const url = `${urlPokemon}pokemon/${id}`;
    const pokemon = await http.get(url);
    return pokemon;
    

}


module.exports = {
    getPokemonById,
}
