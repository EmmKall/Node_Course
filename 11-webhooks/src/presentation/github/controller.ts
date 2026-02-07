import { Request, Response } from "express";
import { GithubService } from "./services/github.service";

export class GitHubContoller {

    constructor(
        private readonly githubService = new GithubService()
    ) {

    }

    public async webHookHandle(req: Request, res: Response) {
        console.log('Endpoind called')
        
        const gitHubEvent = req.header('x-github-event') ?? 'unknown'; console.log({gitHubEvent});
        const signature  = req.header('x-hub-signature-256') ?? 'unknown'; console.log({signature});

        const payload = req.body;
        let response;
        switch(gitHubEvent){
            case 'issues':
                response = this.githubService.onIssue(payload);
                break;
            case 'star':
                response = this.githubService.onStar(payload);
                break;
            default:
                response = `Unknow event: ${gitHubEvent}`;
                break;
        }
        res.status(202).json(response);
    }

}
