import * as THREE from '../libs/three.module.js'

//Hay que añadir este import
import {CSG} from '../libs/CSG-v2.js'


class Alfil extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    //Cilindro para la base
    var cylGeom = new THREE.CylinderGeometry (3,3,1,30);
    var cylText = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var cylMat = new THREE.MeshPhongMaterial ({map: cylText});

    // Ya podemos construir el Mesh
    var cyl = new THREE.Mesh (cylGeom, cylMat);


    //Toro para la base
    var torGeom = new THREE.TorusGeometry (2,0.5,20,20);
    // Como material se crea uno a partir de un color
    var torMat = new THREE.MeshNormalMaterial();
    torMat.flatShading=true;
    torMat.needsUpdate=true;
    // Ya podemos construir el Mesh
    var tor = new THREE.Mesh (torGeom, torMat);
    tor.rotateX(Math.PI/2);
    //tor.scale.y = 0.5;
    tor.position.y+=0.5;


    //Generamos el cuerpo por revolución
    var lineMat = new THREE.MeshPhongMaterial ({map: cylText});
    lineMat.flatShading=true;
    lineMat.needsUpdate=true;
    var shape =new THREE.Shape();
    shape.moveTo(2, 0.7, 0);
    shape.lineTo(2, 1.5, 0);
    shape.quadraticCurveTo(0.6 ,4, 0.6, 6);
    shape.moveTo(1, 6.2, 0);
    shape.quadraticCurveTo(0.8 ,7.3, 0.2, 8);
    this.points = shape.extractPoints(6).shape;
    // Para crear la figura por revolución
    var cuerpoGeometry = new THREE.LatheGeometry (this.points, 50, 0,2* Math.PI)
    var cuerpo = new THREE.Mesh (cuerpoGeometry, lineMat);


    //Toro para la cabeza
    var torCabGeom = new THREE.TorusGeometry (0.8,0.3,20,20);
    // Ya podemos construir el Mesh
    var torCab = new THREE.Mesh (torCabGeom, torMat);
    torCab.rotateX(Math.PI/2);
    //tor.scale.y = 0.5;
    torCab.position.y+=6;

    //Cubo para el hueco
    var boxGeom = new THREE.BoxBufferGeometry (0.7,0.7,3);
    // Como material se crea uno a partir de un color
    var boxMat =new THREE.MeshPhongMaterial ({map: cylText});
    // Ya podemos construir el Mesh
    var box = new THREE.Mesh (boxGeom, boxMat);
    box.position.y = 7;
    box.position.x= 1;

    //Esfera para la punta
    var sphGeom = new THREE.SphereGeometry (0.3,20,20);
    // Como material se crea uno a partir de un color
    var sphMat = new THREE.MeshPhongMaterial ({map: cylText});
    // Ya podemos construir el Mesh
    var sph = new THREE.Mesh (sphGeom, sphMat);
    sph.position.y += 8;



    //Se crea el objeto CSG y se opera con él
    var csg =new CSG();
    csg.union([cyl, tor, cuerpo, torCab]); //CORCHETES  OBLIGATORIOS
    csg.union([sph]);
    csg.subtract([box]); //aunque solo haya 1 parámetro
    //Y finalmente
    this.alfil = csg.toMesh();
    this.add(this.alfil);

    this.position.y +=0.5;

  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      Velocidad : 1,
    }

    // Se crea una sección para los controles de la caja
    //var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    //folder.add (this.guiControls, 'Velocidad', -3.0, 3.0, 0.1).name ('Velocidad : ').listen().onChange((value) => this.velocidad=value);

  }


  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    //Se necesita un parametro entre 0 y 1
    //Representa la posicion en el spline
    //0 es el principio 1 es el final
    //var time = Date.now();
    //var looptime = 20000; //20 segundos
    //var t = (time%looptime)/looptime;

    //Se coloca y orienta el objeto a animar
    //var posicion = this.spline.getPointAt(t);
    //this.cone.position.copy(posicion);
    //var tangente = this.spline.getTangentAt(t);
    //posicion.add(tangente); //Se mira a un punto en esa dirección
    //this.cone.lookAt(posicion); //Lo que se alinea con la tangente es la Z positiva del objeto


  }
}

export { Alfil };
