class Escena2 extends Phaser.Scene{

  constructor(){
      super("Escena2");
      this.platforms = null;
      this.scoreText = "";
      this.score = 0;
      this.numPlat = 3;
      // Variables globales encapsuladas en el constructor
      this.platformSpeed = 50;
      this.platformGroup = null;
  }
  
  

  preload(){
      this.load.image('sky2','../public/img/fondo1.jpeg');
      this.load.image('ground', '../public/img/platform.png');
      this.load.image('lava', '../public/img/lavaa.png');
      this.load.image('star', '../public/img/star.png');
      this.load.image('bomb', '../public/img/bomb.png');
      this.load.image('trofeo', '../public/img/trofeo.png');
      this.load.spritesheet('dude', '../public/img/dude.png', {frameWidth:32, frameHeight:48});
  }

  create(){
      //cielo y barras
      this.add.image(400,300,'sky2').setScale(1.7).setTint(0x980B54);
      
      // Crear un grupo de plataformas
      this.platformGroup = this.physics.add.group();
      
      this.trofeo = this.physics.add.group();

      this.piso = this.physics.add.staticGroup();

      //Evento de actualizacion
       this.time.addEvent({
            delay: 5000,
            callback: this.crearPlataformas,
            callbackScope: this,
            repeat: 1
        });

        let p1 = this.platformGroup.create(50, 250, 'ground');
        let p2 = this.platformGroup.create(480, 80, 'ground');
        let p3 = this.platformGroup.create(750, 220, 'ground');

      this.piso.create(150, 577, 'lava').setScale(1).refreshBody();
      this.piso.create(400, 577, 'lava').setScale(1).refreshBody();
      this.piso.create(700, 577, 'lava').setScale(1).refreshBody();

      this.physics.world.setBounds(0, 0, 800, 600);
      this.physics.add.collider(this.platformGroup, this.platformGroup);

      //Estrella y jugador
      this.player = this.physics.add.sprite(100, 200, 'dude');
     
      //physics del player
      this.player.setBounce(0.2); //rebote entre 0 o 1
      this.player.setCollideWorldBounds(true); //no atravesar bordes del area de juego


      this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
          frameRate: 30,
          repeat: -1 // valor negativo para repeticion infinita, 0 para una sola
                      //reproduccion, 1 para dos repeticiones, y asi sucesivamente
      });

      this.anims.create({
          key: 'turn',
          frames: [{key: 'dude', frame:4}],
          frameRate: 20
      });

      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
          frameRate: 10,
          repeat: -1
      });

      //Colision de jugador y plataformas
      this.physics.add.collider(this.player, this.platformGroup);

      this.cursors = this.input.keyboard.createCursorKeys();
  
      //Se  agregan las estrellas
      this.stars = this.physics.add.group({
          key: 'star',
          repeat: 5, //cantidad de estrellas
          setXY: { x: 12, y: 0, stepX: 110 } //empieza en la posicion x e y, se repite cada 70 de espacios
      });

      //Se agrega el rebote entre el grupo de estrellas
      this.stars.children.iterate(function (child){
          child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });

      //habilita las colisiones de las estrellas con las plataformas
      this.physics.add.collider(this.stars, this.platformGroup);

      //Choque entre las estrellas y el jugador
      this.physics.add.overlap(this.player, this.stars, this.collectStar, null , this );
      
       //Choque entre el trofeo y el jugador
       this.physics.add.overlap(this.player, this.trofeo, this.reaccionTrofeo , null , this );

      //Para controlar el puntaje
      this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#00FFFF'});

      //Para agregar las bombas
      this.bombs = this.physics.add.group();
      this.physics.add.collider(this.bombs, this.platformGroup);
      this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);


      ///////////////////////////////////////////////////

      //Colision de jugador y LAVA
         // this.physics.add.collider(this.player, this.piso);

      this.physics.add.collider(this.player, this.piso, this.fire, null, this);
     
      
       /////////////////////////////////////////////////////////
  
       
  }
  update(){

    
      // Mueve las plataformas hacia abajo y recrearlas si es necesario
      if (this.platformGroup.getChildren().length > 0) {
        this.platformGroup.children.iterate(function(platform) {
            platform.setVelocityY(this.platformSpeed);
            
            if (platform.y > 600) {
                console.log("Estoy aqui al finnn!!");
                platform.destroy();
                let p1 = this.platformGroup.create(0, 700, '');
                
            }
            
        }, this);
      }

      if (this.cursors.left.isDown) {
          this.player.setVelocityX(-160);
          
          this.player.anims.play('left', true);
      } else if(this.cursors.right.isDown){
          this.player.setVelocityX(160);
          
          this.player.anims.play('right', true);
      }
      else{
          this.player.setVelocityX(0);
          
          this.player.anims.play('turn', true);
      }
      //si presiona la tecla de arriba y el player esta pisando suelo
      if (this.cursors.up.isDown && this.player.body.touching.down) {
          this.player.setVelocityY(-300);
      }

  }

  //Creacion de plataformas
  crearPlataformas(){
    let p1 = this.platformGroup.create(50, 200, 'ground');
    let p2 = this.platformGroup.create(480, 40, 'ground');
    let p3 = this.platformGroup.create(750, 170, 'ground');
    this.numPlat +=3;

    if(this.numPlat == 9 ){
        let p1 = this.trofeo.create(400, 0, 'trofeo');
        this.physics.add.collider(this.trofeo, this.platformGroup); 
    }
    

  } 

  reaccionTrofeo(){
    this.scene.start('winner');
  }

  //Colision entre el jugador y las estrellas
  collectStar(player, star) {
      star.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
      
      //Para las bombas
      if(this.stars.countActive(true) == 0){
          this.stars.children.iterate(function(child){
              child.enableBody(true, child.x, 0, true, true);
          });
          let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
          let bomb = this.bombs.create(x, 16, 'bomb');
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
  }

  

  hitBomb(player, bomb){
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      //gameOver = true;
      this.scene.start('Escena2');
  }

  fire(player, piso){
    player.setTint(0xff0000);
    this.time.addEvent({
        delay: 500,
        callbackScope: this,
        callback: function(){
            this.scene.start('GameO')
        }
    })
   }
}
export default Escena2;