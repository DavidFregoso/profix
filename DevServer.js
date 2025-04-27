const app = require('./app')
const mongoose = require('mongoose');

const PORT = 3000;
const JWT_SECRET = 'hola' // Change this for env variable in lambda

mongoose.connect("mongodb+srv://alfredo:alfredo@sistemasescalables.s5sqk.mongodb.net/test-alfredo2?retryWrites=true&w=majority&appName=SistemasEscalables")
    .then(() => {
        console.log("Conecatdo a mongodb");
        app.listen(PORT, () => {
            console.log(`Servidor local en http://localhost:${PORT}`)
        });
    })
    .catch (err => {
        console.error('Error conenctado en desarrollo', err)
    });


module.exports = { JWT_SECRET }
