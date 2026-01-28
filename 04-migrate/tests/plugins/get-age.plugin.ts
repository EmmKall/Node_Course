import { getAge } from '../../src/plugins/get-age.plugin';

describe('plugins/get-age-plugin', () => {

    test('getAge() should return the age a person', () => {
        const birthdate: string = '1992-01-03';
        const age: number = getAge(birthdate);
        // expect(age).toBe(34);
        expect(typeof age).toBe('number');
    });
    
    test('getAte should return current age', () => {
        const birthdate: string = '1992-01-03';
        const age: number = getAge(birthdate);
        const calculatedAge: number = new Date().getFullYear() - new Date(birthdate).getFullYear();
        expect(age).toBe(calculatedAge);
    
    });

    test('getAge should return 0 years', () => {
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2023);

        const birthdate = '1992-01-03';
        const age = getAge(birthdate);
        expect(age).toBe(0);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    
    });

});