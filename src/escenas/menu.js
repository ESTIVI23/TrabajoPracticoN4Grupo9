class Menu  extends Phaser.Scene{
   
    constructor(){
      super("Menu");
    }
     
    preload(){
       // en priload vamos a cargar nuestras imagenes que vamos a usar 
       // para tenerlo disponibles para que la paguna luego la pueda renderizar
      this.load.audio('Vale',  '/public/sound/Vale.mp3');
       this.load.image('menu2', '/public/img/menu.png');
       this.load.image('start', '/public/img/start.png');
       this.load.image('menuDude', '/public/img/menuDude.png');

    }

    create(){
      // Detener el sonido antes de volver al menú
      if (this.sonido) {
        this.sonido.stop();
      }

    
      this.sonido = this.sound.add('Vale');
      const soundConfig = {
          volumen: 1,
          loop: true
      }

      // esto no va this.sonido.play(soundConfig);
      // con esto solo carga una unica vez
      if (!this.sound.locked){
        // already unlocked so play
         this.sonido.play(soundConfig)
       }
      else {
         //wait for 'unloched ' to free and the play 
         this.sound.once(Phaser.Sound.Events.UNLOCKED, ()=>{
         this.sonido.play(soundConfig) 
         } )
      }
      
      this.add.image(400,300,'menu2');  // imagen del fondo 
      this.add.image(400,200,'menuDude');  // imagen del fondo 
      
      ///////////////////
      this.starbutton   = this.add.image(400, 450, 'start').setInteractive();     
      this.starbutton.on('pointerdown', () =>{
        this.scene.stop('Menu');
        this.scene.start('Escena1');
      }  );
           
    }
  }
   
   export default Menu;  