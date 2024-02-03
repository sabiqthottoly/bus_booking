// models/Ticket.js
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  seatNumber: { type: Number, min: 1, max: 40, required: true },
  isBooked: { type: Boolean, default: true },
  date: { type: Date, default: Date.now() },
  passenger: { type: mongoose.Schema.Types.ObjectId }
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
