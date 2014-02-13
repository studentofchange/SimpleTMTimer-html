$(function(){

	// Cache some selectors

    var clock = $('#timer');
    var speechtime = 7,
        topictime = 2,
        evaltime = 3,
        duration = speechtime;

    var secondsCountDown,
        secondsGrace = 30,
        secondsGreen = 60 + 60 ,
        secondsYellow = 60 ,
        secondsRed = 0,
        secondsNoMore = -secondsGrace;

    var interval;
    var timeout;



    // change background color
    setTime(duration);

    function changeBackground(color) {
        document.body.style.background = color;
    };

    function displayText(id, txt) {
        document.getElementById(id).innerHTML = txt;
    };

    function setTime(minutes) {
        duration = minutes;
        secondsCountDown = minutes * 60;
        showTime();
    };

    function showTime() {
        sign = (secondsCountDown < 0) ? "-" : " ";
        a = Math.abs(secondsCountDown);
        m = Math.floor(a / 60);
        s = a % 60;
        timeformat = sign + m + ":" + (s > 9 ? "" : "0") + s;
        displayText('timer', timeformat);
//        displayText('out', secondsCountDown.toString());
    };

    function elapsedTime() {
        elapsed = duration * 60 - secondsCountDown;
        m = Math.floor(elapsed / 60);
        if (m < 0) m++;
        s = Math.abs(elapsed) % 60;
        return ("Elapsed time: " + m + ":" + (s > 9 ? "" : "0") + s );
    }

    function startTimer() {
        clearInterval(interval);
        secondsCountDown = duration * 60;
        interval = setInterval(function () { myTimer() }, 1000);  // every second
        displayText('out', "Timer Started");
        //        displayText('out', secondsNoMore.toString());
        soundAlarm(.1);
    };

    function stopTimer() {
        clearInterval(interval);
//        clearTimeout(timeout);
        displayText('out', "Stopped Timer");
    };


    function soundAlarm(vol) {
        var sound = new Audio('js/beep1.mp3');
        sound.volume = vol;
        sound.play();
    }

    function flashRed() {
        changeBackground("white");
        soundAlarm(1);
        changeBackground("red");
        soundAlarm(.3);
    };

    function myTimer() {
        secondsCountDown--;
        showTime();

        if (secondsCountDown <= secondsNoMore) {
            flashRed();
            changeBackground('purple');
        } else if (secondsCountDown <= secondsRed) {
            changeBackground('red');
        } else if (secondsCountDown <= secondsYellow) {
            changeBackground('yellow');
        } else if (secondsCountDown <= secondsGreen) {
            changeBackground('green');
        };
    };

    function started() {
        return document.getElementById("startstop").innerHTML == 'Stop';
    }

	$('button.startstop').click(function(){
//	    clock = moment().format("hhmmss");
	    if (! started()) {
//	        stopTimer();
	        setTime(duration);
	        startTimer();
	        displayText("startstop", 'Stop');
	    } else {
	        displayText("startstop", 'Start');
	        stopTimer();
	        displayText('out', elapsedTime());
	        changeBackground('white');
	    };
	});

	$('button.restart').click(function () {
	    if (!started()) {
	        setTime(duration);
	        changeBackground("white");
	    }
	});

	$('button.speech').click(function () {
	    if (!started()) {
	        setTime(speechtime);
	        changeBackground("white");
	    }
	});

	$('button.tabletopic').click(function () {
	    if (!started()) {
	        setTime(topictime);
	        changeBackground("white");
	    }
	});

	$('button.evaluation').click(function () {
	    if (!started()) {
	        setTime(evaltime);
	        changeBackground("white");
	    }
	});

	$('button.increment').click(function () {
	    if (!started()) {
	        setTime(duration + 1);
	        changeBackground("white");
	    }
	});

	$('button.decrement').click(function () {
	    if (!started()) {
	        if (duration - 1 >= 1) {
	            setTime(duration - 1);
	            changeBackground("white");
	        }
	    }
	});
});