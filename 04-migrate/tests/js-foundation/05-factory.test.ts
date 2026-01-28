import { buildMakePerson } from '../../src/js-foundation/05-factory';
import { getUUID } from '../../src/plugins/get-id.plugin';
import { getAge } from '../../src/plugins/get-age.plugin';



describe('05-factory', () => {

    test('buildMakePerson should return a function', () => {
        const makePerson = buildMakePerson({ getUUID, getAge });
        expect(typeof makePerson).toBe('function');
    });

    test('makePerson should retunr a person', () => {
        const makePerson = buildMakePerson({ getUUID, getAge });
        const john = makePerson({ name: 'John', birthdate: '1985-10-21' });
        expect(john).toEqual({
            id: expect.any(String),
            name: 'John',
            birthdate: '1985-10-21',
            age: 41,
        });
    });

});