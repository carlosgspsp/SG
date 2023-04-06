import * as THREE from '../libs/three.module.js'

class Peon extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      this.points = [];
      this.points.push(new THREE.Vector2( 0.0,0.0));
      this.points.push(new THREE.Vector2( -3.5,0.0));
      this.points.push(new THREE.Vector2( -3.5,1.5));
      this.points.push(new THREE.Vector2( -1.75,3.0));
      this.points.push(new THREE.Vector2( -1.0,4.5));
      this.points.push(new THREE.Vector2( -0.9,7.5));
      this.points.push(new THREE.Vector2( -1.45,8.25));
      this.points.push(new THREE.Vector2( -2.0,9.0));
      this.points.push(new THREE.Vector2( -1.45,9.75));
      this.points.push(new THREE.Vector2( -0.75,10.5));
      this.points.push(new THREE.Vector2( 0.0,10.5));

      /*
      for ( let i = 0; i < 10; i ++ ) {
        points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
      }
      */
      const geometry = new THREE.LatheGeometry( this.points , 15 , 0, Math.PI*2 );

      var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
      var material = new THREE.MeshPhongMaterial ({map: texture});
      //const material = new THREE.MeshBasicMaterial( { color: 0x6F4C01 } );
      material.side = THREE.DoubleSide;
      this.peon = new THREE.Mesh( geometry, material );
      this.add( this.peon );
      
      
      // Para crear una línea visible,Buffe como en el vídeo
      var lineGeometry = new THREE.BufferGeometry();
      var materialLinea = new THREE.MeshBasicMaterial( { color: 0x6F4C01 } );
      lineGeometry.setFromPoints (this.points);
      this.line = new THREE.Line (lineGeometry, materialLinea);
      this.add( this.line );
     
      this.line.position.x = -10.0;

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
      this.peon.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
      
      //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
      
      //this.peon.scale.set (this.guiControls.radius,this.guiControls.radius,this.guiControls.radius);

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
  
  export { Peon };