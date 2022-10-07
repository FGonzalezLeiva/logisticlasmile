const express = require('express')
const cors = require('cors')
const tasks = require('./tasks')
const app = express()
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`estamos de pana aquí en el ${ PORT }`);
});

const bodyParser = require('body-parser')
//const ServerlessHttp = require('serverless-http')
app.use(bodyParser.json());
//cors
app.use(cors({
    origin: '*',
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS'],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  }));
//rutas
app.get('/',(req,res)=> res.json({answer:'Todo bien por ahora'}))
app.post('/task',tasks.movimiento)
