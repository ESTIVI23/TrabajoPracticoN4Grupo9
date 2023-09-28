     class Menu  extends Phaser.Scene{
   
          constructor(){
                    super(" Menu");
          }
           
          preload(){
             // en priload vamos a cargar nuestras imagenes que vamos a usar 
             // para tenerlo disponibles para que la paguna luego la pueda renderizar
             this.load.audio('Vale',  '/public/sound/Vale.mp3');
             this.load.image('fondo', '/public/img/fondo.jpg');
             this.load.image('boton', '/public/img/boton.png');

          }

          create(){
           ////////////////////////////////////////////////////////
            this.sonido=  this.sound.add('Vale');
             const soundConfig = {
              volumen :1 ,              // toda esta parte es del
              loop : true               // sonidoooo
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

            ////////////////////////////////////////////////////////
           
             this.add.image(400,400,'fondo');  // imagen del fondo 
                                                                  // este set es un metodo siempre van con ()
            this.starbutton   = this.add.image(400, 500, 'boton').setInteractive();
               this.starbutton.on('pointerdown', () =>{
                   this.scene.start('play');

               }  );
             

            }
          //update
          
        }
         
         export default Menu;  