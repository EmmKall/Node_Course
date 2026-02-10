import { TicketI } from "../../interfaces/ticketI";
import { UuidAdapter } from "../../config/uuid.adapter";
import { WssService } from "./wss.service";

export class TicketService {

    private readonly tickets: TicketI[] = [
        {
            id: UuidAdapter.randomUUID(),
            number: 1,
            createdAt: new Date(),
            done: false,
        },
        {
            id: UuidAdapter.randomUUID(),
            number: 2,
            createdAt: new Date(),
            done: false,
        },
        {
            id: UuidAdapter.randomUUID(),
            number: 3,
            createdAt: new Date(),
            done: false,
        },
        {
            id: UuidAdapter.randomUUID(),
            number: 4,
            createdAt: new Date(),
            done: false,
        },
        {
            id: UuidAdapter.randomUUID(),
            number: 5,
            createdAt: new Date(),
            done: false,
        },
    ];

    private readonly workingTickets: TicketI[] = [];

    constructor(
        private readonly wssService: WssService,
    ) { }

    public get getTickets(): TicketI[] {
        return this.tickets;
    }

    public get currentTicketNumber(): number {
        return this.tickets.length + 1;
    }

    public get pendingTickets(): TicketI[] {
        return this.tickets.filter(ticket => !ticket.done);
    }

    public get lastTicket(): number {
        return this.tickets.at(-1)?.number ?? 0;
    }

    public getTicketById(id: string): TicketI | undefined {
        return this.tickets.find(ticket => ticket.id === id);
    }

    public createTicket(): TicketI {
        const ticket: TicketI = {
            id: UuidAdapter.randomUUID(),
            number: this.currentTicketNumber,
            createdAt: new Date(),
            done: false,
        };

        this.tickets.push(ticket);
        this.onTicketChanged();
        return ticket;
    }

    public drawTicket(desk: string): { error: boolean, msg: string, ticket?: TicketI } {
        const ticket = this.tickets.find(ticket => !ticket.done && !ticket.handleAtDesk);
        if (!ticket) return { error: false, msg: 'There are no pending tickets' };
        this.tickets.map(t => {
            if (t.id === ticket.id) {
                t.handleAtDesk = desk;
                t.handleAt = new Date();
            }
        });

        this.workingTickets.unshift({ ...ticket });
        this.onTicketChanged();
        this.onTicketWorkingOn();
        return { error: false, msg: 'Ticket assigned', ticket };
    }

    public doneTicket(ticketId: string): { error: boolean, msg: string, ticket?: TicketI } {
        const ticket = this.tickets.find(ticket => ticket.id === ticketId);
        if (!ticket) return { error: false, msg: 'Ticket not found' };
        if (!ticket.handleAtDesk) return { error: false, msg: 'Ticket not assigned' };
        if (ticket.done) return { error: false, msg: 'Ticket already done' };

        this.tickets.map(t => {
            if (t.id === ticketId) {
                t.done = true;
                t.doneAt = new Date();
            }
        });

        this.onTicketChanged();
        return { error: false, msg: 'Ticket done', ticket };
    }

    public getWorkingOn(limit: number = 4): { error: boolean; tickets: TicketI[] } {
        const data = this.workingTickets.slice(0, limit);
        return { error: false, tickets: data };
    }

    private onTicketChanged() {
        this.wssService.broadcastMessage('on-ticket-count-changed', this.tickets.length);
    }

    private onTicketWorkingOn() {
        this.wssService.broadcastMessage('on-ticket-working-on', this.workingTickets);
    }

}
