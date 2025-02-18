import express from 'express';
import router from './router';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import { db } from './config/db';
import colors from 'colors';
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'

export async function connectDB(){
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.blue.bold("Conexión exitosa a la db"));
        
    } catch (error) {
        // console.log(error);
        console.log(colors.red.bold("Hubo un error al intentar conectar a la db"));
        
    }
}

connectDB();

//Instancia de Express
const server = express();

//Permitiendo dominios específicos
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://otro-dominio.com',
    'https://dominio-adicional.com'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            console.log('Permitir...')
            callback(null, true);
        } else {
            // Denegar acceso si el origen no está en la lista
            callback(new Error('Error de CORS: Dominio no autorizado'));
        }
    }
};

server.use(cors(corsOptions));

//Permite la lectura de datos tipo json en la consola
server.use(express.json());

server.use(morgan('dev'))

server.use('/api/products',router)

server.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerUiOptions))

export default server;