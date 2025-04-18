const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app.js');
const mongoose = require('mongoose');

let isConnected;


const connectToDB = async () => {
    if (isConnected) return;
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        isConnected = db.connections[0].readyState;
        console.log('MongoDB conectado desde Lambda');
    } catch (err) {
        console.error('Error al conectar a MongoDB desde Lambda:', err);
    }
};

const handler = async (event, context) => {
    await connectToDB();
    return serverlessExpress({ app })(event, context);
}


exports.handler = handler;