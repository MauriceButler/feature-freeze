import Phaser from 'phaser-ce';

class GameOver extends Phaser.State {
    create() {

    }

    restartGame() {
        game.state.start('Main');
    }
}

export default GameOver;
