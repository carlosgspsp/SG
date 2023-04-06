import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Carta extends THREE.Object3D {
  constructor(imagen, numero, oculta = false) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI(gui,titleGui);


    this.numeroCarta = numero;
    this.cartaDebajo = null;
    this.cartaEncima = null;
    this.cartaOculta = oculta;
    this.cartaBloqueada = false;

    var texturaDetras = new THREE.TextureLoader().load('../imgs/poker-card-back.jpg');
    var texturaDelante = new THREE.TextureLoader().load(imagen);
    //var material = new THREE.MeshPhongMaterial ({map: texture});
    var material = new THREE.MeshPhongMaterial({ color: "red" });


    var materiales = [new THREE.MeshPhongMaterial({ color: "white" }),
    new THREE.MeshPhongMaterial({ color: "white" }),
    new THREE.MeshPhongMaterial({ map: texturaDetras }),
    new THREE.MeshPhongMaterial({ map: texturaDelante }),
    new THREE.MeshPhongMaterial({ color: "white" }),
    new THREE.MeshPhongMaterial({ color: "white" })];

    //var material = new THREE.MeshNormalMaterial();
    material.flatShading = true;
    //var geometriaCaja = new THREE.BoxBufferGeometry (9,0.1,13);
    //var geometriaEsfera = new THREE.SphereGeometry( 7.5, 32, 16 );

    //var cajaMesh = new THREE.Mesh (geometriaCaja, materiales);
    //var esferaMesh = new THREE.Mesh (geometriaEsfera, materiales);

    //cartaCSG.union([cajaMesh]);
    //cartaCSG.intersect([esferaMesh]);

    //this.carta = cartaCSG.toMesh();

    var geometriaCaja = new THREE.BoxBufferGeometry(9, 0.01, 13);
    this.modeloCarta = new THREE.Mesh(geometriaCaja, materiales);
    this.modeloCarta.userData = this;
    // Y añadirlo como hijo del Object3D (el this)
    if (!oculta)
      this.modeloCarta.rotation.x = Math.PI;
      this.modeloCarta.receiveShadow = true;
      this.modeloCarta.castShadow = true;
      
    //this.carta.rotation.z = Math.PI/2;
    //this.carta.rotation.y = Math.PI/2;
    this.add(this.modeloCarta);

    this.axis = new THREE.AxesHelper(5);
    this.add(this.axis);
    this.setAxisVisible(false);
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    //box.position.y = 0.5;
    this.position.y = 1;
  }



  update() {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    //.guiControls.rotX += 0.01;
    //this.guiControls.rotZ += 0.01;
    //this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    //this.carta.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    
    //this.carta.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);

    if (this.cartaEncima == null && this.cartaOculta) {
      this.girarCarta();
      this.cartaOculta = false;
    }

   /* if (this.escaleraCompleta()) {
      console.log("noseee");
    }*/

  }

 /* escaleraCompleta() {

    var escalera = false;
    if (this.cartaDebajo != null && this.numeroCarta == 1) {
      var cartadebajo = this.cartaDebajo;
      escalera = true;
      for (var i = 0; i < 13 && this.cartadebajo != null; i++) {
        if (cartadebajo.numeroCarta != i + 1 || cartadebajo.cartaOculta) {
          escalera = false;
        }
        cartadebajo = cartadebajo.cartaDebajo;
      }
    }

    return escalera;

  }*/

  girarCarta() {


    this.modeloCarta.rotation.x = Math.PI;


  }


  setAxisVisible(valor) {
    this.axis.visible = valor;
  }

}

export { Carta };
