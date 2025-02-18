import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

//ssl=true sirve para que la conexión sea segura
export const db = new Sequelize(process.env.DATABASE_URL!,{
    models:[__dirname + '/../models/**/*.ts'],
    //logging:false permite que no se muestren los mensajes de SQL en la consola
    logging: false,
});