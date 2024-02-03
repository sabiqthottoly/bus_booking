// routes.js
const express = require('express');
const router = express.Router();
const {
  createTicket,
  updateTicket,
  getTicket,
  getClosedTickets,
  getOpenTickets,
  getTicketDetails,
  resetServer,
} = require('../controllers/ticketController');
const { verifyToken } = require('../middleware/validation');

// Create a new ticket
router.post('/tickets', verifyToken ,createTicket);

// Update ticket status and add user details
router.put('/tickets/:ticketId', verifyToken, updateTicket);

// View Ticket Status
router.get('/tickets/:ticketId', verifyToken, getTicket);

// View all closed tickets
router.post('/tickets/closed', verifyToken, getClosedTickets);

// View all open tickets
router.post('/tickets/open', verifyToken, getOpenTickets);

// View Details of the person owning the ticket
router.get('/tickets/details/:ticketId', verifyToken, getTicketDetails);

// Additional API for admin to reset the server
router.post('/admin/reset', verifyToken,  resetServer);

module.exports = router;
