const lastTicketlbl = document.getElementById('lbl-last-ticket');
const pendingTicketlbl = document.getElementById('lbl-pending');
const alertPendingTicket = document.getElementsByClassName('alert')[0];
const deskH1 = document.querySelector('h1');
const btnDrawTicket = document.querySelector('#draw-ticket');
const btnDoneTicket = document.querySelector('#done-ticket');
const currentTicketlbl = document.querySelector('.text-primary');

let desk = 0;
let currentTicket = null;

const url_endpoint = 'http://localhost:3000';

async function loadInitialData() {
    const endpoint_last = `${url_endpoint}/api/tickets/pending`;
    fetch(endpoint_last, { method: 'GET', headers: { 'Content-Type': 'application/json', }, })
        .then(response => response.json())
        .then(data => { updatePendingTicket(data.length); })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {

    getParams();

    loadInitialData();

    btnDrawTicket.addEventListener('click', () => {
        drawTicket();
    });

    btnDoneTicket.addEventListener('click', () => {
        doneTicket();
    });
});

function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('escritorio')) {
        window.location.href = 'index.html';
        return;
    }

    desk = urlParams.get('escritorio');
    deskH1.innerText = `Escritorio ${desk}`;
}

function updatePendingTicket(lastTicketNumber = 0) {
    pendingTicketlbl.innerText = lastTicketNumber;
    if (lastTicketNumber === 0) alertPendingTicket.classList.remove('d-none');
    else alertPendingTicket.classList.add('d-none');
}

function drawTicket() {
    if (currentTicket) {
        alert('Ya tienes un ticket asignado');
        return;
    };
    const endpoint_draw = `${url_endpoint}/api/tickets/draw/${desk}`;
    fetch(endpoint_draw, { method: 'GET', headers: { 'Content-Type': 'application/json', }, })
        .then(response => response.json())
        .then(data => {
            updatePendingTicket(data.length);
            currentTicket = data.ticket; console.log(currentTicket);
            currentTicketlbl.innerText = currentTicket.number;
            loadInitialData();
        })
        .catch(error => console.error('Error:', error));
}

function doneTicket() {
    if (!currentTicket) return;
    const endpoint_done = `${url_endpoint}/api/tickets/done/${currentTicket.id}`;
    fetch(endpoint_done, { method: 'PUT', headers: { 'Content-Type': 'application/json', }, })
        .then(response => response.json())
        .then(data => {
            updatePendingTicket(data.length);
            currentTicket = null;
            currentTicketlbl.innerText = '...';
            loadInitialData();
        })
        .catch(error => console.error('Error:', error));
}

function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onmessage = ({ data }) => {
        const { type, payload } = JSON.parse(data);
        if (type === 'on-ticket-count-changed') {
            updatePendingTicket(payload);
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

connectToWebSockets();