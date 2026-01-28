import fs from 'fs';

export interface SaveFileUseCaseI {
    execute: (options: OptionsI) =>boolean;

}

export interface OptionsI {
    fileContent:  string;
    destination?: string;
    fileName?:    string;
}

export class SaveFileUseCase {

    constructor(){
        /* StorageRepository */
    }

    execute({fileContent, fileName = 'table-'+Date().toString(), destination = 'output'}: OptionsI): boolean {

        try {
            fs.mkdirSync(destination, {recursive: true});
            fs.writeFileSync(`${destination}/${fileName}.txt`, fileContent);
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }


}

