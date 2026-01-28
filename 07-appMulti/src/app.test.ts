//process.argv = ['node', 'app.ts', '-b', '5'];
//import './app';
import { ServerApp } from './presentation/server-app';

describe('app.ts', () =>{

    test('Should call Server.run with values', async() => {
        const serveRunMock = jest.fn();
        ServerApp.run = serveRunMock;
        process.argv = ['node', 'app.ts', '-b', '5', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-dir'];

        await import('./app');

        expect(serveRunMock).toHaveBeenCalledWith({
            base: 5,
            limit: 5,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test-dir'
        });
    })

});