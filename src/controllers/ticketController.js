// controllers.js
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const validation = require('../middleware/validation')
const { ObjectId } = require('mongodb');

exports.createTicket = async (req, res) => {
  try {
    const { seatNumber, passenger } = req.body;
    let [result, data] = validation.userValidation(passenger)
    
    // Validate seat number
    if (!seatNumber || seatNumber < 1 || seatNumber > 40) {
      return res.status(400).json({ error: 'Invalid seat number' });
    }

    if (!result) return res.status(404).json({ message: data })

    // Check if the user already exists
    let user = await User.findOne({ email: passenger.email });
    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User(passenger);
      await user.save();
    }
    console.log("user", user);
    const ticket = new Ticket({ seatNumber, passenger: user._id });
    await ticket.save();
    res.status(200).json({ message: "Ticket created successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  const { ticketId } = req.params;
  const payload = req.body;
  let passenger = null;

  if ('passenger' in payload) {
    passenger = req.body.passenger;
  }

  try {
      const ticket = await Ticket.findById(ObjectId(ticketId));
      if (payload.isBooked === true) {
        const user_id = ticket.passenger;
        await User.remove({ _id: user_id });
        ticket.isBooked = !payload.isBooked;
        const savedTicket = await ticket.save();
        res.status(200).json({message: "Updated Successfully", data: savedTicket});
      }

      if (payload.isBooked === false && passenger !== null) {
        const user = new User(passenger);
        const savedUser = await user.save();
        if (savedUser) {
          ticket.passenger = savedUser._id;
          ticket.isBooked = !payload.isBooked;
          const savedTicket = await ticket.save();
          res.status(200).json({message: "Updated Successfully", data: savedTicket});
        }
      }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getTicket = async (req, res) => {
  const { ticketId } = req.params;
  try {
      const ticket = await Ticket.findById(ObjectId(ticketId));
      
      if (ticket) {
          res.status(200).json({ status: ticket.isBooked ? "Already Booked" : "Not Booked" });
      } else {
        res.status(400).json({ message: "Ticket Not Found" });
      }
  } catch (error) {
    console.log("error", error)
      res.status(404).json({ message: error.message });
  }
};

exports.getClosedTickets = async (req, res) => {
  try {
    const closedTickets = await Ticket.find({ isBooked: true });
    res.status(200).json({ data: closedTickets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOpenTickets = async (req, res) => {
  try {
    const openTickets = await Ticket.find({ isBooked: false });
    res.status(200).json({ data: openTickets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTicketDetails = async (req, res) => {
  const { ticketId } = req.params;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      res.status(400).json({ message: "Ticket not found" }); 
    }

    const user = await User.findById(ticket.passenger);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.resetServer = async (req, res) => {
  try {
    await Ticket.updateMany({}, { $set: { isBooked: false, userDetails: null } });
    res.json({ message: 'Server reset successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
