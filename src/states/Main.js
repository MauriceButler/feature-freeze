import Phaser from 'phaser-ce';
import Timer from '../objects/Timer';
import makePlayer from '../objects/makePlayer';
import keyboard from '../objects/keyboard';

var level = 1;

class Main extends Phaser.State {
    levelUp() {
        level++;
        this.cards.forEach((card) => card.kill());

        var levelUpLabel = game.add.text(
            game.world.centerX,
            game.world.centerY,
            'Sprint ' + level + ' Complete!',
            { font: '10em ice_capsregular', fill: '#000' }
        );

        levelUpLabel.anchor.setTo(0.5, 0);
        levelUpLabel.align = 'center';

        setTimeout(() => levelUpLabel.destroy(), 500);

        for (var i = 0; i < level + 3; i++) {
            this.addTask(this.board);
        }
    }

    addTask(board, card) {
        var task = this.tasks.getFirstDead();
        task.reset(board.x, board.y);
        task.health = 30;

        this.backlog.forEach((item) => item.x += (task.width + (task.width / 4)));

        this.backlog.unshift(task);

        if (card) {
            task.tint = card.tint;
            card.kill();
        }
    }

    createCards() {
        this.cards = game.add.group();
        this.cards.enableBody = true;
        this.cards.createMultiple(50, 'card');
    }

    createTasks() {
        this.tasks = game.add.group();
        this.tasks.enableBody = true;
        this.tasks.createMultiple(50, 'card');
    }

    createBoard() {
        this.board = game.add.sprite(0, game.world.height - 50, 'verticleCenterBar');
        this.board.width = game.width;
        this.board.smoothed = false;
        this.board.enableBody = true;
        game.physics.arcade.enable(this.board);
        this.board.body.collideWorldBounds = true;
        this.board.body.immovable = true;
    }

    addCard() {
        // Get a card that is not currently on screen
        var card = this.cards.getFirstDead();
        var randomX = Math.max(Math.floor(Math.random() * (game.width - card.width)), card.width);

        // Reset it to the specified coordinates
        card.reset(randomX, 20);
        card.body.velocity.y = 150;
        card.body.immovable = true;

        card.tint = Math.random() * 0xffffff;

        // When the card leaves the screen, kill it
        card.checkWorldBounds = true;
        card.outOfBoundsKill = true;
    }

    create() {
        // Enable Arcade Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Set the games background colour
        game.stage.backgroundColor = '#cecece';

        this.backlog = [];

        this.timer = new Timer(game);

        this.createBoard();
        this.createCards();
        this.createTasks();

        for (var i = 0; i < level + 3; i++) {
            this.addTask(this.board);
        }

        this.cardLoop = game.time.events.loop(2000 - (level * 100), this.addCard, this);

        this.player = makePlayer(game);
        this.cursors = game.input.keyboard.createCursorKeys();

        this.keyboard = keyboard.init(this);
    }

    update() {
        game.physics.arcade.overlap(this.board, this.cards, this.addTask, null, this);
        game.physics.arcade.overlap(this.cards, this.player, (x, card) => card.kill(), null, this);

        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        game.physics.arcade.collide(this.player, this.board);
        game.physics.arcade.collide(this.cards, this.board);

        keyboard.update(this);
    }
}

export default Main;
