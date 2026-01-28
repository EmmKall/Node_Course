import {SaveFile} from './save-file.use-case';
import fs, { mkdirSync } from 'fs';

describe('SaveFile', () => {

    test('Should save file with default values', () => {
        const saveFile = new SaveFile();
        const fileContent = `Test content test`;
        const isSave = saveFile.execute({fileContent});

        const checFile = fs.existsSync(`output/ `);

        expect(saveFile).toBeInstanceOf(SaveFile);
        expect(isSave).toBe(true);
    });

    test('Should save file with custom values', () => {
        const options = {
            fileContent:     'Should save file with custom values contect',
            fileDestination: 'output',
            fileName:        'CustomValue',
        };

        const saveFile = new SaveFile();
        const isSaved: boolean = saveFile.execute(options)

        expect(isSaved).toBeTruthy();
    });

    test('Should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('error test Save File error') }
        );

        const result = saveFile.execute({fileContent: 'Test false save data'});

        expect(result).toBeFalsy();
        // mkdirSpy.mockRestore();
    });

});