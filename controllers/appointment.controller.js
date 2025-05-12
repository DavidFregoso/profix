const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');

// GET /appointment/:providerId
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ provider: req.params.providerId })
      .populate('user', 'name email')
      .populate('provider', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener citas.', error: err.message });
  }
};

// POST /appointment/:providerId
exports.createAppointment = async (req, res) => {
  try {
    const { day, startTime, endTime, comment } = req.body;

    const newAppointment = new Appointment({
      provider: req.params.providerId,
      user: req.user._id,
      day,
      startTime,
      endTime,
      comment
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Cita creada exitosamente.', appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear cita.', error: err.message });
  }
};

// DELETE /appointment/:appointmentId
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada.' });
    }

    res.json({ message: 'Cita cancelada exitosamente.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al cancelar la cita.', error: err.message });
  }
};
