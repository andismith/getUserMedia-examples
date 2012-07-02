var webcam = (function(){

    var video = document.createElement('video');

    function play() {

        if (navigator.getUserMedia) {

            navigator.getUserMedia({video: true, audio: true, toString : function() {return "video,audio";} }, onSuccess, onError);

        } else {

            changeStatus('getUserMedia is not supported in this browser.', true);
        }

    }

    function onSuccess(stream) {

        var source;
 
        if (window.webkitURL) {

            source = window.webkitURL.createObjectURL(stream);

        } else {

            source = stream; // Opera and Firefox
        }
 

        video.autoplay = true;

        video.src = source;

        changeStatus('Connected.', false);

    }

    function onError() {

        changeStatus('Please accept the getUserMedia permissions! Refresh to try again.', true);

    }

    function changeStatus(msg, error) {
        var status = document.getElementById('status');
        status.innerHTML = msg;
        status.style.color = (error) ? 'red' : 'green';
    }

    return {
        init: function() {

            changeStatus('Please accept the permissions dialog.', true);

            document.body.appendChild(video);

            navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);

            play();

        }()

    }


})();