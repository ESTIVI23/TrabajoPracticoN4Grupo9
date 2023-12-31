class GameO extends Phaser.Scene{

    constructor(){
        super("GameO");
        this.scoreText = "" + this.score;
    }
    init(data){
        this.score = data.score;
    }

    preload(){
        this.load.image('gameover','../public/img/escenario2go.jpg');
        this.load.image('perdiste','../public/img/perdiste.png');
        this.load.image('again','../public/img/again.png');
        this.load.image('credits','../public/img/credits.png');
    }

    create(){
        this.add.image(400,300,'gameover').setScale(1.7).setTint(0x980B54);

        this.add.image(400, 250, 'perdiste').setInteractive();
        this.scoreText = this.add.text(325, 500, 'score: '+ this.score, {fontSize: '32px', fill: '#fff'});

        this.starbutton   = this.add.image(150, 500, 'again').setInteractive();
        this.starbutton.on('pointerdown', () =>{
            this.scene.stop("GameO");
            this.scene.start('Escena1');
        } );
    } 
}

export default GameO;