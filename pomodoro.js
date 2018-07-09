
var timerStarted = false;
var Session = true;
var sessionMinutes = 25;
var sessionSeconds = 0;
var breakMinutes = 5;
var breakSeconds = 0;

var minutes = sessionMinutes;
var seconds = sessionSeconds;

function writeTime(){
    
    let m = minutes;
    let s = seconds;
    if (m<10) m = "0" + m;
    if (s<10) s = "0" + s;
    document.getElementById("timer").innerHTML = m + ":" + s;
}

function startTimer(){
    var countDown = setInterval(function(){
        if(!timerStarted){
            clearInterval(countDown);
            return;
        }
        if(seconds > 0){
            seconds--;
        }
        else{
            seconds = 59;
            minutes --;
        }
        

        if(minutes <0){
            clearInterval(countDown);
            minutes = breakMinutes;
            seconds = breakSeconds;
            writeTime(); 
            Session = false;
            startBreak();
        }
        else{
           writeTime(); 
        }
    },1000);
}

function startBreak(){
    var countDown = setInterval(function(){
        if(!timerStarted){
            clearInterval(countDown);
            return;
        }
        if(seconds > 0){
            seconds--;
        }
        else{
            seconds = 59;
            minutes --;
        }
        if(minutes < 0){
            clearInterval(countDown);
            minutes = sessionMinutes;
            seconds = sessionSeconds;
            writeTime(); 
            Session = true;
            startTimer();
        }
        else{
          writeTime();  
        }
    },1000);
}

function incrementSession(incrementBy){
        
        sessionMinutes = sessionMinutes + incrementBy;
        if(sessionMinutes < 1){
            sessionMinutes = 1;
        }
        else if (sessionMinutes > 99){
            sessionMinutes = 99;
        }
        if(!timerStarted && Session){
            minutes = sessionMinutes;
            seconds = sessionSeconds;
            writeTime();
        }
        document.getElementById("session-time").innerHTML = sessionMinutes;

   
}
function incrementBreak(incrementBy){
    breakMinutes = breakMinutes + incrementBy;
    if(breakMinutes < 1){
        breakMinutes = 1;
    }
    else if (breakMinutes > 99){
        breakMinutes = 99;
    }
    if(!timerStarted && !Session){
        minutes = breakMinutes;
        seconds = breakSeconds;
        writeTime();
    }
    document.getElementById("break-time").innerHTML = breakMinutes;
}

function start(){
    if(timerStarted){
        timerStarted = false;
        document.getElementById("start-button").innerHTML = "Start";
    }
    else{
        timerStarted = true;
        if (Session){
            startTimer();
        }
        else{
            startBreak();
        }
        
        document.getElementById("start-button").innerHTML = "Stop";
    }
}

function reset(){
    timerStarted = false;
    Session = true;
    minutes = sessionMinutes;
    seconds = sessionSeconds;
    document.getElementById("start-button").innerHTML = "Start";
    writeTime();
    
}