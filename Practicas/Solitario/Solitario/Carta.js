import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'

class Carta extends THREE.Object3D {
  constructor(imagen, numero, oculta = false) {
    super();

    this.numeroCarta = numero;
    this.cartaDebajo = null;
    this.cartaEncima = null;
    this.cartaOculta = oculta;
    this.cartaBloqueada = false;
    this.desfaseEjeZ = 3.5;
    this.desfaseEjeY = 0.1;

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


    material.flatShading = true;
 

    var geometriaCaja = new THREE.BoxBufferGeometry(9, 0.01, 13);
    
    this.modeloCarta = new THREE.Mesh(geometriaCaja, materiales);
    this.modeloCarta.userData = this;
    
    if (!oculta) {
      this.modeloCarta.rotation.x = Math.PI;
    
    }
    this.modeloCarta.receiveShadow = true;
    this.modeloCarta.castShadow = true;

  
    this.add(this.modeloCarta);

    this.axis = new THREE.AxesHelper(5);
    this.add(this.axis);
    this.setAxisVisible(false);
   
    this.position.y = 1;

    this.crearLuces();
  }

  animacionMoverse(posicionNueva, velocidad) {


    var spline = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(this.modeloCarta.position.x, this.modeloCarta.position.y + 2, this.modeloCarta.position.z),
        new THREE.Vector3(posicionNueva.x, posicionNueva.y, posicionNueva.z),
        

      ], false
    );


    var origen = { p: 0 };
    var destino = { p: 1 };


    var animacion = new TWEEN.Tween(origen)
      .to(destino, velocidad) 
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        var pos = spline.getPointAt(origen.p);
        this.modeloCarta.position.copy(pos);




      })
      .repeat(0) 
      .yoyo(false); 

    animacion.start();
  }

  crearLuces(){
    
    this.Light = new THREE.SpotLight( 0xefb810, 0.9 ,0, Math.PI/6);
    this.Light.position.set(0, -7, 0);



    this.Light.target = this.modeloCarta;
    this.Light.visible = false;
    this.modeloCarta.add(this.Light);
    
  }

  update() {

    TWEEN.update();

    if (this.cartaEncima == null && this.cartaOculta) {
      //console.log("entro al if este");
      this.girarCarta();
      this.cartaOculta = false;
    }

  }

  iluminarCartas(iluminar){

    this.Light.visible = iluminar;

    if (this.cartaEncima != null){
      this.cartaEncima.iluminarCartas(iluminar);
    }

  }

  MoverCarta(posicionNueva) {
    var posicionNuevaAjustada = new THREE.Vector3(posicionNueva.x, posicionNueva.y + this.desfaseEjeY, posicionNueva.z + this.desfaseEjeZ);


    this.modeloCarta.position.x = posicionNuevaAjustada.x;
    this.modeloCarta.position.y = posicionNuevaAjustada.y;
    this.modeloCarta.position.z = posicionNuevaAjustada.z;





    if (this.cartaEncima != null) {
      this.cartaEncima.MoverCarta(new THREE.Vector3(posicionNuevaAjustada.x, posicionNuevaAjustada.y, posicionNuevaAjustada.z));
    }


  }

  MoverCartaConAnimacion(posicionNueva, velocidad = 100) {
    var posicionNuevaAjustada = new THREE.Vector3(posicionNueva.x, posicionNueva.y + 0.1, posicionNueva.z + this.desfaseEjeZ);


    this.animacionMoverse(posicionNuevaAjustada, velocidad);
    if (this.cartaEncima != null) {
      this.cartaEncima.MoverCartaConAnimacion(new THREE.Vector3(posicionNuevaAjustada.x, posicionNuevaAjustada.y, posicionNuevaAjustada.z), velocidad);
    }


  }

  girarCarta() {

    var spline = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(this.modeloCarta.position.x, 0, this.modeloCarta.position.z),
        new THREE.Vector3(this.modeloCarta.position.x, 5, this.modeloCarta.position.z),

      ], false
    );

    var origen1 = { p: 0 };
    var destino1 = { p: 1 };


    var origen2 = this.modeloCarta.rotation;
    var destino2 = { x: (Math.PI) };

    var origen3 = { p: 1 };
    var destino3 = { p: 0.1 };


    var animacion1 = new TWEEN.Tween(origen1)
      .to(destino1, 300) 
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        var pos = spline.getPointAt(origen1.p);
        this.modeloCarta.position.copy(pos);

      })
      .repeat(0) 
      .yoyo(false); 


    var animacion2 = new TWEEN.Tween(origen2)
      .to(destino2, 300) 
      .easing(TWEEN.Easing.Quadratic.InOut)
      .repeat(0) 
      .yoyo(false); 


    var animacion3 = new TWEEN.Tween(origen3)
      .to(destino3, 300) 
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(() => {
        var pos = spline.getPointAt(origen3.p);
        this.modeloCarta.position.copy(pos);
      })
      .repeat(0) 
      .yoyo(false); 

    animacion1.chain(animacion2);
    animacion2.chain(animacion3);
    animacion1.start();



  }

  bloquearCartas() {
    var cartaAux = this;


    if (cartaAux.cartaDebajo != null && (cartaAux.numeroCarta != (cartaAux.cartaDebajo.numeroCarta - 1)) && !cartaAux.cartaOculta) {


      while (cartaAux.cartaDebajo != null) {
        cartaAux = cartaAux.cartaDebajo;
        cartaAux.cartaBloqueada = true;
      }
    }

  }

  desbloquearCartas() {
    var cartaAux = this;
    
    while ((cartaAux.cartaDebajo != null) && (cartaAux.numeroCarta == (cartaAux.cartaDebajo.numeroCarta - 1)) && !cartaAux.cartaDebajo.cartaOculta) {
      
      cartaAux.cartaBloqueada = false;
      cartaAux = cartaAux.cartaDebajo;
    }
    
    cartaAux.cartaBloqueada = false;
    
  }


  setAxisVisible(valor) {
    this.axis.visible = valor;
  }

}

export { Carta };
