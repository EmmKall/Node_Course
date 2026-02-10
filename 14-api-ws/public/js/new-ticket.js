const url_endpoint = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://tu-dominio.com';

const newTicketlbl = document.getElementById('lbl-new-ticket');
const createTicketBtn = document.querySelector('button');

document.addEventListener('DOMContentLoaded', () => {
    getLastTicket();
});

function getLastTicket() {
    const endpoint_last = `${url_endpoint}/api/tickets/last`;
    fetch(endpoint_last, { method: 'GET', headers: { 'Content-Type': 'application/json', }, })
        .then(response => response.json())
        .then(data => { updateLastTicket(data); })
        .catch(error => console.error('Error:', error));

    createTicketBtn?.addEventListener('click', () => {
        createTicket();
    });
}

function updateLastTicket(lastTicketNumber) {
    newTicketlbl.innerText = lastTicketNumber;
}

function createTicket() {
    const endpoint_new = `${url_endpoint}/api/tickets`;
    fetch(endpoint_new, { method: 'POST', headers: { 'Content-Type': 'application/json', }, })
        .then(response => response.json())
        .then(data => { updateLastTicket(data.number); })
        .catch(error => console.error('Error:', error));
}
