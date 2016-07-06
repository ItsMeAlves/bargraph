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

    function draw() {
        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;

        drawVisual = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray)
        boardContext.fillStyle = 'rgb(0, 0, 0)';
        boardContext.fillRect(0, 0, WIDTH, HEIGHT);

        for(var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]*4;

            boardContext.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
            boardContext.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);

            x += barWidth + 1;
        }
    };

    draw();

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