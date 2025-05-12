const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:providerId', appointmentController.getAppointments);
router.post('/:providerId', authMiddleware, appointmentController.createAppointment);
router.delete('/:appointmentId', authMiddleware, appointmentController.cancelAppointment);

module.exports = router;