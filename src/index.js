import Menu from "../src/escenas/menu.js"
import Escena1 from "./escenas/Escena1.js"
import Escena2 from "./escenas/Escena2.js"
import GameO from "./escenas/GameO.js"
import winner from "./escenas/winner.js"
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y:300},
            debug: false
        }
    },
    scene:[Menu,Escena1,Escena2,GameO,winner]
};
let game = new Phaser.Game(config);