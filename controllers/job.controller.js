const Job = require('../models/job.model');
const User = require('../models/user.model');

// Obtener trabajos de un proveedor específico
exports.getJobs = async (req, res) => {
  try {
    const providerId = req.params.providerId;

    // Buscar trabajos del proveedor
    const jobs = await Job.find({ provider: providerId });

    if (!jobs) {
      return res.status(404).json({ message: 'Trabajos no encontrados' });
    }

    return res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al obtener los trabajos' });
  }
};

// Crear un nuevo trabajo para un proveedor específico
exports.createJob = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const { title, description, date, imageURL } = req.body;

    // Verificar si el proveedor existe
    const provider = await User.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    // Crear el trabajo
    const newJob = new Job({
      provider: providerId,
      title,
      description,
      date,
      imageURL,
    });

    // Guardar el trabajo en la base de datos
    await newJob.save();

    // Actualizar el campo "jobs" del proveedor
    provider.jobs.push(newJob._id);
    await provider.save();

    return res.status(201).json(newJob);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al crear el trabajo' });
  }
};
