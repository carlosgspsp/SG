
import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Plano extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.materialVerde = new THREE.MeshPhongMaterial({color: 0x0DF311});
    this.materialRojo = new THREE.MeshPhongMaterial({color: 0xF30D0D});
    this.materialNormal = new THREE.MeshNormalMaterial();

    const geometria = new THREE.CylinderGeometry( 0, 2, 2, 8 );

    geometria.rotateX(Math.PI/2);
    this.triangulo = new THREE.Mesh( geometria, this.materialRojo);
    this.triangulo.rotation.z = -Math.PI/4;

    this.spline = new THREE.CatmullRomCurve3 (
      [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(5,5,0),
        new THREE.Vector3(10,0,0),
        new THREE.Vector3(10,1,1),
        new THREE.Vector3(10,2,2),
        new THREE.Vector3(10,3,3),
        new THREE.Vector3(10,2,4),
        new THREE.Vector3(10,1,5),
        new THREE.Vector3(10,0,6),
        new THREE.Vector3(9,0,6),
        new THREE.Vector3(8,0,6),
        new THREE.Vector3(7,0,6),
        new THREE.Vector3(6,0,6),
        new THREE.Vector3(5,0,6),
        new THREE.Vector3(4,0,6),
        new THREE.Vector3(3,0,6),
        new THREE.Vector3(2,0,6),
        new THREE.Vector3(1,0,6),
        new THREE.Vector3(0,0,6),
      ], true
    );

      var linea = new THREE.BufferGeometry();
      linea.setFromPoints(this.spline.getPoints(100));

      var lineaMesh = new THREE.Line(linea, this.materialVerde);

    this.add(lineaMesh);
    this.add(this.triangulo);

      //Creamos la animacion
     var origen = {p : 0};
     var destino = {p : 0.5};

     var origen2 = {p : 0.5};
     var destino2 = {p : 1};

     var animacion1 = new TWEEN.Tween(origen)
      .to(destino, 4000) //tiempo que tarda la animacion en hacerse en ms
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        var pos = this.spline.getPointAt(origen.p);
        this.triangulo.position.copy(pos);
        var tangente = this.spline.getTangentAt(origen.p);  
        pos.add(tangente);
        this.triangulo.lookAt(pos); //La tangente y esto del lookat es para que mira el objeto hacia la direccion a la que va
      
      })
      .repeat(0) //veces que se repite, se hace 1 vez mas el numeo de repeticinoes
      .yoyo(false); //La animacion vuelve desde el punto final al punto de inicio si está a true
    
      var animacion2 = new TWEEN.Tween(origen2)
      .to(destino2, 4000) //tiempo que tarda la animacion en hacerse en ms
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        var pos = this.spline.getPointAt(origen2.p);
        this.triangulo.position.copy(pos);
        var tangente = this.spline.getTangentAt(origen2.p);  
        pos.add(tangente);
        this.triangulo.lookAt(pos); //La tangente y esto del lookat es para que mira el objeto hacia la direccion a la que va
      
      })
      .repeat() //veces que se repite, se hace 1 vez mas el numeo de repeticinoes
      .yoyo(false); //La animacion vuelve desde el punto final al punto de inicio si está a true
      

      animacion1.chain(animacion2);
      animacion2.chain(animacion1);
      animacion1.start();
   
    

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
    
 TWEEN.update();  

  }
}

export { Plano }
