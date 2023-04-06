
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'
import * as TWEEN from '../libs/tween.esm.js'


// Clases de mi proyecto


import { Carta } from './Carta.js'





class MyScene extends THREE.Scene {
  constructor(myCanvas) {
    super();

    this.contadorEscaleras = 0;
    this.mouseDown = false;
    this.ground = null;
    this.raycaster = new THREE.Raycaster();
    this.boxSize = 9.5;
    this.vectorMeshCartas = new THREE.Object3D();
    this.vectorMeshBases = new THREE.Object3D();
    this.vectorCartasReserva = [];
    this.ultimaCartaSeleccionada = null;
    this.cartaBoton = new Carta('../imgs/poker-card-back.jpg', 0)
    this.renderer = this.createRenderer(myCanvas);
    this.gui = this.createGUI();
    this.initStats();
    this.createLights();
    this.createCamera();
    this.createGround();
    this.axis = new THREE.AxesHelper(5);
    this.add(this.axis);

    this.inicializarBases();
    this.inicializarCartas();


    this.cartaBoton.modeloCarta.position.x = 55;
    this.cartaBoton.modeloCarta.position.z = 40;

    this.aniadeCarta(this.cartaBoton);

    this.add(this.vectorMeshCartas);
    this.add(this.vectorMeshBases);


  }

  inicializarBases() {

    var Base1 = new Carta('../imgs/texturapoker1.jpg', 0);
    var Base2 = new Carta('../imgs/texturapoker1.jpg', 0);
    var Base2 = new Carta('../imgs/texturapoker1.jpg', 0);
    var Base3 = new Carta('../imgs/texturapoker1.jpg', 0);
    var Base4 = new Carta('../imgs/texturapoker1.jpg', 0);
    var Base5 = new Carta('../imgs/texturapoker1.jpg', 0);
    var Base6 = new Carta('../imgs/texturapoker1.jpg', 0);
    var Base7 = new Carta('../imgs/texturapoker1.jpg', 0);
    var Base8 = new Carta('../imgs/texturapoker1.jpg', 0);
    var Base9 = new Carta('../imgs/texturapoker1.jpg', 0);
    var Base10 = new Carta('../imgs/texturapoker1.jpg', 0);


    Base1.modeloCarta.position.x = -45;
    Base1.modeloCarta.position.z = -30;

    Base2.modeloCarta.position.x = -35;
    Base2.modeloCarta.position.z = -30;

    Base3.modeloCarta.position.x = -25;
    Base3.modeloCarta.position.z = -30;

    Base4.modeloCarta.position.x = -15;
    Base4.modeloCarta.position.z = -30;

    Base5.modeloCarta.position.x = -5;
    Base5.modeloCarta.position.z = -30;

    Base6.modeloCarta.position.x = 5;
    Base6.modeloCarta.position.z = -30;

    Base7.modeloCarta.position.x = 15;
    Base7.modeloCarta.position.z = -30;

    Base8.modeloCarta.position.x = 25;
    Base8.modeloCarta.position.z = -30;

    Base9.modeloCarta.position.x = 35;
    Base9.modeloCarta.position.z = -30;

    Base10.modeloCarta.position.x = 45;
    Base10.modeloCarta.position.z = -30;




    this.aniadeBase(Base1);
    this.aniadeBase(Base2);
    this.aniadeBase(Base3);
    this.aniadeBase(Base4);
    this.aniadeBase(Base5);
    this.aniadeBase(Base6);
    this.aniadeBase(Base7);
    this.aniadeBase(Base8);
    this.aniadeBase(Base9);
    this.aniadeBase(Base10);


  }


