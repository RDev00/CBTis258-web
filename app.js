//Dependencias
import express from "express";
import cors from "cors";
import { config } from "dotenv";
//Configuracion de doentv
config();

//Declaracion de valores
const app = express();
const port = process.env.PORT;

//Importacion de rutas
import auth from './routes/auth.controller.js';
//Rutas
app.use('/auth', auth);

//Configuracion de app
app.use(express.json());
app.use(cors);

//Respuesta de exito
app.listen(port, () => {
	console.log('Aplicacion lista, escuchando en: http://localhost:' + port);
});