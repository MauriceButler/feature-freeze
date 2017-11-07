import Phaser from 'phaser-ce';
var keysToBind = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'COLON', 'EQUALS', 'COMMA', 'UNDERSCORE', 'PERIOD', 'QUESTION_MARK', 'TILDE', 'OPEN_BRACKET', 'BACKWARD_SLASH', 'CLOSED_BRACKET', 'QUOTES', 'BACKSPACE', 'CLEAR', 'ENTER', 'SHIFT', 'CONTROL', 'CAPS_LOCK', 'PLUS', 'MINUS', 'INSERT', 'DELETE'];
var velocity = 200;

function update(state) {
    if (state.cursors.left.isDown) {
        //  Move to the left
        state.player.body.velocity.x = -velocity;

        state.player.animations.play('left');
    } else if (state.cursors.right.isDown) {
        //  Move to the right
        state.player.body.velocity.x = velocity;

        state.player.animations.play('right');
    } else if (state.cursors.up.isDown) {
        //  Move up
        state.player.body.velocity.y = -velocity;

        state.player.animations.play('right');
    } else if (state.cursors.down.isDown) {
        //  Move down
        state.player.body.velocity.y = velocity;

        state.player.animations.play('left');
    } else if (!state.player.data.isCoding) {
        //  Stand still
        state.player.animations.stop();
        state.player.frame = 0;
    }
}

function writeCode() {
    var task = this.backlog[this.backlog.length - 1];

    if (!task) {
        return;
    }

    task.damage(1);

    if (task.health < 1) {
        this.backlog.pop();
        if (!this.backlog.length) {
            this.levelUp();
        }
    }

    if (this.player.data.isCoding) {
        clearTimeout(this.player.data.codingTimeout);
    } else {
        this.player.animations.play('code');
    }

    this.player.data.isCoding = true;
    this.player.data.codingTimeout = setTimeout(
        () => this.player.data.isCoding = false,
        300
    );
}

function init(state) {
    for (var i = 0; i < keysToBind.length; i++) {
        var key = game.input.keyboard.addKey(Phaser.Keyboard[keysToBind[i]]);
        key.onUp.add(writeCode, state);
        key.onDown.add(writeCode, state);
    }
}

export default {
    init,
    update,
};
