import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import  { ServerApp } from './server-app';

describe( 'Server App', () => {

    const options = { base: 2, limit: 10, showTable: false, fileDestination: 'test-destination', fileName: 'test.filename' };

    /* test('Should create serverApp Instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    }); */

    /* test('Should run ServerApp with options', () => {
        
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');

        const options = { base: 2, limit: 10, showTable: false, fileDestination: 'test-destination', fileName: 'test.filename' };

        ServerApp.run(options);
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({base: options.base, limit: options.limit});
    }); */

    test('Should run with custom values mocked', () => {
        const logMock = jest.fn();  
        const logErrorMock = jest.fn();  
        const createMock = jest.fn().mockRejectedValue('1 x 1 = 1');
        const saveFileMock = jest.fn();
        
        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
 
        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({base:2, limit: 10});
        expect(saveFileMock).toHaveBeenCalledWith({fileContent: '1 x 1 = 1'});

    });

});