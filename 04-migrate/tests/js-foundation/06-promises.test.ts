import { getPokemonById } from '../../src/js-foundation/06-promises';

describe('06-promises', () => {

    test('getPokemonById should return a pokemon', async() => {
        const pokemonId: number = 1;
        await getPokemonById(pokemonId)
        .then( pokemon => {
            expect(pokemon).toBe('bulbasaur');
        });
    });

    test('Should return an error if pokemon does not exist', async() => {
        const pokemonId: number = 100000000;
        await getPokemonById(pokemonId)
        .then( pokemon => {
            expect(pokemon).toBe('Pokemon no existe');
        })
        .catch( err => {
            expect(err).toBe('Pokemon no existe');
        });
    });

});