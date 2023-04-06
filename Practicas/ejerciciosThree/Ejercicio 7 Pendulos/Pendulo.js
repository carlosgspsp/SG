
import * as THREE from '../libs/three.module.js'

class Pendulo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.materialVerde = new THREE.MeshPhongMaterial({color: 0x0DF311});
    this.materialRojo = new THREE.MeshPhongMaterial({color: 0xF30D0D});
    this.materialAzul = new THREE.MeshPhongMaterial({color: 0x114AF0});
    this.materialGris = new THREE.MeshPhongMaterial({color: 0x5F5F5F});
    
    // A la base no se accede desde ningún método. Se almacena en una variable local del constructor.
    this.base = this.createPenduloBase();
    // Al nodo que contiene la transformación interactiva que abre y cierra la grapadora se accede desde el método update, se almacena en un atributo.
   this.position.set(0,0,0);
    
    // Al nodo  this, la grapadora, se le cuelgan como hijos la base y la parte móvil
    this.add (this.base);
  }
  
  createPenduloBase() {
    // El nodo del que van a colgar la caja y los 2 conos y que se va a devolver
    var base = new THREE.Object3D();
    // Cada figura, un Mesh, está compuesto de una geometría y un material
    var cajaRoja = this.createCajaRoja();
    cajaRoja.position.y = -3.25;
  
    // La componente geometría se puede compartir entre varios meshes

    var cajaVerdeArriba = new THREE.Mesh (new THREE.BoxGeometry (2,3,2), this.materialVerde);
    var geometriaTornillo = new THREE.CylinderGeometry( 0.5, 0.5, 0.2, 32 );
    var tornillo1 = new THREE.Mesh (geometriaTornillo, this.materialGris);
    var tornillo2 = new THREE.Mesh (geometriaTornillo, this.materialGris);
  
    // Se posicionan los pivotes con respecto a la base
    cajaVerdeArriba.position.set (0, 0 , 0);
    tornillo1.rotation.x = Math.PI/2;
    tornillo1.position.set (0, 0 , 1.1);

    tornillo2.rotation.x = Math.PI/2;
    tornillo2.position.set (0, 0 , -1.1);

    base.add(cajaRoja);
    base.add(cajaVerdeArriba);
    base.add(tornillo1);
    base.add(tornillo2);
    
    return base;
  }

  createCajaRoja () {
    // Se crea la parte móvil
    var base = new THREE.Object3D();
    base.name = "cajaRoja";

    var cajaRoja= new THREE.Mesh (new THREE.BoxGeometry (2, 3.5, 2), this.materialRojo);
    cajaRoja.position.y = 0;

    var tornillo = new THREE.Mesh (new THREE.CylinderGeometry( 0.3, 0.3, 0.4, 32 ), this.materialGris);
    // IMPORTANTE: Con independencia del orden en el que se escriban las 2 líneas siguientes, SIEMPRE se aplica primero la rotación y después la traslación. Prueba a intercambiar las dos líneas siguientes y verás que no se produce ningún cambio al ejecutar.    
    tornillo.rotation.x = Math.PI/2;
    tornillo.position.set (0, 1 , 1.1);
    

    var geometriaPendulo = new THREE.BoxGeometry( 1, 1, 0.2 );
    geometriaPendulo.translate (0,-0.5,0);
    var penduloAzul = new THREE.Mesh ( geometriaPendulo , this.materialAzul);
    penduloAzul.position.set (0, 1.5 , 1.1);
    penduloAzul.scale.set(1,2 ,1);

    



    var cajaVerde = new THREE.Mesh ( new THREE.BoxGeometry (2,3,2), this.materialVerde);
    cajaVerde.position.set (0,-3.25,0);

    
    base.position.set(0,0,0);

    base.add(cajaRoja);
    base.add(tornillo);
    base.add(penduloAzul);
    base.add(cajaVerde);


    return base;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = {
      longitudPG : 3.5,
      giro : 0,
      longitudPP : 5,
      posicion : 0.25
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Primer Pendulo");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento

    folder.add (this.guiControls, 'longitudPG', 3.5, 10, 0.1)
    .name ('Longitud : ')
    .onChange ( (valor) => this.  UpdateLongitudPenduloGrande (valor) );


    folder.add (this.guiControls, 'giro', -(Math.PI/3), Math.PI/3, 0.01)
      .name ('Giro : ')
      .onChange ( (valor) => this.rotation.set(this.rotation.x,this.rotation.y,valor) );
    
   

    var folder2 = gui.addFolder ("Segundo Pendulo");


     
    folder2.add (this.guiControls, 'longitudPP', 1, 10, 0.1)
      .name ('Longitud : ')
      .onChange ( (valor) => this.UpdateLongitudPenduloPequenio (valor) );


       
    folder2.add (this.guiControls, 'posicion', 0.2, 0.9, 0.01)
    .name ('Posicion (%) : ')
    .onChange ( (valor) => this. PosicionPenduloPP(valor) );


    folder2.add (this.guiControls, 'giro', -(Math.PI/3), Math.PI/3, 0.01)
      .name ('Giro : ')
      .onChange ( (valor) =>this.base.getObjectByName("cajaRoja").children[2].rotation.set(this.rotation.x,this.rotation.y,valor) );

      
   

      
  }
  
  PosicionPenduloPP(valor) {
    var tornillo = this.base.getObjectByName("cajaRoja").children[1];
    var penduloAzul = this.base.getObjectByName("cajaRoja").children[2];

    var nuevaPosicionTornillo = 2- this.guiControls.posicion * this.guiControls.longitudPG;
    var nuevaPosicionPendulo = 2.5-this.guiControls.posicion * this.guiControls.longitudPG;

    penduloAzul.position.set (penduloAzul.position.x, nuevaPosicionPendulo,penduloAzul.position.z);
    tornillo.position.set (tornillo.position.x,nuevaPosicionTornillo ,tornillo.position.z);


  }
  
  UpdateLongitudPenduloGrande (valor) {
    
    
    var cajaRoja = this.base.getObjectByName("cajaRoja").children[0];
    var tornillo = this.base.getObjectByName("cajaRoja").children[1];
    var penduloAzul = this.base.getObjectByName("cajaRoja").children[2];
    var cajaVerde = this.base.getObjectByName("cajaRoja").children[3];

    cajaRoja.geometry.dispose();
    cajaRoja.geometry = new THREE.BoxGeometry (2, valor, 2);


    var nuevaPosicionPendulo = 2-this.guiControls.posicion * this.guiControls.longitudPG;
    var nuevaPosicionTornillo = 2- this.guiControls.posicion * this.guiControls.longitudPG;

    cajaRoja.position.set (cajaRoja.position.x,1.75+(-(valor-(valor/2))),cajaRoja.position.z);
    cajaVerde.position.set (cajaVerde.position.x,0.25+(-(valor)),cajaVerde.position.z);
    
    penduloAzul.position.set (penduloAzul.position.x,nuevaPosicionPendulo,penduloAzul.position.z);
    tornillo.position.set (tornillo.position.x,nuevaPosicionTornillo,tornillo.position.z);

 
    
   
}  

UpdateLongitudPenduloPequenio (valor) {
    
    
  
  var tornillo = this.base.getObjectByName("cajaRoja").children[1];
  var penduloAzul = this.base.getObjectByName("cajaRoja").children[2];
  
/*
  penduloAzul.geometry.dispose();
  penduloAzul.geometry = new THREE.BoxGeometry (1, valor, 0.2);
  penduloAzul.geometry.translate (0,-2.5,0);
  
*/
  penduloAzul.scale.set(1,valor,1);

  
  //penduloAzul.position.set (penduloAzul.position.x,3.5-((valor-(valor/2))),penduloAzul.position.z);


  
 
}  
  
  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { Pendulo }
