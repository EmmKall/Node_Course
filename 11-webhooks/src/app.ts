import expres, { Request, Response } from "express";
import { Envs } from "./config";

(() => {
    main();

})();

function main() {
    const app = expres();

    app.post('/api/github', (req:Request, res: Response)=>{
        res.json({msg:'API GitHub'});
    });

    app.listen(Envs.PORT, () => {
        console.log(`App running on port ${Envs.PORT}`);
    });

}