  inicializarCartas() {


    var Carta1 = new Carta('../imgs/asCorazones.jpg', 1, true);
    var Carta2 = new Carta('../imgs/Playing_card_heart_2.jpg', 2, true);
    var Carta3 = new Carta('../imgs/Playing_card_heart_3.jpg', 3, true);
    var Carta4 = new Carta('../imgs/Playing_card_heart_4.jpg', 4, true);
    var Carta5 = new Carta('../imgs/Playing_card_heart_5.jpg', 5, true);
    var Carta6 = new Carta('../imgs/Playing_card_heart_6.jpg', 6, true);
    var Carta7 = new Carta('../imgs/Playing_card_heart_7.jpg', 7, true);
    var Carta8 = new Carta('../imgs/Playing_card_heart_8.jpg', 8, true);
    var Carta9 = new Carta('../imgs/Playing_card_heart_9.jpg', 9, true);
    var Carta10 = new Carta('../imgs/Playing_card_heart_10.jpg', 10, true);
    var Carta11 = new Carta('../imgs/Playing_card_heart_J.jpg', 11, true);
    var Carta12 = new Carta('../imgs/Playing_card_heart_Q.jpg', 12, true);
    var Carta13 = new Carta('../imgs/Playing_card_heart_K.jpg', 13, true);




    var Carta1_2 = new Carta('../imgs/asCorazones.jpg', 1, true);
    var Carta2_2 = new Carta('../imgs/Playing_card_heart_2.jpg', 2, true);
    var Carta3_2 = new Carta('../imgs/Playing_card_heart_3.jpg', 3, true);
    var Carta4_2 = new Carta('../imgs/Playing_card_heart_4.jpg', 4);
    var Carta5_2 = new Carta('../imgs/Playing_card_heart_5.jpg', 5, true);
    var Carta6_2 = new Carta('../imgs/Playing_card_heart_6.jpg', 6, true);
    var Carta7_2 = new Carta('../imgs/Playing_card_heart_7.jpg', 7, true);
    var Carta8_2 = new Carta('../imgs/Playing_card_heart_8.jpg', 8, true);
    var Carta9_2 = new Carta('../imgs/Playing_card_heart_9.jpg', 9, true);
    var Carta10_2 = new Carta('../imgs/Playing_card_heart_10.jpg', 10, true);
    var Carta11_2 = new Carta('../imgs/Playing_card_heart_J.jpg', 11, true);
    var Carta12_2 = new Carta('../imgs/Playing_card_heart_Q.jpg', 12, true);
    var Carta13_2 = new Carta('../imgs/Playing_card_heart_K.jpg', 13, true);


    var Carta1_3 = new Carta('../imgs/asCorazones.jpg', 1);
    var Carta2_3 = new Carta('../imgs/Playing_card_heart_2.jpg', 2, true);
    var Carta3_3 = new Carta('../imgs/Playing_card_heart_3.jpg', 3, true);
    var Carta4_3 = new Carta('../imgs/Playing_card_heart_4.jpg', 4);
    var Carta5_3 = new Carta('../imgs/Playing_card_heart_5.jpg', 5, true);
    var Carta6_3 = new Carta('../imgs/Playing_card_heart_6.jpg', 6, true);
    var Carta7_3 = new Carta('../imgs/Playing_card_heart_7.jpg', 7, true);
    var Carta8_3 = new Carta('../imgs/Playing_card_heart_8.jpg', 8, true);
    var Carta9_3 = new Carta('../imgs/Playing_card_heart_9.jpg', 9, true);
    var Carta10_3 = new Carta('../imgs/Playing_card_heart_10.jpg', 10, true);
    var Carta11_3 = new Carta('../imgs/Playing_card_heart_J.jpg', 11, true);
    var Carta12_3 = new Carta('../imgs/Playing_card_heart_Q.jpg', 12);
    var Carta13_3 = new Carta('../imgs/Playing_card_heart_K.jpg', 13); //NO USADA

    var Carta1_4 = new Carta('../imgs/asCorazones.jpg', 1);
    var Carta2_4 = new Carta('../imgs/Playing_card_heart_2.jpg', 2, true);
    var Carta3_4 = new Carta('../imgs/Playing_card_heart_3.jpg', 3);
    var Carta4_4 = new Carta('../imgs/Playing_card_heart_4.jpg', 4); //NO USADA
    var Carta5_4 = new Carta('../imgs/Playing_card_heart_5.jpg', 5);
    var Carta6_4 = new Carta('../imgs/Playing_card_heart_6.jpg', 6, true);
    var Carta7_4 = new Carta('../imgs/Playing_card_heart_7.jpg', 7, true);
    var Carta8_4 = new Carta('../imgs/Playing_card_heart_8.jpg', 8, true);
    var Carta9_4 = new Carta('../imgs/Playing_card_heart_9.jpg', 9, true);
    var Carta10_4 = new Carta('../imgs/Playing_card_heart_10.jpg', 10);
    var Carta11_4 = new Carta('../imgs/Playing_card_heart_J.jpg', 11, true);
    var Carta12_4 = new Carta('../imgs/Playing_card_heart_Q.jpg', 12); // NO USADA
    var Carta13_4 = new Carta('../imgs/Playing_card_heart_K.jpg', 13); // NO USADA

    var Carta1_5 = new Carta('../imgs/asCorazones.jpg', 1); // NO USADA
    var Carta2_5 = new Carta('../imgs/Playing_card_heart_2.jpg', 2); // NO USADA
    var Carta3_5 = new Carta('../imgs/Playing_card_heart_3.jpg', 3); // NO USADA
    var Carta4_5 = new Carta('../imgs/Playing_card_heart_4.jpg', 4); // NO USADA
    var Carta5_5 = new Carta('../imgs/Playing_card_heart_5.jpg', 5); // NO USADA
    var Carta6_5 = new Carta('../imgs/Playing_card_heart_6.jpg', 6, true);
    var Carta7_5 = new Carta('../imgs/Playing_card_heart_7.jpg', 7); // NO USADA
    var Carta8_5 = new Carta('../imgs/Playing_card_heart_8.jpg', 8, true);
    var Carta9_5 = new Carta('../imgs/Playing_card_heart_9.jpg', 9, true);
    var Carta10_5 = new Carta('../imgs/Playing_card_heart_10.jpg', 10); // NO USADA
    var Carta11_5 = new Carta('../imgs/Playing_card_heart_J.jpg', 11, true);
    var Carta12_5 = new Carta('../imgs/Playing_card_heart_Q.jpg', 12); // NO USADA
    var Carta13_5 = new Carta('../imgs/Playing_card_heart_K.jpg', 13); // NO USADA

    var Carta1_6 = new Carta('../imgs/asCorazones.jpg', 1); // NO USADA
    var Carta2_6 = new Carta('../imgs/Playing_card_heart_2.jpg', 2); // NO USADA
    var Carta3_6 = new Carta('../imgs/Playing_card_heart_3.jpg', 3); // NO USADA
    var Carta4_6 = new Carta('../imgs/Playing_card_heart_4.jpg', 4); // NO USADA
    var Carta5_6 = new Carta('../imgs/Playing_card_heart_5.jpg', 5); // NO USADA
    var Carta6_6 = new Carta('../imgs/Playing_card_heart_6.jpg', 6);
    var Carta7_6 = new Carta('../imgs/Playing_card_heart_7.jpg', 7); // NO USADA
    var Carta8_6 = new Carta('../imgs/Playing_card_heart_8.jpg', 8); // NO USADA
    var Carta9_6 = new Carta('../imgs/Playing_card_heart_9.jpg', 9); // NO USADA
    var Carta10_6 = new Carta('../imgs/Playing_card_heart_10.jpg', 10); // NO USADA
    var Carta11_6 = new Carta('../imgs/Playing_card_heart_J.jpg', 11);
    var Carta12_6 = new Carta('../imgs/Playing_card_heart_Q.jpg', 12); // NO USADA
    var Carta13_6 = new Carta('../imgs/Playing_card_heart_K.jpg', 13); // NO USADA

    var Carta1_7 = new Carta('../imgs/asCorazones.jpg', 1); // NO USADA
    var Carta2_7 = new Carta('../imgs/Playing_card_heart_2.jpg', 2); // NO USADA
    var Carta3_7 = new Carta('../imgs/Playing_card_heart_3.jpg', 3); // NO USADA
    var Carta4_7 = new Carta('../imgs/Playing_card_heart_4.jpg', 4); // NO USADA
    var Carta5_7 = new Carta('../imgs/Playing_card_heart_5.jpg', 5); // NO USADA
    var Carta6_7 = new Carta('../imgs/Playing_card_heart_6.jpg', 6); // NO USADA
    var Carta7_7 = new Carta('../imgs/Playing_card_heart_7.jpg', 7); // NO USADA
    var Carta8_7 = new Carta('../imgs/Playing_card_heart_8.jpg', 8); // NO USADA
    var Carta9_7 = new Carta('../imgs/Playing_card_heart_9.jpg', 9); // NO USADA
    var Carta10_7 = new Carta('../imgs/Playing_card_heart_10.jpg', 10); // NO USADA
    var Carta11_7 = new Carta('../imgs/Playing_card_heart_J.jpg', 11); // NO USADA
    var Carta12_7 = new Carta('../imgs/Playing_card_heart_Q.jpg', 12); // NO USADA
    var Carta13_7 = new Carta('../imgs/Playing_card_heart_K.jpg', 13); // NO USADA

    var Carta1_8 = new Carta('../imgs/asCorazones.jpg', 1); // NO USADA
    var Carta2_8 = new Carta('../imgs/Playing_card_heart_2.jpg', 2); // NO USADA
    var Carta3_8 = new Carta('../imgs/Playing_card_heart_3.jpg', 3); // NO USADA
    var Carta4_8 = new Carta('../imgs/Playing_card_heart_4.jpg', 4); // NO USADA
    var Carta5_8 = new Carta('../imgs/Playing_card_heart_5.jpg', 5); // NO USADA
    var Carta6_8 = new Carta('../imgs/Playing_card_heart_6.jpg', 6); // NO USADA
    var Carta7_8 = new Carta('../imgs/Playing_card_heart_7.jpg', 7); // NO USADA
    var Carta8_8 = new Carta('../imgs/Playing_card_heart_8.jpg', 8); // NO USADA
    var Carta9_8 = new Carta('../imgs/Playing_card_heart_9.jpg', 9); // NO USADA
    var Carta10_8 = new Carta('../imgs/Playing_card_heart_10.jpg', 10); // NO USADA
    var Carta11_8 = new Carta('../imgs/Playing_card_heart_J.jpg', 11); // NO USADA
    var Carta12_8 = new Carta('../imgs/Playing_card_heart_Q.jpg', 12); // NO USADA
    var Carta13_8 = new Carta('../imgs/Playing_card_heart_K.jpg', 13); // NO USADA



    this.vectorCartasReserva.push(Carta9_6);
    this.vectorCartasReserva.push(Carta1_5);
    this.vectorCartasReserva.push(Carta3_5);
    this.vectorCartasReserva.push(Carta12_4);
    this.vectorCartasReserva.push(Carta2_5);
    this.vectorCartasReserva.push(Carta1_6);
    this.vectorCartasReserva.push(Carta5_5);
    this.vectorCartasReserva.push(Carta12_5);
    this.vectorCartasReserva.push(Carta9_7);
    this.vectorCartasReserva.push(Carta2_6);



    this.vectorCartasReserva.push(Carta4_5);
    this.vectorCartasReserva.push(Carta13_3);
    this.vectorCartasReserva.push(Carta7_5);
    this.vectorCartasReserva.push(Carta13_4);
    this.vectorCartasReserva.push(Carta2_7);
    this.vectorCartasReserva.push(Carta13_5);
    this.vectorCartasReserva.push(Carta12_6);
    this.vectorCartasReserva.push(Carta12_7);
    this.vectorCartasReserva.push(Carta4_4);
    this.vectorCartasReserva.push(Carta13_6);



    this.vectorCartasReserva.push(Carta10_5);
    this.vectorCartasReserva.push(Carta8_6);
    this.vectorCartasReserva.push(Carta8_7);
    this.vectorCartasReserva.push(Carta1_7);
    this.vectorCartasReserva.push(Carta12_8);
    this.vectorCartasReserva.push(Carta9_8);
    this.vectorCartasReserva.push(Carta3_6);
    this.vectorCartasReserva.push(Carta5_6);
    this.vectorCartasReserva.push(Carta3_7);
    this.vectorCartasReserva.push(Carta4_6);



    this.vectorCartasReserva.push(Carta1_8);
    this.vectorCartasReserva.push(Carta7_6);
    this.vectorCartasReserva.push(Carta13_7);
    this.vectorCartasReserva.push(Carta5_7);
    this.vectorCartasReserva.push(Carta6_7);
    this.vectorCartasReserva.push(Carta7_7);
    this.vectorCartasReserva.push(Carta4_7);
    this.vectorCartasReserva.push(Carta7_8);
    this.vectorCartasReserva.push(Carta2_8);
    this.vectorCartasReserva.push(Carta8_8);



    this.vectorCartasReserva.push(Carta10_6);
    this.vectorCartasReserva.push(Carta10_7);
    this.vectorCartasReserva.push(Carta4_8);
    this.vectorCartasReserva.push(Carta5_8);
    this.vectorCartasReserva.push(Carta11_7);
    this.vectorCartasReserva.push(Carta6_8);
    this.vectorCartasReserva.push(Carta11_8);
    this.vectorCartasReserva.push(Carta10_8);
    this.vectorCartasReserva.push(Carta3_8);
    this.vectorCartasReserva.push(Carta13_8);



    this.ponerEncima(this.vectorMeshBases.children[0].userData, Carta3);
    this.ponerEncima(Carta3, Carta10);
    this.ponerEncima(Carta10, Carta2);
    this.ponerEncima(Carta2, Carta4);
    this.ponerEncima(Carta4, Carta7);
    this.ponerEncima(Carta7, Carta11_6);


    Carta3.MoverCarta(new THREE.Vector3(this.vectorMeshBases.children[0].position.x, this.vectorMeshBases.children[0].position.y, this.vectorMeshBases.children[0].position.z))

    this.ponerEncima(this.vectorMeshBases.children[1].userData, Carta7_2);
    this.ponerEncima(Carta7_2, Carta8);
    this.ponerEncima(Carta8, Carta9);
    this.ponerEncima(Carta9, Carta3_2);
    this.ponerEncima(Carta3_2, Carta2_2);
    this.ponerEncima(Carta2_2, Carta5_4);


    Carta7_2.MoverCarta(new THREE.Vector3(this.vectorMeshBases.children[1].position.x, this.vectorMeshBases.children[1].position.y, this.vectorMeshBases.children[1].position.z));


    this.ponerEncima(this.vectorMeshBases.children[2].userData, Carta7_3);
    this.ponerEncima(Carta7_3, Carta1);
    this.ponerEncima(Carta1, Carta13);
    this.ponerEncima(Carta13, Carta6);
    this.ponerEncima(Carta6, Carta6_2);
    this.ponerEncima(Carta6_2, Carta4_2);


    Carta7_3.MoverCarta(new THREE.Vector3(this.vectorMeshBases.children[2].position.x, this.vectorMeshBases.children[2].position.y, this.vectorMeshBases.children[2].position.z));


    this.ponerEncima(this.vectorMeshBases.children[3].userData, Carta6_3);
    this.ponerEncima(Carta6_3, Carta2_3);
    this.ponerEncima(Carta2_3, Carta1_2);
    this.ponerEncima(Carta1_2, Carta10_2);
    this.ponerEncima(Carta10_2, Carta5);
    this.ponerEncima(Carta5, Carta3_4);


    Carta6_3.MoverCarta(new THREE.Vector3(this.vectorMeshBases.children[3].position.x, this.vectorMeshBases.children[3].position.y, this.vectorMeshBases.children[3].position.z));


    this.ponerEncima(this.vectorMeshBases.children[4].userData, Carta11);
    this.ponerEncima(Carta11, Carta10_3);
    this.ponerEncima(Carta10_3, Carta11_2);
    this.ponerEncima(Carta11_2, Carta6_4);
    this.ponerEncima(Carta6_4, Carta10_4);


    Carta11.MoverCarta(new THREE.Vector3(this.vectorMeshBases.children[4].position.x, this.vectorMeshBases.children[4].position.y, this.vectorMeshBases.children[4].position.z));


    this.ponerEncima(this.vectorMeshBases.children[5].userData, Carta9_2);
    this.ponerEncima(Carta9_2, Carta8_2);
    this.ponerEncima(Carta8_2, Carta3_3);
    this.ponerEncima(Carta3_3, Carta11_3);
    this.ponerEncima(Carta11_3, Carta1_3);


    Carta9_2.MoverCarta(new THREE.Vector3(this.vectorMeshBases.children[5].position.x, this.vectorMeshBases.children[5].position.y, this.vectorMeshBases.children[5].position.z));

    this.ponerEncima(this.vectorMeshBases.children[6].userData, Carta12);
    this.ponerEncima(Carta12, Carta9_3);
    this.ponerEncima(Carta9_3, Carta9_4);
    this.ponerEncima(Carta9_4, Carta13_2);
    this.ponerEncima(Carta13_2, Carta12_3);


    Carta12.MoverCarta(new THREE.Vector3(this.vectorMeshBases.children[6].position.x, this.vectorMeshBases.children[6].position.y, this.vectorMeshBases.children[6].position.z));


    this.ponerEncima(this.vectorMeshBases.children[7].userData, Carta7_4);
    this.ponerEncima(Carta7_4, Carta11_4);
    this.ponerEncima(Carta11_4, Carta12_2);
    this.ponerEncima(Carta12_2, Carta8_3);
    this.ponerEncima(Carta8_3, Carta6_6);


    Carta7_4.MoverCarta(new THREE.Vector3(this.vectorMeshBases.children[7].position.x, this.vectorMeshBases.children[7].position.y, this.vectorMeshBases.children[7].position.z));


    this.ponerEncima(this.vectorMeshBases.children[8].userData, Carta8_4);
    this.ponerEncima(Carta8_4, Carta11_5);
    this.ponerEncima(Carta11_5, Carta9_5);
    this.ponerEncima(Carta9_5, Carta8_5);
    this.ponerEncima(Carta8_5, Carta4_3);


    Carta8_4.MoverCarta(new THREE.Vector3(this.vectorMeshBases.children[8].position.x, this.vectorMeshBases.children[8].position.y, this.vectorMeshBases.children[8].position.z));


    this.ponerEncima(this.vectorMeshBases.children[9].userData, Carta5_2);
    this.ponerEncima(Carta5_2, Carta6_5);
    this.ponerEncima(Carta6_5, Carta2_4);
    this.ponerEncima(Carta2_4, Carta5_3);
    this.ponerEncima(Carta5_3, Carta1_4);


    Carta5_2.MoverCarta(new THREE.Vector3(this.vectorMeshBases.children[9].position.x, this.vectorMeshBases.children[9].position.y, this.vectorMeshBases.children[9].position.z));




    this.aniadeCarta(Carta1);
    this.aniadeCarta(Carta2);
    this.aniadeCarta(Carta3);
    this.aniadeCarta(Carta4);
    this.aniadeCarta(Carta5);
    this.aniadeCarta(Carta6);
    this.aniadeCarta(Carta7);
    this.aniadeCarta(Carta8);
    this.aniadeCarta(Carta9);
    this.aniadeCarta(Carta10);
    this.aniadeCarta(Carta11);
    this.aniadeCarta(Carta12);
    this.aniadeCarta(Carta13);

    this.aniadeCarta(Carta1_2);
    this.aniadeCarta(Carta2_2);
    this.aniadeCarta(Carta3_2);
    this.aniadeCarta(Carta4_2);
    this.aniadeCarta(Carta5_2);
    this.aniadeCarta(Carta6_2);
    this.aniadeCarta(Carta7_2);
    this.aniadeCarta(Carta8_2);
    this.aniadeCarta(Carta9_2);
    this.aniadeCarta(Carta10_2);
    this.aniadeCarta(Carta11_2);
    this.aniadeCarta(Carta12_2);
    this.aniadeCarta(Carta13_2);

    this.aniadeCarta(Carta1_3);
    this.aniadeCarta(Carta2_3);
    this.aniadeCarta(Carta3_3);
    this.aniadeCarta(Carta4_3);
    this.aniadeCarta(Carta5_3);
    this.aniadeCarta(Carta6_3);
    this.aniadeCarta(Carta7_3);
    this.aniadeCarta(Carta8_3);
    this.aniadeCarta(Carta9_3);
    this.aniadeCarta(Carta10_3);
    this.aniadeCarta(Carta11_3);
    this.aniadeCarta(Carta12_3);
    //this.aniadeCarta(Carta13_3);

    this.aniadeCarta(Carta1_4);
    this.aniadeCarta(Carta2_4);
    this.aniadeCarta(Carta3_4);
    //this.aniadeCarta(Carta4_4);
    this.aniadeCarta(Carta5_4);
    this.aniadeCarta(Carta6_4);
    this.aniadeCarta(Carta7_4);
    this.aniadeCarta(Carta8_4);
    this.aniadeCarta(Carta9_4);
    this.aniadeCarta(Carta10_4);
    this.aniadeCarta(Carta11_4);
    //this.aniadeCarta(Carta12_4);
    //this.aniadeCarta(Carta13_4);

    //this.aniadeCarta(Carta1_5);
    //this.aniadeCarta(Carta2_5);
    //this.aniadeCarta(Carta3_5);
    //this.aniadeCarta(Carta4_5);
    //this.aniadeCarta(Carta5_5);
    this.aniadeCarta(Carta6_5);
    //this.aniadeCarta(Carta7_5);
    this.aniadeCarta(Carta8_5);
    this.aniadeCarta(Carta9_5);
    //this.aniadeCarta(Carta10_5);
    this.aniadeCarta(Carta11_5);
    //this.aniadeCarta(Carta12_5);
    //this.aniadeCarta(Carta13_5);

    //this.aniadeCarta(Carta1_6);
    // this.aniadeCarta(Carta2_6);
    //this.aniadeCarta(Carta3_6);
    //this.aniadeCarta(Carta4_6);
    //this.aniadeCarta(Carta5_6);
    this.aniadeCarta(Carta6_6);
    //this.aniadeCarta(Carta7_6);
    //this.aniadeCarta(Carta8_6);
    //this.aniadeCarta(Carta9_6);
    //this.aniadeCarta(Carta10_6);
    this.aniadeCarta(Carta11_6);
    //this.aniadeCarta(Carta12_6);
    //this.aniadeCarta(Carta13_6);

  }

