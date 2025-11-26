//Configuracion de la conexion con SupabaseJS

//Importacion de dependencias
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
//Configuracion de dotenv
config();

//Declaracion de variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

//Declaramos y exportamos la conexion de supabase
export const supabase = await createClient( supabaseUrl, supabaseKey );