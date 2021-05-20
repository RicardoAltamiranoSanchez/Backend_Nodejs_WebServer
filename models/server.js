const express=require('express');
const cors=require('cors');
const {dbConnection}=require ("../database/config")

//estatus de error para regresar esos valores
//res.status(200).json({msg:"Mensaje",})

class Server{
    constructor(){
       this.app=express();
       this.PORT=process.env.PORT;
       //Creamos los paths en un objeto para no hacer lo tan tardo
       this.Paths={
        usuarios:'/Api/Usuarios',
        autenticacion:'/Api/authentication',
        categorias:'/Api/categorias'
       }
       //los path de forma de uno a uno
      // this.usuarioPath='/Api/Usuarios';    
      // this.tokenPath='/Api/authentication';
       
      this.Router();
       
       //Conectando ala base de datos en mongo
       this.ConexionDB();
    //no ponemos el lsten en el constructor
       this.Middlewares();
    }
    Router(){
      //Aqui usamos el middeware y el path que creamos para para no tener un codigo largo
      //utilizamos el modelo vista controlador
      //en require mandamos a llamar las rutas que vamos a ocupar 
      //solo debemos poner el path
      this.app.use( express.json());//importante poner este desde el inicio si no va aveer conflicto en rputr o middleware
      this.app.use(this.Paths.autenticacion,require('../Routers/auth'));
      this.app.use(this.Paths.usuarios,require('../Routers/usuarios'));
      this.app.use(this.Paths.categorias,require('../Routers/categorias')); 
      
    }
    async  ConexionDB(){
           await dbConnection();
    }
    
    Middlewares() {
    
        this.app.use(express.static('public'));
        //la serializamos en formatto json para poder trabajar en json        
        this.app.use(cors());
        
    }

    Listen(){

        this.app.listen(this.PORT,() => {
         console.log("ejecutando la aplicacion desde ek puerto",this.PORT);   
        })
    }

}


module.exports=Server;