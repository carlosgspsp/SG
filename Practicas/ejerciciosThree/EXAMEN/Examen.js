import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import {CSG} from '../libs/CSG-v2.js'

class Examen extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      //this.createGUI(gui,titleGui);

      this.reloj = new THREE.Clock();
      this.materialVerde = new THREE.MeshPhongMaterial({color: 0x0DF311});
      this.materialRojo = new THREE.MeshPhongMaterial({color: 0xF30D0D});
      this.materialNormal = new THREE.MeshNormalMaterial();
     

      var cascosCSG = new CSG();

    var geometriaCilindroBase = new THREE.CylinderGeometry( 2, 2, 20, 32 );
    var geometriaEsferaDetras = new THREE.SphereGeometry( 5, 32, 16 );
    var geometriaCilindroGrande = new THREE.CylinderGeometry( 3, 4.32, 10, 32 );
    var geometriaCilindroCortar = new THREE.CylinderGeometry( 2, 2, 10, 32 );
    var geometriaCajaCortar = new THREE.BoxGeometry( 10, 20, 10);
    
    geometriaEsferaDetras.translate(0,20,0);
    geometriaEsferaDetras.scale(1,1.5,1);
    var esferaDetrasMesh = new THREE.Mesh( geometriaEsferaDetras, this.materialNormal );

    geometriaCajaCortar.translate(-2.5,30,0);
    var cajaCortarMesh = new THREE.Mesh( geometriaCajaCortar, this.materialNormal );
      
    cascosCSG.union([esferaDetrasMesh]);
      cascosCSG.subtract([cajaCortarMesh]);

      geometriaCilindroGrande.scale(1.5,1,1);
      geometriaCilindroGrande.rotateZ(Math.PI/2);
      geometriaCilindroGrande.translate(-2.5,30,0);
     var cilindroGrandeMesh = new THREE.Mesh( geometriaCilindroGrande, this.materialNormal );
     cascosCSG.union([cilindroGrandeMesh]);

     geometriaCilindroCortar.scale(1.5,1,1);
      geometriaCilindroCortar.rotateZ(Math.PI/2);
      geometriaCilindroCortar.translate(-12,30,0);
     var cilindroCortarMesh = new THREE.Mesh( geometriaCilindroCortar, this.materialNormal );
     cascosCSG.subtract([cilindroCortarMesh]);

      geometriaCilindroBase.translate(0,18,1.8)
     var cilindroBaseMesh = new THREE.Mesh( geometriaCilindroBase, this.materialNormal );
     cascosCSG.union([cilindroBaseMesh]);


      this.cascos = cascosCSG.toMesh();
      
    this.add(this.cascos);


      // Para crear una línea visible,Buffe como en el vídeo
      

      this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);
    this.setAxisVisible (false);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      //this.position.y = 5;

      this.spline = new THREE.CatmullRomCurve3 (
        [
          new THREE.Vector3(0,0,0),
          new THREE.Vector3(10,5,0),
          new THREE.Vector3(20,10,0),
          new THREE.Vector3(30,15,0),
          new THREE.Vector3(40,20,0),
          new THREE.Vector3(50,25,0),
          new THREE.Vector3(60,30,0),
          new THREE.Vector3(65,45,0),
          new THREE.Vector3(60,50,0),
          new THREE.Vector3(0,25,0),
          new THREE.Vector3(-60,50,0),
          new THREE.Vector3(-65,45,0),
          new THREE.Vector3(-60,30,0),
          new THREE.Vector3(-50,25,0),
          new THREE.Vector3(-40,20,0),
          new THREE.Vector3(-30,15,0),
          new THREE.Vector3(-20,10,0),
          new THREE.Vector3(-10,5,0),
          new THREE.Vector3(0,0,0),
        ], true
      );
  
        var linea = new THREE.BufferGeometry();
        linea.setFromPoints(this.spline.getPoints(1000));
  
        var lineaMesh = new THREE.Line(linea, this.materialNormal);
  
      this.add(lineaMesh);
      
  

       //Creamos la animacion
     var origen = {p : 0};
     var destino = {p : 1.0};

    

     var animacion1 = new TWEEN.Tween(origen)
      .to(destino, 10000) //tiempo que tarda la animacion en hacerse en ms
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(() => {
        var pos = this.spline.getPointAt(origen.p);
        
        //this.cascos.rotation.z = -Math.PI/2;
        this.cascos.position.copy(pos);
        var tangente = this.spline.getTangentAt(origen.p);  
        pos.add(tangente);
        //this.cascos.lookAt(pos);
      })
      .repeat(Infinity) //veces que se repite, se hace 1 vez mas el numeo de repeticinoes
      .yoyo(false); //La animacion vuelve desde el punto final al punto de inicio si está a true (Cuenta como una repeticion)
    
      
      
  
      animacion1.start();
   

    
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = {
        
  
        axisOnOff : false,
        resolucion : 15,
        angulo : Math.PI*2,
       
        
        rotX : 0.0,
        rotY : 0.0,
        rotZ : 0.0,
        

        posX : 0.0,
        posY : 0.0,
        posZ : 0.0,
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        reset : () => {
          
          /*
          this.guiControls.rotX = 0.0;
          this.guiControls.rotY = 0.0;
          this.guiControls.rotZ = 0.0;
          */

          this.guiControls.posX = 0.0;
          this.guiControls.posY = 0.0;
          this.guiControls.posZ = 0.0;
        }
      } 
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
     
      
      /*
      folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
      folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
      folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();
      */

      folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
      folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
      folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();
      
      folder.add (this.guiControls, 'resolucion', 3, 15, 1)
      .name ('Resolucion : ')
      .onChange ( (value) => this.UpdateResolucion (value) );

      folder.add (this.guiControls, 'angulo', 0.0, Math.PI*2 , 0.1 )
      .name ('Angulo : ')
      .onChange ( (value) => this.UpdateAngulo (value) );

      folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );


      folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación

      var segundos = this.reloj.getDelta();
    
    
      this.cascos.rotation.y+=2*segundos;
      TWEEN.update();
    }

    setAxisVisible (valor) {
        this.axis.visible = valor;
      }

    UpdateResolucion (valor) {
        this.peon.geometry.dispose();
        this.peon.geometry = new THREE.LatheGeometry( this.points , valor , 0, this.guiControls.angulo);
    }  

    UpdateAngulo (valor) {
      this.peon.geometry.dispose();
      this.peon.geometry = new THREE.LatheGeometry( this.points, this.guiControls.resolucion, 0, valor );
  }
  }
  
  export { Examen };