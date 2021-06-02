// variables
const contenido =document.querySelector('#contenido');
const boton=document.querySelector('#Cargar');
//Eventos

document.addEventListener('DOMContentLoaded',CargarConfiguracion);
boton.addEventListener('click',BD)
//funciones
function CargarConfiguracion(){



}
function BD(){
    const url='../public/vista.json';
    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(cliente), // data puede ser string o un objeto
        headers:{
          'Content-Type': 'application/json' // Y le decimos que los datos se enviaran como JSON
        }
    });
    

fetch(url)
.then(response => response.json())
.then(datos =>{
    mostrar(datos)



                }
    )
.catch(e => console.log(`Hubo un error ${e}`));
}

function mostrar(datos){
    
       const {vistaConfigurada}=datos;
       const {nombre,caption,descripcion}=vistaConfigurada;
    html=`<h1>Prueba</h1>
     <p>${nombre}</p>      
    <p>${caption}</p>
    <p>${descripcion}</p>
    <div id='creacion></div>
    <style>
    *{
        background-color:orange;
    }
    </style>`

    contenido.innerHTML=html;
    setTimeout(()=>{

    
    const formulario=`
    <form methods='post'>
    <input type='text' value='Escriba su nombre aqui'>
    <input type='text' value='Escriba su apelldo aqui'>
      <input type='button' value='boton'>
    </form>
    <
     `
     contenido.innerHTML=formulario;

    },10000);

  console.log(vistaConfigurada);



}


