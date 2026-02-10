import { Router } from "express";
import { TicketController } from "./controller";
import { WssService } from "../services/wss.service";
import { TicketService } from "../services/ticket.service";

export class TicketRoutes {
    static get routes(): Router {
        const router = Router();

        const wssService = WssService.instance;
        const ticketService = new TicketService(wssService);
        const controller = new TicketController(ticketService, wssService);

        // Crear tickets
        router.get('/', controller.getTickets);
        router.get('/last', controller.getLastTicket);
        router.get('/pending', controller.getPendingTickets);
        router.post('/', controller.createTicket);

        router.get('/draw/:desk', controller.drawTicket);

        router.put('/done/:ticketId', controller.doneTicket);

        router.get('/working-on', controller.getWorkingOn);

        return router;
    }
}
