
import * as THREE from '../libs/three.module.js'

class Reloj extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.materialVerde = new THREE.MeshPhongMaterial({color: 0x0DF311});
    this.materialRojo = new THREE.MeshPhongMaterial({color: 0xF30D0D});

    this.radioReloj = 60;
    var angulo = (2*Math.PI)/12;
    var geometriaBola = new THREE.SphereGeometry (5);
    this.reloj = new THREE.Clock();
    this.radioRelojRojo = this.radioReloj-20;
    var bolasverdes = new Array();




    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));
    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));
    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));
    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));
    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));
    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));
    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));
    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));
    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));
    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));
    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));
    bolasverdes.push(new THREE.Mesh (geometriaBola, this.materialVerde));


    var geometriaBolaRoja = new THREE.SphereGeometry (5);
    geometriaBolaRoja.translate (45,0,0);
    this.bolaroja= new THREE.Mesh (geometriaBolaRoja, this.materialRojo);
    this.bolaroja.position.set(0,5,0);
    

    for (let step = 0; step < bolasverdes.length; step++) {

      bolasverdes[step].position.set(Math.cos(angulo*step)*this.radioReloj, 0, Math.sin(angulo*step)*this.radioReloj);

    }


    for (let step = 0; step < bolasverdes.length; step++) {

      this.add(bolasverdes[step]);

    }

    
    this.add(this.bolaroja);

    // A la base no se accede desde ningún método. Se almacena en una variable local del constructor.

    // Al nodo que contiene la transformación interactiva que abre y cierra la grapadora se accede desde el método update, se almacena en un atributo.

    
    // Al nodo  this, la grapadora, se le cuelgan como hijos la base y la parte móvil

  }
  
  

  
  
  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = {
      velocidad : 1,
      
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento

    folder.add (this.guiControls, 'velocidad', 0, 10, 0.01).name ('Velocidad : ').listen();



  }
  
  
  update () {
    
    var segundos = this.reloj.getDelta();
    
    
    this.bolaroja.rotation.y+=(this.guiControls.velocidad*THREE.MathUtils.degToRad(30)*-1)*segundos;
    
    
  }
}

export { Reloj }
