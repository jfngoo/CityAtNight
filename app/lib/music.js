class Music {
    constructor() {

        this.audioCtx = new AudioContext();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.9;

        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    }

    loadSound() {

        var request = new XMLHttpRequest();
        request.open('GET', 'assets/sounds/lifeformed-sunbleach.mp3', true);
        request.responseType = 'arraybuffer';
        // Decode asynchronously
        request.onload = function () {
            this.audioCtx.decodeAudioData(request.response, function (buffer) {
                // success callback
                this.audioBuffer = buffer;
                // Create sound from buffer
                this.audioSource = this.audioCtx.createBufferSource();
                this.audioSource.buffer = this.audioBuffer;
                // connect the audio source to context's output
                this.audioSource.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);
                // play sound
                this.audioSource.start();
            }.bind(this), function () {
                // error callback
                //
            });
        }.bind(this);
        request.send();
    }
}

export default Music