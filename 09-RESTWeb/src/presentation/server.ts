import express, { Router } from 'express';
import compression from 'compression';
import path from 'path';

interface ServerOptions {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {
    
    private readonly port: number;
    private readonly publicPath: string;

    private readonly app = express();
    private readonly routes = Router();
    
    constructor({port, routes, public_path}: ServerOptions) {
        this.port = port;
        this.routes = routes;
        this.publicPath = public_path || 'public';
    }

    async start() {

        // Middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(compression());
        // Public folders
        this.app.use(express.static(this.publicPath));

        // Routes
        this.app.use('/api', this.routes);

        // SPA
        this.app.use((req, res) => {
            const indexPath = path.join(`${__dirname}../../../${this.publicPath}/index.html`);
            console.log(req.url);
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }

}
