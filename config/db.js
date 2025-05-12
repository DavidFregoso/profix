const mongoose = require('mongoose');

module.exports = () =>
  mongoose.connect(process.env.MONGO_URI, { dbName: 'services_db' })
    .then(() => console.log('MongoDB connected'))
    .catch(err => { console.error(err); process.exit(1); });
