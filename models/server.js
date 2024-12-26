const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');  // Importa cookie-parser
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();  
        this.port = process.env.PORT;
        this.usuariosPath       = '/api/usuarios';
        this.operacionesPath    = '/api/operaciones';
        this.authPath           = '/api/auth';

        //Conectar a BD
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Configuración de cookie-parser
        this.app.use(cookieParser());
        
        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.operacionesPath, require('../routes/operaciones'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
