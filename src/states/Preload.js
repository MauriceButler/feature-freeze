import Phaser from 'phaser-ce';

class Preload extends Phaser.State {
    preload() {
        /* Preload required assets */
        game.load.spritesheet('player', 'assets/sprites/player.png', 64, 96);

        game.load.image('card', 'assets/sprites/card.png');
        game.load.image('title', 'assets/title.png');

        game.load.image('verticleCenterBar', 'assets/sprites/verticleCenterBar.png');
    }

    create() {
        // NOTE: Change to GameTitle if required
        game.state.start('GameTitle');
    }
}

export default Preload;
