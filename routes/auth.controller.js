//Router de usuarios

//Importacion de dependencias
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
//Configuracion de router
const router = express.Router();
//Importacion de la conexion con Supabase
import { supabase } from "../client.js";

//Declaracion de la clave de acceso
const validKey = process.env.API_KEY;
//Importamos la llave de JWT
const jwtSecret = process.env.JWT_SECRET;

//Ruta de login
router.post("/register", async(req, res) => {
	try {
		//Obtenemos los datos ingresados
		const { username, email, password, confirm } = req.body;
		//Obtenemos los headers de la api
		const key = req.headers.apikey;

		//Verificamos si se ingreso los datos o si las llave de acceso coinciden 
		if(key !== validKey ||
			!email || !password || !confirm) return res.status(502).json({ message: "Request invalida" });

		//Si las contraseñas no coinciden retornamos error
		if(password !== confirm) return res.status(401).json({ message: "Contraseñas incorrectas" });

		//Verificamos si existe el usuario
		const { data: exists } = await supabase
		//Seleccionamos la tabla
		.from("users")
		//Especificamos las filas
		.select('*')
		//Seleccionamos el email
		.eq('email', email);

		//Si existe retornamos error
		if(exists) return res.status(502).json({ message: "La cuenta ya existe" });

		//Seleccionamos el tipo de hash
		const salt = 10;
		//La hasheamos
		const hashed = await bcrypt.hash(password, salt);

		//Creamos el nuevo usuario
		const newUser = [{ username, email, hashed }];

		//Lo guardamos
		const { data, error } = await supabase
		//Seleccionamos la tabla
		.from("users")
		//Ejecutamos la funcion de insert
		.insert(newUser)
		//Seleccionamos el usuario
		.select()
		//Indicamos que solo es un usuario
		.single();

		//Si hay un error indicamos que ocurrio un error
		if(error) return res.status(500).json({ message: "Ha ocurrido un error al  registrarte", error: error.message });

		//Si todo funciona bien entonces guardamos el token
		const token = jwt.sign({ id: data.id }, jwtSecret, { expiresIn: '24h' });

		//Retornamos mensaje de exito y el usuario
		return res.status(200).json({ message: "Pagina registraba con exito", token, user: data });
	} catch(error) {
		//Si ocurre un error lo mostramos en consola y retornamos error
		console.error(error)
		return res.status(500).json({ message: "Hubo un error en el servidor" });
	}
});

//Ruta para loguearse
router.post("/login", async(req, res) => {
	try {
		//Obtenemos los datos ingresados
		const { email, password } = req.body;

		//Obtenemos los datos del usuario
		const { data, error } = await supabase
		//Seleccionamos la tabla
		.from("users")
		//Indicamos las filas
		.select('*')
		//Buscamos el usuario
		.eq('email', email)
		//Indicamos que solo es uno
		.single();

		//Si ocurre un error lo retornamos
		if(error) return res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });

		//Verificamos que las contraseñas coincidan
		const isMatch = await bcrypt.compare(password, data.password);
		//Si no coinciden retornamos error
		if(!isMatch) return res.status(401).json({ message: "Las contraseñas no coinciden" });

		//Guardamos el token
		const token = jwt.sign({ id: data.id }, jwtSecret, { expiresIn: '24h' });
		//Retornamos mensaje de exito
		return res.status(200).json({ message: "Inicio de sesion con exito", token });
	} catch(error) {
		//Si ocurre un error lo mostramos en consola y retornamos error
		console.error(error)
		return res.status(500).json({ message: "Hubo un error en el servidor" });
	}
});

//Exportacion de la ruta
export default router;