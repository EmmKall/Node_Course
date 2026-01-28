import { characters } from '../../src/js-foundation/02-destructuring';

describe('02-destructuring', () => {

    test('should exist Batman', () => {
        expect(characters).toContain('Batman');
        expect(characters).toContain('Flash');
    });

    test('Array should start with Flas', () => {
        expect(characters[0]).toBe('Flash');

        const [flash, superman ] = characters;

        expect(flash).toBe('Flash');
        expect(superman).toBe('Superman');
    });

});
