function srvTime(){
    var xmlHttp;
    try {
        //FF, Opera, Safari, Chrome
        xmlHttp = new XMLHttpRequest();
    }
    catch (err1) {
        //IE
        try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (eerr3) {
                //AJAX not supported, use CPU time.
                xmlHttp = "AJAX not supported";
                alert("AJAX not supported");
            }
        }
    }
    xmlHttp.open('HEAD',window.location.href.toString(),false);
    xmlHttp.setRequestHeader("Content-Type", "text/html");
    xmlHttp.send('');
    return xmlHttp.getResponseHeader("Date");
}
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime);
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
    var openSpan = clock.querySelector('.open');
  
    function updateClock() {
      var t = endtime;
  
      daysSpan.innerHTML = t;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
      openSpan.innerHTML=checkOpen(dateSrv)
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }  


function checkOpen(t){
  var s = "Kemonprint buka";
  var minHour= 1;
  var maxHour= 10; 
  if(t.getDay() > 0 && t.getDay() < 6 ){
    if(t.getHours() > minHour && t.getHours() < maxHour ){
      s= "Kemonprint sedang tutup";
    }
  }
  return s;
}
var s = srvTime();
var dateSrv = new Date(s);  
var deadline = new Date('September 18 , 2018 00:01:00');
initializeClock('clockdiv', deadline);
