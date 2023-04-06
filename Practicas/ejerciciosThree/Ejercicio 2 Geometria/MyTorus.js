import * as THREE from '../libs/three.module.js'

class MyTorus extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // Un Mesh se compone de geometría y material
      var torusGeom = new THREE.TorusGeometry(1.0, 0.4, 8, 3);
      // Como material se crea uno a partir de un color
     // var torusMat = new THREE.MeshPhongMaterial({color: 0x00f828});
     //var torusMat = new THREE.MeshPhongMaterial();
     var torusMat = new THREE.MeshNormalMaterial();
     torusMat.flatShading = true;
     torusMat.needsUpdate = true;
      
      // Ya podemos construir el Mesh
      this.torus = new THREE.Mesh (torusGeom, torusMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.torus);

      this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);
    this.setAxisVisible (false);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      //this.position.y = 5;

    
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = {
        
        radius : 2.0,
        axisOnOff : false,
        tube : 0.5,
       
        
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
     
      this.guiControls.rotX += 0.02;
      this.guiControls.rotY += 0.01;
      this.guiControls.rotZ += 0.03;

      this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
      this.torus.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
      //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
      
      this.torus.scale.set (this.guiControls.radius,this.guiControls.radius,this.guiControls.radius);

    }

    setAxisVisible (valor) {
        this.axis.visible = valor;
      }
  }
  
  export { MyTorus };