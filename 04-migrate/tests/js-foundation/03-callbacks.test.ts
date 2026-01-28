import { User, users, getUserById } from '../../src/js-foundation/03-callbacks';

describe('03-callbacks', () => {

    test('id 3, should not exist', () => {
        const id: number = 3;
        getUserById(id, (err, user) => {
            expect(user).toBeUndefined();
        }); 
    });

    test('id 2, should be Jane', (done) => {
        const id: number = 2;
        const name: string = 'Jane Doe';
        getUserById(id, (err, user) => {
            expect(user?.name).toBe(name);
            expect(user?.id).toBe(id);
            expect(user).toEqual({ id, name });
            done();
        }); 
    });

});