import * as THREE from '../libs/three.module.js'

class Corazon extends THREE.Object3D {
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
     var corazonShape = new THREE.Shape();
     corazonShape.moveTo(0.0,0.0);
     corazonShape.bezierCurveTo(1.0,1.0,2.0,3.0,1.3,3.5);
     corazonShape.bezierCurveTo(0.7,3.7,0.5,3.3,0.0,2.0);
     corazonShape.bezierCurveTo(-0.5,3.3,-0.7,3.7,-1.3,3.5);
     corazonShape.bezierCurveTo(-2.0,3.0,-1.0,1.0,0.0,0.0);
     corazonShape = this.rotateShape(corazonShape, Math.PI, 6);
     
      /*
     picaShape.moveTo(x + 2.5, y + 2.5);
     picaShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
     picaShape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
     picaShape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
     picaShape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
     picaShape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
     picaShape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
      */
      /*
     diamanteShape.moveTo( x , y + 6 );
    diamanteShape.lineTo( x + 4 , y );
    diamanteShape.lineTo( x , y - 6 );
    diamanteShape.lineTo( x - 4 , y );
    diamanteShape.lineTo( x , y + 6 );
    */
    /*
    // Hoja inferior derecha
    trebol_shape.moveTo(2, 1);
    trebol_shape.quadraticCurveTo(1.5, 1, 1.5, 0.5);
    trebol_shape.quadraticCurveTo(1.5, 0, 2, 0);
    trebol_shape.quadraticCurveTo(2.5, 0, 2.5, 0.5);
    trebol_shape.quadraticCurveTo(2.5, 1, 2, 1);

    // Hoja inferior izquierda
    trebol_shape.moveTo(-0.5, 1);
    trebol_shape.quadraticCurveTo(-1, 1, -1, 0.5);
    trebol_shape.quadraticCurveTo(-1, 0, -0.5, 0);
    trebol_shape.quadraticCurveTo(0, 0, 0, 0.5);
    trebol_shape.quadraticCurveTo(0, 1, -0.5, 1);

    // Hoja superior
    trebol_shape.moveTo(1.25, 1);
    trebol_shape.quadraticCurveTo(1.25, 5.5);
    */
   
     var trayectoria = new THREE.CatmullRomCurve3 (
       [
         new THREE.Vector3(0.0,0.0,0.0),
         new THREE.Vector3(0.0,5.0,1.0),
         new THREE.Vector3(0.0,7.0,2.0),
         new THREE.Vector3(0.0,9.0,3.0)
       ] 
      );

      //var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
      var material = new THREE.MeshPhongMaterial({color: 0xD31229});
      //const material = new THREE.MeshBasicMaterial( { color: 0x6F4C01 } );
      material.side = THREE.DoubleSide;


      const extrudeSettings = { bevelEnabled: true, bevelSegments: 20, steps: 2, bevelSize: 1, bevelThickness: 1, extrudePath: trayectoria };
      const geometry = new THREE.ExtrudeGeometry( corazonShape, extrudeSettings );

      this.corazon = new THREE.Mesh( geometry, material );
      this.add( this.corazon );
      
       

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
      this.corazon.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
      
      //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
      
      //this.corazon.scale.set (this.guiControls.radius,this.guiControls.radius,this.guiControls.radius);

    }

    setAxisVisible (valor) {
        this.axis.visible = valor;
      }

    UpdateResolucion (valor) {
        this.corazon.geometry.dispose();
        this.corazon.geometry = new THREE.LatheGeometry( this.points , valor , 0, this.guiControls.angulo);
    }  

    UpdateAngulo (valor) {
      this.corazon.geometry.dispose();
      this.corazon.geometry = new THREE.LatheGeometry( this.points, this.guiControls.resolucion, 0, valor );
  }
  }
  
  export { Corazon };