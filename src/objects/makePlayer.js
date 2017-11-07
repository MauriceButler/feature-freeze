function makePlayer(game) {
    var player = game.add.sprite(64, game.world.height - 150, 'player');

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;

    player.animations.add('left', [2], 10, true);
    player.animations.add('right', [1], 10, true);
    player.animations.add('code', [1, 2], 10, true);

    return player;
}

module.exports = makePlayer;
