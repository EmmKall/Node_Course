export interface TicketI {
    id: string;
    number: number;
    createdAt: Date;
    handleAtDesk?: string;
    handleAt?: Date;
    done: boolean;
    doneAt?: Date;
}
