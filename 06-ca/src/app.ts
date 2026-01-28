import { ServerApp } from "./presentation/server-app";
import { yarg } from "./config/plugins/yargs.plugin"
import { OptionsI, SaveFileUseCase } from "@domain/use-cases/save-file.use-case";


(async() => {
    await main();
})();

async function main(){
    
    const {b: base, l: limit, s: showTable } = yarg;

    const table = ServerApp.run({base, limit, showTable });

    const data: OptionsI = {
        fileContent: table,
        destination: 'output',
        fileName: `table-${base}`
    }
    
    const isTableCeate: boolean = new SaveFileUseCase().execute(data);
    console.log(`It was ${isTableCeate ? '': ' not '}saved`);
}
