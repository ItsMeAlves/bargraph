var audio = document.getElementById("audio_preview");

navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
navigator.webkitGetUserMedia({video: false, audio: true}, function(stream) {
   audio.src = window.URL.createObjectURL(stream);
   audio.play();
}, onRecordFail);

function onRecordFail(e) {
   console.log(e);
}