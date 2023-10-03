class winner  extends Phaser.Scene{
   
    constructor(){
              super("winner");
               this.scoreText = "" + this.score;
    }
     
    preload(){
       // en priload vamos a cargar nuestras imagenes que vamos a usar 
       // para tenerlo disponibles para que la paguna luego la pueda renderizar
    
       //this.load.image('menu2', '/public/img/menu2.png');
       this.load.image('winner', '../public/img/winner.png');
       this.load.image('win', '../public/img/win.png');
       this.load.image('volvermenu', '../public/img/volvermenu.png');
       //this.load.image('boton',  '/public/img/estrella.png');
       //this.load.image('boton2', '/public/img/estrella.png');
       //this.load.image('boton3', '/public/img/estrella.png');
      // this.load.image('boton4', '/public/img/estrella.png');

    }

    create(){
     ////////////////////////////////////////////////////////
      //aqui iba el sonido
      ////////////////////////////////////////////////////////
      
      this.add.image(400,295,'winner');  // imagen del fondo 
      this.add.image(400,200,'win');  // imagen del fondo
      this.botonn = this.add.image(400,350,'volvermenu').setInteractive();  // imagen del fondo
      

      // Asigna una función al evento 'pointerdown' (clic)
      this.botonn.on('pointerdown', () => {
        this.scene.start('Menu'); // Navega a la escena deseada
      });

              
          this.scoreText = this.add.text(325, 500, 'score: '+ this.score, {fontSize: '32px', fill: '#fff'})
          this.scoreText.setText('Score: ' + this.score);  
        
        

      }
    update(){
      
    }
    
  }
   
   export default winner;  