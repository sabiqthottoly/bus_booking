const Joi = require('joi')
const secretKey = 'demo_secret';
const jwt = require('jsonwebtoken');

function validateObj(obj, schema) {
    let result = null
    Joi.validate(obj, schema, (err, data) => {
        if (err) {
            result = [false, err]
        }
        else {
            result = [true, data]
        }
    })
    return result
}

function userValidation(user) {
    const userSchema = Joi.object().keys({
        name: Joi.string().trim().min(5).max(100).required(),
        sex: Joi.string().trim().max(1).required(),
        age: Joi.number().min(18).required(),
        phone: Joi.string().trim().max(10).required(),
        email: Joi.string().trim().email().required(),
    })
    return validateObj(user, userSchema)
}

function seatNumberValidation(seatNumber) {
    const seatNumberSchema = Joi.object().keys({
        seatNumber: Joi.string().trim().min(1).max(40).required(),
    })
    return validateObj(seatNumberSchema, {seatNumber})
}


function openTicket(ticket) {
    ticket.is_booked = false
    ticket.save()
        .then(data => console.log(`Opened ticket with ticketID: ${ticket._id}`))
        .catch(err => console.log(`Failed to open ticket with ticketID: ${ticket._id}`))
}

// Middleware to verify JWT token.
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'Token is required.' });
    }
    const token = req.headers.authorization.split(' ')[1];;
    if (!token) {
      return res.status(403).json({ message: 'Token is required.' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
      req.user = user; // Attach the decoded user to the request object.
      next();
    });
}


module.exports = {
    userValidation: userValidation,
    openTicket: openTicket,
    seatNumber: seatNumberValidation,
    verifyToken
}
