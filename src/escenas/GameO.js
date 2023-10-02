class GameO extends Phaser.Scene{

    constructor(){
        super("GameO");
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
        this.add.image(150, 500, 'again').setInteractive();
        this.add.image(680, 500, 'credits').setInteractive();



        this.again.on('pointerdown', () => {
                this.cambio = true;
        })
        this.credits.on('pointerdown', () => {
            this.cambio = false;
        }) 

    }
    update(){
        if (this.cambio = true){
            this.scene.start('Escena1');
        }
        else if(this.cambio = false){
            this.scene.start('Escena2');

        }
    }
}
export default GameO;