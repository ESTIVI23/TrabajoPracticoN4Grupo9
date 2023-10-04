class winner  extends Phaser.Scene{
   
    constructor(){
        super("winner");
        this.scoreText = "" + this.score;
    }
    
    init(data){
      this.score = data.score;
    }

    preload(){
      this.load.image('winner', '../public/img/winner.png');
      this.load.image('win', '../public/img/win.png');
      this.load.image('volvermenu', '../public/img/volvermenu.png');
    }

    create(){

      this.add.image(400,295,'winner');  // imagen del fondo 
      this.add.image(400,200,'win');  // imagen del fondo
      this.botonn = this.add.image(400,350,'volvermenu').setInteractive();  // imagen del fondo
    
      // Asigna una función al evento 'pointerdown' (clic)
      this.botonn.on('pointerdown', () => {
        if (this.sonido) {
          this.sonido.stop();
          this.sonido.setCurrentTime(0);
        }
        this.scene.stop("winner");
        this.scene.start('Menu'); // Navega a la escena deseada
      });

      this.scoreText = this.add.text(325, 500, 'score: '+ this.score, {fontSize: '32px', fill: '#fff'});  
    }
    
  }
   
export default winner;  