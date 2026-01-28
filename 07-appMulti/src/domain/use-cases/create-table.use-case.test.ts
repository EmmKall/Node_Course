import {CreateTable} from './create-table.use-case';

describe('CreateTable', () =>{

    test('Should create table with default values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({base:2});
        const rows = table.split('\n').length;

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(rows).toBe(10);
    });

    test('Should create table with custom values', () => {
        const options = {base: 3, limit: 20};
        const createTable = new CreateTable();
        const table = createTable.execute(options);
        const rows = table.split('\n').length;

        expect(rows).toBe(options.limit);
        expect(table).toContain(`${options.base} x`);
    })

})