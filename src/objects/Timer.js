class Timer {
    stop() {
        this.loop.timer.paused = true;
    }

    start() {
        this.loop.timer.paused = false;
    }

    updateTimer() {
        var currentTime = new Date();
        var timeDifference = this.startTime.getTime() - currentTime.getTime();

        // Time elapsed in seconds
        this.timeElapsed = Math.abs(timeDifference / 1000);

        // Time remaining in seconds
        var timeRemaining = this.totalTime - this.timeElapsed;

        if (this.timeElapsed >= this.totalTime) {
            this.stop();
            this.onTimeOut();
            return;
        }

        // Convert seconds into minutes and seconds
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = Math.floor(timeRemaining) - (60 * minutes);

        // Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? '0' + minutes : minutes;

        // Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ':0' + seconds : ':' + seconds;

        this.timeLabel.text = result;
    }

    constructor(game, totalTime = 120, onTimeOut = () => {}) {
        this.timeLabel = game.add.text(game.world.centerX, 10, '00:00', { font: '4em ice_capsregular', fill: '#000' });
        this.timeLabel.anchor.setTo(0.5, 0);
        this.timeLabel.align = 'center';

        this.startTime = new Date();
        this.totalTime = totalTime;
        this.timeElapsed = 0;

        this.onTimeOut = onTimeOut;

        this.loop = game.time.events.loop(100, () => this.updateTimer());
        this.start();
    }
}

export default Timer;
