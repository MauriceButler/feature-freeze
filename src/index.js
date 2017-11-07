import Phaser from 'phaser-ce';

import Boot from './states/Boot';
import Preload from './states/Preload';
import GameTitle from './states/GameTitle';
import Main from './states/Main';
import GameOver from './states/GameOver';

class Game extends Phaser.Game {
    constructor() {
        super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);

        window.scaleRatio = window.devicePixelRatio / 3;

        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('GameTitle', GameTitle, false);
        this.state.add('Main', Main, false);
        this.state.add('GameOver', GameOver, false);

        // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
        if (!window.cordova) {
            this.state.start('Boot');
        }
    }
}

window.game = new Game();

if (window.cordova) {
    var app = {
        initialize: function () {
            document.addEventListener(
                'deviceready',
                this.onDeviceReady.bind(this),
                false
            );
        },

        // deviceready Event Handler
        //
        onDeviceReady: function () {
            this.receivedEvent('deviceready');

            // When the device is ready, start Phaser Boot state.
            window.game.state.start('Boot');
        },

        receivedEvent: function (id) {
            console.log('Received Event: ' + id);
        },
    };

    app.initialize();
}
