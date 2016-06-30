var config = {
    audio: true,
    video: false
};

const audio = new AudioContext();

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

function handle(stream) {
    const input = audio.createMediaStreamSource(stream);
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