  ponerEncima(cartadebajo, cartaencima) {
    cartadebajo.cartaEncima = cartaencima;
    cartaencima.cartaDebajo = cartadebajo;

  }
  aniadeCarta(carta) {
    this.vectorMeshCartas.add(carta.modeloCarta);
  }

  aniadeBase(base) {
    this.vectorMeshBases.add(base.modeloCarta);
  }


  initStats() {

    var stats = new Stats();

    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    $("#Stats-output").append(stats.domElement);

    this.stats = stats;
  }

  createCamera() {

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.set(0, 120, 0);


    var look = new THREE.Vector3(0, 0, 0);
    this.camera.lookAt(look);
    this.add(this.camera);
  }

  createGround() {

    var geometryGround = new THREE.BoxGeometry(220, 0.2, 160);
    var texture = new THREE.TextureLoader().load('../imgs/texturapoker1.jpg');
    var materialGround = new THREE.MeshPhongMaterial({ map: texture });
    this.ground = new THREE.Mesh(geometryGround, materialGround);
    this.ground.receiveShadow = true;
    this.ground.position.y = -0.2;
    this.add(this.ground);
  }

  createGUI() {
    var gui = new GUI();

    this.guiControls = {

      reiniciar: () => {
        location.reload();
      },
      iluminacion: false
    }

    gui.add(this.guiControls, 'reiniciar').name(': Nueva Partida :');
    gui.add(this.guiControls, 'iluminacion')
      .name(': Iluminacion Cartas ON/OFF :')
      .onChange((value) => this.iluminacion = value);

    return gui;
  }

