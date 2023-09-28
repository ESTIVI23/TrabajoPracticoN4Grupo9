import Menu from "./escenas/Menu.js";
import play from "./escenas/play.js";
 
 let gameConfig = {   
     type : Phaser.CANVAS,
     backgroundColor : 0x444444,
     scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "thegame",
        width : 800,
        height: 800
     },
      scene: [Menu, play]
 }   

 let game =new Phaser.Game(gameConfig);