var config = {
    audio: true,
    video: false
};

const audio = new AudioContext();
const board = document.querySelector("#drawBoard");
board.setAttribute("height", window.innerHeight);
board.setAttribute("width", window.innerWidth);
const boardContext = board.getContext("2d");

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

function handle(stream) {
    const input = audio.createMediaStreamSource(stream);
    const WIDTH = board.offsetWidth;
    const HEIGHT = board.offsetHeight;
    var analyser = audio.createAnalyser();
    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    var dataArray = new Uint8Array(bufferLength);

    function drawWaveform() {
        drawVisual = requestAnimationFrame(drawWaveform);
        analyser.getByteTimeDomainData(dataArray);
        boardContext.fillStyle = 'rgb(200, 200, 200)';
        boardContext.fillRect(0, 0, WIDTH, HEIGHT);
        boardContext.lineWidth = 3;
        boardContext.strokeStyle = 'rgb(0, 0, 0)';

        boardContext.beginPath();
      
        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;
        for(var i = 0; i < bufferLength; i++) {
   
            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT/2;

            if(i === 0) {
                boardContext.moveTo(x, y);
            } 
            else {
                boardContext.lineTo(x, y);
            }

            x += sliceWidth;
        }

        boardContext.lineTo(board.width, board.height/2);
        boardContext.stroke();
    };

    function drawFrequency() {
        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;

        drawVisual = requestAnimationFrame(drawFrequency);
        analyser.getByteFrequencyData(dataArray)
        boardContext.fillStyle = 'rgb(0, 0, 0)';
        boardContext.fillRect(0, 0, WIDTH, HEIGHT);

        for(var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]*4;

            boardContext.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
            boardContext.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);

            x += barWidth + 1;
        }
    };

    drawWaveform();

    input.connect(analyser);
    input.connect(audio.destination);
}

if(navigator.getUserMedia) {
    navigator.getUserMedia(config, handle, error => {
        console.log(error.name);
    });
}
else {
    console.log("I can't use that! :/")
}