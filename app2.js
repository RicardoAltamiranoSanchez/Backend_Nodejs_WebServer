require('dotenv').config();
const  Server  = require('./models/server');

//ENFORMA DE CLASE CREAMOS EN SERVIDOR CON SERVER.JS    
//middleware cors npm cors ir ala pagina
//que es el cors nos permite proteger nuestro nuestro servidor de manera superficial
//y es un middleware y se usa de la misma manera app.use (use)
const server = new Server();

server.Listen();


//instalar el express validator npm i express-validator para las validaciones 
//instalar el package.json con npm init -y

