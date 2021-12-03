const express=require('express');
const cors=require('cors');
const fileUpload = require('express-fileupload');
//liberira d esprpess para la funcion de subir archivos en el progarama
//jdj
const {dbConnection}=require ('../database/config')



//estatus de error para regresar esos valores
//res.status(200).json({msg:"Mensaje",})

class Server{
    constructor(){
       this.app=express();
       this.PORT=process.env.PORT;
       //Creamos los paths en un objeto para no hacer lo tan tardo
       this.Paths={

           usuarios:'/Api/Usuarios',
           buscar:'/Api/buscar',
           autenticacion:'/Api/authentication',
           produ:'/Api/productos',
           categorias:'/Api/categorias',
           playlods:'/Api/uploads',
           playeras:'/Api/playeras',
       }
 this.ConexionDB();

       //Importante poner los middleware antes de lo routert por que no sale error en la validaciones de token 
        //Creo que no puede arrancar las configuraciones si ya arranco el servidor antes no no arranca con toda las actualizacaciones
          //no ponemos el lsten en el constructor
    this.Middlewares();      
 //los path de forma de uno a uno
      // this.usuarioPath='/Api/Usuarios';    
      // this.tokenPath='/Api/authentication';
      this.Router();
     //Conectando ala base de datos en mongo
    
  
    }
  
    async  ConexionDB(){
           await dbConnection();
    }
    
    Middlewares() {
  this.app.use(cors());

//Fehca 19 de agosto movi esto por que ccreo que encontre el error se debe cargar primero los middlewares y despues la base de datos
      this.app.use( express.json());//importante poner este desde el inicio si no va aveer conflicto en rputr o middleware
        


        this.app.use(express.static('public'));
       // la serializamos en formatto json para poder trabajar en json        
     
     //Esta funcion nos permite que solo se vea en frontend la informacion y se pueda manejar desde ahi la informacion vale   
    //    const whitelist =['http://localhost:3000'];
    //     const corsOptions ={
    //     origin:(origin,callback)=>{
    //        const existe=whitelist.some(dominio => dominio === origin);
    //        if(existe){

    //           callback(null,true);
    //        }else{
    //            callback(new Error('No permitido por cors'))

    //        }

    //     }

    //      }
    //     this.app.use(cors(corsOptions));
    // Note that this option available for versions 1.0.0 and newer. 
//this.app.use( fileUpload({ useTempFiles: true,createParentPath:true }) );

 // Fileupload - Carga de archivos
     
        

    }
  Router(){
      //Aqui usamos el middeware y el path que creamos para para no tener un codigo largo
      //utilizamos el modelo vista controlador
      //en require mandamos a llamar las rutas que vamos a ocupar 
      //solo debemos poner el path
     
   this.app.use( fileUpload({ useTempFiles: true,createParentPath:true }) );
      this.app.use(this.Paths.autenticacion,require('../Routers/auth'));
      this.app.use(this.Paths.buscar,require('../Routers/buscar'));
      this.app.use(this.Paths.usuarios,require('../Routers/usuarios'));
      this.app.use(this.Paths.categorias,require('../Routers/categorias')); 
      this.app.use(this.Paths.produ,require('../Routers/productos'));
      this.app.use(this.Paths.playlods,require('../Routers/uploads.js'));
      this.app.use(this.Paths.playeras,require('../Routers/playeras'));
    }
    Listen(){
         this.app.listen(this.PORT,() => {
         console.log("ejecutando la aplicacion desde ek puerto",this.PORT);   
                })
    }
}


module.exports=Server;
//importante esto los parse en json es importante  
// this.app.use( fileUpload({ useTempFiles: true }) ); Debemos iniciarlizado antes de json y de body parse para que no marque error
// this.app.use( express.json());//importante poner este desde el inicio si no va aveer conflicto en rputr o middleware se debe iniciar antes los path y debe ir adentro del router