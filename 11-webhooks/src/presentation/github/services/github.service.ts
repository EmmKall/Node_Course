import { GitHubIssuePayload, GitHubStarPayload } from "../../../interfaces";


export class GithubService {

    constructor(){}

    onStar(payload: GitHubStarPayload): string {
        let msg = '';
        const {action, sender, repository, starred_at} = payload;
        if(!starred_at) return `${sender} not star ${action} ${repository.full_name}`;
        return `${sender.login} star on ${repository.full_name} at ${starred_at}`;

    }

    onIssue(payload: GitHubIssuePayload): string {
        const {action, issue} = payload;
        if(action === 'opened') return `An issue was opened with this title ${issue.title}`;
        if(action === 'closed') return `An issue was closed with this title ${issue.title}`;
        if(action === 'reopened') return `An issue was reopened with this title ${issue.title}`;
        return ('Unknow action');
    }


}
