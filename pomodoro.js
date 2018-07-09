// Tracks whether the timer is currently counting down
var timerStarted = false;
// Tracks whether a session is in progress ,if false a break is in progress
var sessionInProgress = true;

var sessionMinutes = 25;
var sessionSeconds = 0;
var breakMinutes = 5;
var breakSeconds = 0;


var minutes = sessionMinutes;
var seconds = sessionSeconds;

// Updates the webpage with the current time remaining
function writeTime(){
    let m = minutes;
    let s = seconds;
    if (m<10) m = "0" + m;
    if (s<10) s = "0" + s;
    document.getElementById("timer").innerHTML = m + ":" + s;
}

// Starts the current session timer
function startSession(){
    var countDown = setInterval(function(){
        // Stops the timer if the user pressed stop
        if(!timerStarted){
            clearInterval(countDown);
            return;
        }
        // Reduces the number of seconds
        if(seconds > 0){
            seconds--;
        }
        // Reduces the number of minutes
        else{
            seconds = 59;
            minutes --;
        }
        // Starts the breakTimer if the current timer is finished
        if(minutes <0){
            clearInterval(countDown);
            minutes = breakMinutes;
            seconds = breakSeconds;
            writeTime(); 
            sessionInProgress = false;
            startBreak();
        }
        else{
           writeTime(); 
        }
    },1000);
}

// Starts the current break timer
function startBreak(){
    var countDown = setInterval(function(){
        // Stops the timer if the user pressed stop
        if(!timerStarted){
            clearInterval(countDown);
            return;
        }
        // Reduces the number of seconds
        if(seconds > 0){
            seconds--;
        }
        // Reduces the number of minutes
        else{
            seconds = 59;
            minutes --;
        }
        // Starts the Session timer if the current timer is finished
        if(minutes < 0){
            clearInterval(countDown);
            minutes = sessionMinutes;
            seconds = sessionSeconds;
            writeTime(); 
            sessionInProgress = true;
            startSession();
        }
        else{
          writeTime();  
        }
    },1000);
}

// Increments the Session timer by 1 or -1 based on user input
// Min/Max range of 0<i<99
function incrementSession(incrementBy){
        sessionMinutes = sessionMinutes + incrementBy;
        if(sessionMinutes < 1){
            sessionMinutes = 1;
        }
        else if (sessionMinutes > 99){
            sessionMinutes = 99;
        }
        // Updates the onscreen timer if it isn't currently in use
        if(!timerStarted && sessionInProgress){
            minutes = sessionMinutes;
            seconds = sessionSeconds;
            writeTime();
        }
        document.getElementById("session-time").innerHTML = sessionMinutes;

   
}
// Increments the break timer by 1 or -1 based on user input
// Min/Max range of 0<i<99
function incrementBreak(incrementBy){
    breakMinutes = breakMinutes + incrementBy;
    if(breakMinutes < 1){
        breakMinutes = 1;
    }
    else if (breakMinutes > 99){
        breakMinutes = 99;
    }
    // Updates the onscreen timer if it isn't currently in use
    if(!timerStarted && !sessionInProgress){
        minutes = breakMinutes;
        seconds = breakSeconds;
        writeTime();
    }
    document.getElementById("break-time").innerHTML = breakMinutes;
}

// Starts either the session timer or the break timer depending on the current state
function start(){
    if(timerStarted){
        timerStarted = false;
        document.getElementById("start-button").innerHTML = "Start";
    }
    else{
        timerStarted = true;
        if (sessionInProgress){
            startSession();
        }
        else{
            startBreak();
        }
        
        document.getElementById("start-button").innerHTML = "Stop";
    }
}

// Resets the timer back to its set maximum, also cancels any current break
function reset(){
    timerStarted = false;
    sessionInProgress = true;
    minutes = sessionMinutes;
    seconds = sessionSeconds;
    document.getElementById("start-button").innerHTML = "Start";
    writeTime();
    
}