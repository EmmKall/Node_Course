import expres, { Request, Response } from "express";
import { Envs } from "./config";
import { GitHubContoller } from "./presentation/github/controller";

(() => {
    main();

})();

function main() {
    const app = expres();

    const controller = new GitHubContoller();

    app.use(expres.json());


    app.post('/api/github', controller.webHookHandle);

    app.listen(Envs.PORT, () => {
        console.log(`App running on port ${Envs.PORT}`);
    });

}
