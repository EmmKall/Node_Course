export interface  CreateTableUseCaseI {
    execute: (options: CreateTableOptionsI) => string;
    
}

export interface CreateTableOptionsI {
    base: number;
    limit?: number;
    show?: boolean;
}

export class CreateTable implements CreateTableUseCaseI{

    constructor(){
        /**
         * DI - Dependency Inyection 
        **/
    }

    execute({base, limit = 10}: CreateTableOptionsI) {
        let content: string = '';
        for(let i = 1; i <=limit; i++){ content += `${base} * ${i} = ${base*i} \n`; }
        return content;
    }

}

