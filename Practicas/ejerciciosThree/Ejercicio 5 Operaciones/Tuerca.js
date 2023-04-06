import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'



class Tuerca extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      

      /*
      for ( let i = 0; i < 10; i ++ ) {
        points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
      }
      */
    var material = new THREE.MeshNormalMaterial();  

    var cilindroExterior = new THREE.CylinderGeometry (5, 5, 4, 6);
    var cilindroInterior = new THREE.CylinderGeometry (3, 3, 4, 24);
    var esferaExterior = new THREE.SphereBufferGeometry (5);
    var muesca = new THREE.TorusGeometry(2.9, 0.15, 16, 100 );
    

    muesca.rotateX(Math.PI/2);
    

    
    muesca.translate(0,1.7,0);
    


    var cilindroInteriorMesh = new THREE.Mesh (cilindroInterior, material);
    var cilindroExteriorMesh = new THREE.Mesh (cilindroExterior, material);
    var muescaMesh = new THREE.Mesh (muesca, material);
    var esferaExteriorMesh = new THREE.Mesh (esferaExterior, material);

     var TuercaCSG = new CSG();

     TuercaCSG.union([cilindroExteriorMesh]);
     TuercaCSG.subtract([cilindroInteriorMesh]);
     TuercaCSG.intersect([esferaExteriorMesh]);


     TuercaCSG.subtract([muescaMesh]);

    
     muescaMesh.translateY(-0.3);
     TuercaCSG.subtract([muescaMesh]);
      

     /* //for para las muescas
     for (let step = 0; step < 8; step++) {

      muescaMesh.translateY(-0.3);
      TuercaCSG.subtract([muescaMesh]);
    }
    */
     var cajaMesh = new THREE.Mesh(new THREE.BoxGeometry(1.5,1.5,1.5), new THREE.MeshNormalMaterial());


     TuercaCSG.subtract([cajaMesh]);
     this.Tuerca = TuercaCSG.toMesh();


    

      //var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
      var material = new THREE.MeshPhongMaterial({color: 0xD31229});
      //const material = new THREE.MeshBasicMaterial( { color: 0x6F4C01 } );
      material.side = THREE.DoubleSide;

      

      this.add( this.Tuerca );
      
   

      this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);
    this.setAxisVisible (false);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      //this.position.y = 5;



    
    }

    rotateShape (aShape, angle, resolucion = 6) {
      var points = aShape.extractPoints (resolucion).shape;
      var center = points[0];
      points.forEach ((p) => {
        p.rotateAround (center,angle);
      });
      return new THREE.Shape (points);
    }

    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = {
        
        radius : 2.0,
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
     
      folder.add (this.guiControls, 'radius', 0.1, 5.0, 0.1).name ('Radio : ').listen();
      
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
     
      /*
      this.guiControls.rotX += 0.02;
      this.guiControls.rotY += 0.01;
      this.guiControls.rotZ += 0.03;
      */

      this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
      this.Tuerca.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
      
      //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
      
      //this.Tuerca.scale.set (this.guiControls.radius,this.guiControls.radius,this.guiControls.radius);

    }

    setAxisVisible (valor) {
        this.axis.visible = valor;
      }

    UpdateResolucion (valor) {
        this.Tuerca.geometry.dispose();
        this.Tuerca.geometry = new THREE.LatheGeometry( this.points , valor , 0, this.guiControls.angulo);
    }  

    UpdateAngulo (valor) {
      this.Tuerca.geometry.dispose();
      this.Tuerca.geometry = new THREE.LatheGeometry( this.points, this.guiControls.resolucion, 0, valor );
  }
  }
  
  export { Tuerca };