import Phaser from 'phaser-ce';

class Boot extends Phaser.State {
    preload() {

    }

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.state.start('Preload');
    }
}

export default Boot;
