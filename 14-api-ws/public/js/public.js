
const url_endpoint = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://tu-dominio.com';
const url_ws = window.location.hostname === 'localhost' ? 'ws://localhost:3000/ws' : 'wss://tu-dominio.com/ws';

const lblTicket01 = document.getElementById('lbl-ticket-01');
const lblTicket02 = document.getElementById('lbl-ticket-02');
const lblTicket03 = document.getElementById('lbl-ticket-03');
const lblTicket04 = document.getElementById('lbl-ticket-04');

const lblDesk01 = document.getElementById('lbl-desk-01');
const lblDesk02 = document.getElementById('lbl-desk-02');
const lblDesk03 = document.getElementById('lbl-desk-03');
const lblDesk04 = document.getElementById('lbl-desk-04');

console.log('Público HTML')

document.addEventListener('DOMContentLoaded', () => {
    connectToWebSockets();
    loadInitialData();
});

function loadInitialData() {
    const endpoint_last = `${url_endpoint}/api/tickets/working-on`;
    fetch(endpoint_last, { method: 'GET', headers: { 'Content-Type': 'application/json', }, })
        .then(response => response.json())
        .then(data => {
            const { tickets } = data;
            updateTickets(tickets);
        })
        .catch(error => console.error('Error:', error));

    //const { tickets } = await fetch(`${url_endpoint}/api/tickets/working-on`, { method: 'GET', headers: { 'Content-Type': 'application/json', }, })
}

function updateTickets(tickets) {
    console.log(tickets);
    tickets.forEach((ticket, i) => {
        const labelTicket = document.getElementById(`lbl-ticket-0${i + 1}`);
        const labelDesk = document.getElementById(`lbl-desk-0${i + 1}`);
        if (labelTicket) {
            labelTicket.innerText = `Ticket ${ticket.number}`;
        }
        if (labelDesk) {
            labelDesk.innerText = `Escritorio ${ticket.handleAtDesk || '---'}`;
        }
    });

}

function connectToWebSockets() {

    const socket = new WebSocket(url_ws);

    socket.onmessage = ({ data }) => {
        const { type, payload } = JSON.parse(data);
        console.log({ type });
        console.log({ payload });
        /* if (type === 'on-ticket-count-changed') {
            loadInitialData();
        } */
        if (type === 'on-ticket-working-on') {
            updateTickets(payload);
        }
    };

    socket.onclose = (event) => {
        console.log('Connection closed');
        setTimeout(() => {
            console.log('retrying to connect');
            connectToWebSockets();
        }, 1500);

    };

    socket.onopen = (event) => {
        console.log('Connected');
    };

}


