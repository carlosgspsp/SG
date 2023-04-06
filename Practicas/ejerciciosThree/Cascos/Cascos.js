
import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import {CSG} from '../libs/CSG-v2.js'

class Cascos extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.materialVerde = new THREE.MeshPhongMaterial({color: 0x0DF311});
    this.materialRojo = new THREE.MeshPhongMaterial({color: 0xF30D0D});
    this.materialNormal = new THREE.MeshNormalMaterial();

    var cascosCSG = new CSG();

    var geometriaToroArriba = new THREE.TorusGeometry( 5.5, 0.25, 16, 32);
    var geometriaToroCascos = new THREE.TorusGeometry( 1, 0.25, 16, 16);
    var geometriaCajaArriba = new THREE.BoxGeometry( 15, 15, 15);
    var geometriaEsfera = new THREE.SphereGeometry( 1, 16, 16 );
    var geometriaCajaCascos = new THREE.BoxGeometry( 5, 5, 5);
    
    
    geometriaToroArriba.translate(0,1,0);
    var toroArribaMesh = new THREE.Mesh( geometriaToroArriba, this.materialNormal );
    cascosCSG.union([toroArribaMesh]);
    
    
    geometriaCajaArriba.translate(0,-7,0);
    var cajaArribaMesh = new THREE.Mesh( geometriaCajaArriba, this.materialNormal );
    cascosCSG.subtract([cajaArribaMesh]);

    
    geometriaEsfera.scale(1,1.5,1);
    geometriaEsfera.translate(-5,0,0);
    var esferaMesh = new THREE.Mesh( geometriaEsfera, this.materialNormal );
    cascosCSG.union([esferaMesh]);
    geometriaCajaCascos.translate(-2.5,0,0);
    var cajaCascosMesh = new THREE.Mesh( geometriaCajaCascos, this.materialNormal );
    cascosCSG.subtract([cajaCascosMesh]);
    
    
    geometriaEsfera.translate(10,0,0);
    geometriaCajaCascos.translate(5,0,0);
    esferaMesh = new THREE.Mesh( geometriaEsfera, this.materialNormal );
    cajaCascosMesh = new THREE.Mesh( geometriaCajaCascos, this.materialNormal );
    cascosCSG.union([esferaMesh]);
    cascosCSG.subtract([cajaCascosMesh]);
    
    
    geometriaToroCascos.scale(1,1.5,1);
    geometriaToroCascos.rotateY(Math.PI/2);
    geometriaToroCascos.translate(-5,0,0);
    var torocascoMesh = new THREE.Mesh( geometriaToroCascos, this.materialNormal );
    cascosCSG.union([torocascoMesh]);

    
    geometriaToroCascos.translate(10,0,0);
    var torocascoMesh = new THREE.Mesh( geometriaToroCascos, this.materialNormal );
    cascosCSG.union([torocascoMesh]);


    this.spline = new THREE.CatmullRomCurve3 (
      [
        new THREE.Vector3(1,1,0),
        new THREE.Vector3(2,2,0),
        new THREE.Vector3(3,3,0),
        new THREE.Vector3(4,4,0),
        new THREE.Vector3(5,5,0),
        new THREE.Vector3(6,6,0),
        new THREE.Vector3(7,7,0),
        new THREE.Vector3(8,8,0),
        new THREE.Vector3(9,9,0),
        new THREE.Vector3(10,10,0),
        new THREE.Vector3(11,9,0),
        new THREE.Vector3(12,8,0),
        new THREE.Vector3(13,7,0),
        new THREE.Vector3(14,6,0),
        new THREE.Vector3(15,5,0),
        new THREE.Vector3(16,4,0),
        new THREE.Vector3(17,3,0),
        new THREE.Vector3(18,2,0),
        new THREE.Vector3(19,1,0),
        new THREE.Vector3(20,0,0),
      ], false
    );

      var linea = new THREE.BufferGeometry();
      linea.setFromPoints(this.spline.getPoints(100));

      var lineaMesh = new THREE.Line(linea, this.materialVerde);

    this.add(lineaMesh);

    this.cascos = cascosCSG.toMesh();
    this.add(this.cascos);

    this.cascos.rotation.y = Math.PI/2;



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
        this.cascos.position.copy(pos);
        var tangente = this.spline.getTangentAt(origen.p);  
        pos.add(tangente);
        this.cascos.lookAt(pos); //La tangente y esto del lookat es para que mira el objeto hacia la direccion a la que va
      
      })
      .repeat(1) //veces que se repite, se hace 1 vez mas el numeo de repeticinoes
      .yoyo(true); //La animacion vuelve desde el punto final al punto de inicio si está a true
    
      /*
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
      
*/
      //animacion1.chain(animacion2);
      //animacion2.chain(animacion1);
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

export { Cascos }
