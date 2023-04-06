import * as THREE from '../libs/three.module.js'

//Hay que añadir este import
import {CSG} from '../libs/CSG-v2.js'
//Import para usar tween
import * as TWEEN from '../libs/tween.esm.js'

import { Alfil } from './Alfil.js'

class Examen extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.alfil = new Alfil(gui, "Controles:");
    this.add(this.alfil);


    //Spline que define el recorrido
    this.spline =new THREE.CatmullRomCurve3([new THREE.Vector3(0,0.5,0), new THREE.Vector3(0,10,0)],false);



    var inicio4 = {t:1};
    var fin4 = {t:0.5};
    var movimiento4 = new TWEEN.Tween(inicio4)
      .to(fin4,1500)  //1.5 seg
      .easing(TWEEN.Easing.Linear.None);

    //Qué hacer con esos parámetros
    movimiento4.onUpdate(()=>{
      //Se coloca y orienta el objeto a animar
      this.alfil.scale.y=inicio4.t;
    });

    movimiento4.onComplete(() => setTimeout(()=> movimiento.start(),0));

    //Definición de la animación para caer: Variables origen, destino y tiempo
    var inicio3 = {t:0};
    var fin3 = {t:1};
    var movimiento3 = new TWEEN.Tween(inicio3)
      .to(fin3,2000)  //10 seg
      .easing(TWEEN.Easing.Quadratic.In);

    //Qué hacer con esos parámetros
    movimiento3.onUpdate(()=>{
      //Se coloca y orienta el objeto a animar
      var posicion = this.spline.getPointAt((1-inicio3.t));
      this.alfil.position.copy(posicion);
    }) ;
    movimiento3.onComplete(() => setTimeout(()=> movimiento4.start(),0));


    //Definición de la animación para saltar: Variables origen, destino y tiempo
    var inicio2 = {t:0};
    var fin2 = {t:1};
    var movimiento2 = new TWEEN.Tween(inicio2)
      .to(fin2,2000)  //10 seg
      .easing(TWEEN.Easing.Quadratic.Out);

    //Qué hacer con esos parámetros
    movimiento2.onUpdate(()=>{
      //Se coloca y orienta el objeto a animar
      var posicion = this.spline.getPointAt(inicio2.t);
      this.alfil.position.copy(posicion);
    }) ;
    movimiento2.onComplete(() => setTimeout(()=> movimiento3.start(),0));


    var inicio = {t:0.5};
    var fin = {t:1};
    var movimiento = new TWEEN.Tween(inicio)
      .to(fin,1500)  //1.5 seg
      .easing(TWEEN.Easing.Quadratic.In)
      .chain(movimiento2);

    //Qué hacer con esos parámetros
    movimiento.onUpdate(()=>{
      //Se coloca y orienta el objeto a animar
      this.alfil.scale.y=inicio.t;
    });


    //La animación comienza cuando se le indique
    movimiento.start();


  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
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


    //Hay que actualizar los movimientos Tween
    TWEEN.update();
  }
}

export { Examen };