  createLights() {
    
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.7);
    
    this.add(ambientLight);
   
    this.Light = new THREE.DirectionalLight(0xffffff, 0.5);
    this.Light.position.set(-40, 80, -40);
    this.Light.castShadow = true;
    
    this.Light.shadow.camera.left = -100;
    this.Light.shadow.camera.bottom = -100;
    this.Light.shadow.camera.right = 100;
    this.Light.shadow.camera.top = 100;

    
    this.Light.shadow.bias = -0.0004;

    this.Light.shadow.mapSize.width = 2048
    this.Light.shadow.mapSize.height = 2048;
    this.add(this.Light);

  }

  setLightIntensity(valor) {
    this.Light.intensity = valor;
  }

  setAxisVisible(valor) {
    this.axis.visible = valor;
  }


  createRenderer(myCanvas) {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    $(myCanvas).append(renderer.domElement);
    return renderer;
  }

  getCamera() {
    return this.camera;
  }

  setCameraAspect(ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  onWindowResize() {
    this.setCameraAspect(window.innerWidth / window.innerHeight);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  intersectBoxes(b1, b2) {
    var vectorBetweenBoxes = new THREE.Vector2();
    vectorBetweenBoxes.subVectors(new THREE.Vector2(b1.position.x, b1.position.z),
      new THREE.Vector2(b2.position.x, b2.position.z));
    return (vectorBetweenBoxes.length() < this.boxSize);
  }


  getMouse(event) {
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
    return mouse;
  }

  getPointOnGround(event) {
    var mouse = this.getMouse(event);
    this.raycaster.setFromCamera(mouse, this.getCamera());
    var surfaces = [this.ground];
    var pickedObjects = this.raycaster.intersectObjects(surfaces);
    if (pickedObjects.length > 0) {
      return new THREE.Vector3(pickedObjects[0].point.x, pickedObjects[0].point.y, pickedObjects[0].point.z);
    } else
      return null;
  }

  moveBox(event, action) {
    switch (action) {
      case MyScene.END_ACTION:
        if (this.box != null) {
          this.box.material.transparent = false;
          //this.box.position.y -= 2;
          this.updateHeightBoxes(this.vectorMeshCartas.children.length - 1);

          if (this.iluminacion) {
            this.box.userData.iluminarCartas(false);
          }


          this.box = null;


        }
        break;

      case MyScene.MOVE_BOX:
        var pointOnGround = this.getPointOnGround(event);
        if (pointOnGround != null) {
          if (this.box != null) {
            this.box.position.x = pointOnGround.x;
            this.box.position.z = pointOnGround.z;

            var cartaMover = this.box.userData;

            if (cartaMover.cartaEncima != null) {

              cartaMover.cartaEncima.MoverCarta(new THREE.Vector3(pointOnGround.x, this.box.position.y, pointOnGround.z));
              
            }
            
          }
        }
        break;

      case MyScene.SELECT_BOX:
        var mouse = this.getMouse(event);
        this.raycaster.setFromCamera(mouse, this.getCamera());
        var pickedObjects = this.raycaster.intersectObjects(this.vectorMeshCartas.children);
        //console.log(pickedObjects.length);
        if (pickedObjects.length > 0) {
         
          if (pickedObjects[0].object.userData == this.cartaBoton) {
            
            this.repartirCartas();
          }
          else if (pickedObjects[0].object.userData.numeroCarta != 0 && !pickedObjects[0].object.userData.cartaOculta && !pickedObjects[0].object.userData.cartaBloqueada) {


            this.box = pickedObjects[0].object;
            this.ultimaCartaSeleccionada = pickedObjects[0].object.userData;

            this.box.material.transparent = true;
            this.box.material.opacity = 0.5;

            this.posicionInicial = new THREE.Vector3();
            this.posicionInicial.x = this.box.position.x;
            this.posicionInicial.y = this.box.position.y;
            this.posicionInicial.z = this.box.position.z;


            this.box.position.y += 2;

            if (this.iluminacion) {
              this.box.userData.iluminarCartas(true);
            }

            var indexOfBox = this.vectorMeshCartas.children.indexOf(this.box);
            
            this.vectorMeshCartas.remove(this.box);
            this.vectorMeshCartas.add(this.box);
            
          }
        }
        break;

    }
  }


  async repartirCartas() {

    var puntosAnimacion = [];
    puntosAnimacion.push(new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z));

    for (var i = 0; i < this.vectorMeshBases.children.length && this.vectorCartasReserva.length > 0; i++) {
      var cartaAux = this.getCartaMasArriba(this.vectorMeshBases.children[i].userData);
      
      this.vectorCartasReserva[0].MoverCarta(new THREE.Vector3(this.cartaBoton.modeloCarta.position.x - 5, this.cartaBoton.modeloCarta.position.y + 10, this.cartaBoton.modeloCarta.position.z - 5))
      this.vectorCartasReserva[0].MoverCartaConAnimacion(new THREE.Vector3(cartaAux.modeloCarta.position.x, cartaAux.modeloCarta.position.y, cartaAux.modeloCarta.position.z), 4000)
      this.ponerEncima(cartaAux, this.vectorCartasReserva[0]);
     
      this.vectorCartasReserva[0].bloquearCartas();

      this.aniadeCarta(this.vectorCartasReserva[0]);
      this.vectorCartasReserva.shift();

      puntosAnimacion.push(new THREE.Vector3(cartaAux.modeloCarta.position.x, cartaAux.modeloCarta.position.y + 50, cartaAux.modeloCarta.position.z));

      await new Promise(r => setTimeout(r, 400));
    }

    this.animacionCamara(puntosAnimacion);

    if (this.vectorCartasReserva.length < 1) {
      this.cartaBoton.MoverCarta(new THREE.Vector3(-1000, -1000, -1000));


    }


  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  animacionCamara(puntosAnimacion) {

    var spline = new THREE.CatmullRomCurve3(puntosAnimacion, true);

    this.camera.position.set(0, 120, 0);
    var origen = { p: 0 };
    var destino = { p: 1 };


    var animacion = new TWEEN.Tween(origen)
      .to(destino, 10000) 
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        var pos = spline.getPointAt(origen.p);
        this.camera.position.copy(pos);




      })
      .repeat(0) 
      .yoyo(false); 

    animacion.start();
  }

  updateHeightBoxes(k) {

    this.vectorMeshCartas.children[k].position.y = 0;
    var mesh_i = this.vectorMeshCartas.children[k];

    var hayInterseccion = false;
    var hayInterseccionBase = false;
    var hayUnion = false;

    for (var i = 0; i < k; i++) {
      var cartasEncima = false;
      var mesh_j = this.vectorMeshCartas.children[i];
      var cartaAux = mesh_i.userData.cartaEncima;

      while (cartaAux != null) {
        if (cartaAux == mesh_j.userData) {
          cartasEncima = true;
        }
        cartaAux = cartaAux.cartaEncima;
      }

      if (this.intersectBoxes(mesh_j, mesh_i) && !cartasEncima) {
        hayUnion = true;

        if ((mesh_i.userData.numeroCarta == (mesh_j.userData.numeroCarta - 1) && !mesh_j.userData.cartaOculta) && mesh_j.userData.cartaEncima == null) {

          mesh_i.userData.MoverCartaConAnimacion(new THREE.Vector3(mesh_j.position.x, mesh_j.position.y, mesh_j.position.z))



          if (mesh_i.userData.cartaDebajo != null) {

            mesh_i.userData.cartaDebajo.cartaEncima = null;

            
            mesh_i.userData.cartaDebajo.desbloquearCartas();

          }


          mesh_i.userData.cartaDebajo = mesh_j.userData;
          mesh_j.userData.cartaEncima = mesh_i.userData;
          hayInterseccion = true;

          if (this.hayEscalera()) {
            console.log("¡HAY ESCALERA!");

          }

        }
      }

    }

    if (!hayInterseccion && !hayUnion) {
      
      for (var i = 0; i < this.vectorMeshBases.children.length; i++) {
        var mesh_j = this.vectorMeshBases.children[i];
        
        if (this.intersectBoxes(mesh_j, mesh_i) && mesh_j.userData.cartaEncima == null) {
        
          mesh_i.userData.MoverCartaConAnimacion(new THREE.Vector3(mesh_j.position.x, mesh_j.position.y, mesh_j.position.z))

          if (mesh_i.userData.cartaDebajo != null) {
            mesh_i.userData.cartaDebajo.cartaEncima = null;
            
            mesh_i.userData.cartaDebajo.desbloquearCartas();
          }
          mesh_i.userData.cartaDebajo = mesh_j.userData;
          mesh_j.userData.cartaEncima = mesh_i.userData;

          hayInterseccion = true;


          hayInterseccionBase = true;
        }
      }


    }

    if (!hayInterseccionBase && !hayInterseccion) {
     
      mesh_i.userData.MoverCartaConAnimacion(new THREE.Vector3(this.posicionInicial.x, this.posicionInicial.y - mesh_i.userData.desfaseEjeY, this.posicionInicial.z - mesh_i.userData.desfaseEjeZ));

    }


  }

  hayEscalera() {
    var carta = this.ultimaCartaSeleccionada;
    carta = this.getCartaMasArriba(carta);
    var tamanioEscalera = 13;

    var acumulado = 1;

    while ((carta.cartaDebajo != null) && (carta.numeroCarta == (carta.cartaDebajo.numeroCarta - 1)) && (acumulado < tamanioEscalera) && !carta.cartaDebajo.cartaOculta) {
      acumulado += 1;
      carta = carta.cartaDebajo;
    }
    
    if (acumulado == tamanioEscalera) {
      carta.MoverCartaConAnimacion(new THREE.Vector3(-45 + (10 * this.contadorEscaleras), 1, 40), 1000);
      this.contadorEscaleras = this.contadorEscaleras + 1;

      if (carta.cartaDebajo != null)
        carta.cartaDebajo.cartaEncima = null;

      carta.cartaDebajo = null;



      if (this.contadorEscaleras == 8) {
        document.getElementById("Messages").innerHTML = "<h2>" + "HAS GANADO" + "</h2>";
      }

      return true;



    }
    else {
      return false;
    }
  }

  getCartaMasArriba(carta) {
    var cartaAux = carta;
    while (cartaAux.cartaEncima != null) {
      cartaAux = cartaAux.cartaEncima;
    }
    return cartaAux;
  }

  onMouseDown(event) {

    if (event.button === 0) {   // Left button
      this.mouseDown = true;
      this.moveBox(event, MyScene.SELECT_BOX);
    }
  }

  onMouseMove(event) {

    if (this.mouseDown) {
      this.moveBox(event, MyScene.MOVE_BOX);
    }
  }

  onMouseUp(event) {

    if (this.mouseDown) {
      this.moveBox(event, MyScene.END_ACTION);
      this.mouseDown = false;
    }
  }




  update() {

    if (this.stats) this.stats.update();
    this.renderer.render(this, this.getCamera());
    
    for (var i = 0; i < this.vectorMeshCartas.children.length; i++) {
      this.vectorMeshCartas.children[i].userData.update();
    }

    for (var i = 0; i < this.vectorMeshBases.children.length; i++) {
      this.vectorMeshBases.children[i].userData.update();
    }

    
    requestAnimationFrame(() => this.update())
  }
}

MyScene.MOVE_BOX = 1;
MyScene.SELECT_BOX = 2;
MyScene.END_ACTION = 10;

/// La función   main
$(function () {

  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener("resize", () => scene.onWindowResize());
  window.addEventListener("mousemove", (event) => scene.onMouseMove(event), true);
  window.addEventListener("mousedown", (event) => scene.onMouseDown(event), true);
  window.addEventListener("mouseup", (event) => scene.onMouseUp(event), true);
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
