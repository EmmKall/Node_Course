import { CreateTable } from "@domain/use-cases/create-table.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
}

export class ServerApp {
    
    static /* async */ run({limit, base, showTable}: RunOptions): string {
        try {
            const table = new CreateTable().execute({base, limit});
            console.log(table)
            return table;
        } catch(err){
            console.log(err);
            return '';
        }

    }

}
