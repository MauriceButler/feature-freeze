import Phaser from 'phaser-ce';

class GameTitle extends Phaser.State {
    create() {
        game.stage.backgroundColor = '#cecece';
        game.add.text(game.world.centerX / 2, game.world.centerY / 2, 'Feature Freeze', { font: '10em ice_capsregular', fill: '#000' });

        setTimeout(() => this.startGame(), 2000);
    }

    startGame() {
        game.state.start('Main');
    }
}

export default GameTitle;
