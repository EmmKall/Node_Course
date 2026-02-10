import { Request, Response } from "express";
import { WssService } from "../services/wss.service";
import { TicketService } from "../services/ticket.service";

export class TicketController {

    //DI - WssService
    constructor(
        private readonly ticketService: TicketService,
        private readonly wssService: WssService,
    ) { }

    getTickets = async (req: Request, res: Response) => {
        const response = this.ticketService.getTickets;
        res.json(response);
    }

    getLastTicket = async (req: Request, res: Response) => {
        const response = this.ticketService.lastTicket;
        res.json(response);
    }

    getPendingTickets = async (req: Request, res: Response) => {
        const response = this.ticketService.pendingTickets;
        res.json(response);
    }

    createTicket = async (req: Request, res: Response) => {
        const response = this.ticketService.createTicket();
        res.json(response);
    }

    drawTicket = async (req: Request, res: Response) => {
        const { desk } = req.params;
        if (!desk) return res.status(400).json({ error: true, msg: 'Desk is required' });
        const response = this.ticketService.drawTicket(desk);
        res.json(response);
    }

    doneTicket = async (req: Request, res: Response) => {
        const { ticketId } = req.params;
        if (!ticketId) return res.status(400).json({ error: true, msg: 'Ticket ID is required' });
        const response = this.ticketService.doneTicket(ticketId);
        res.json(response);
    }

    getWorkingOn = async (req: Request, res: Response) => {
        const response = this.ticketService.getWorkingOn();
        res.json(response);
    }

}
