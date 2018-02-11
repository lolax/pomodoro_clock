document.addEventListener("DOMContentLoaded", function(event) {
  let granted = false;
  const setPermission = () => {
    if (Notification.permission === "granted") {
      granted = true;
    }
  }
  if (Notification.permission !== "granted") {
    Notification.requestPermission(setPermission);
  }
  setPermission();

  let sessionDuration = 25;
  let breakDuration = 5;
  const updateSes = () => document.getElementById("ses_time").innerText = sessionDuration;
  const updateBrk = () => document.getElementById("brk_time").innerText = breakDuration;

  document.getElementById("ses_dec").addEventListener('click', function() {
    if (sessionDuration > 1) {
      sessionDuration -= 1;
      updateSes();
    }
  });
  document.getElementById("ses_inc").addEventListener('click', function() {
      sessionDuration += 1;
      updateSes();
  });
  document.getElementById("brk_dec").addEventListener('click', function() {
    if (breakDuration > 1) {
      breakDuration -= 1;
      updateBrk();
    }
  });
  document.getElementById("brk_inc").addEventListener('click', function() {
      breakDuration += 1;
      updateBrk();
  });

  let timeLeft = sessionDuration * 60000;
  let inSession = true;
  let paused = false;
  let intID = false;

  function updateTimer() {
    let sessionTitle = document.getElementById("ses_title");
    let breakTitle = document.getElementById("brk_title");
    if (inSession) {
      sessionTitle.style.color="black";
      breakTitle.style.color="#b2b2b2";
    } else {
      sessionTitle.style.color="#b2b2b2";
      breakTitle.style.color="black";
    }
    if (!paused) {
      if (timeLeft === 0) {
        inSession = !inSession;
        inSession ? timeLeft = sessionDuration * 60000 : timeLeft = breakDuration * 60000;
        !inSession ? new Notification("Time to take a break!") : new Notification("Time to work!");
      }
      let ms = timeLeft;
      let min = 0;
      let sec = 0;
      while (ms >= 60000) {
        ms -= 60000;
        min += 1;
      }
      while (ms >= 1000) {
        ms -= 1000;
        sec += 1;
      }
      sec > 9 ? sec = sec : sec = "0" + sec;
      min > 9 ? min = min : min = "0" + min;
      document.getElementById("timer").innerText = `${min}:${sec}`;
      timeLeft -= 1000;
    }
  }

  function init() {
    if (!intID) {
      timeLeft = sessionDuration * 60000;
      intID = window.setInterval(updateTimer, 1000);
    } else if (intID && paused) {
      paused = false;
    }
  }

  document.getElementById("play").addEventListener('click', init);
  document.getElementById("pause").addEventListener('click', () => paused = true);
  document.getElementById("restart").addEventListener('click', function() {
    console.log("hi");
    paused = true;
    timeLeft = sessionDuration * 60000;
    sessionDuration > 9 ? sessionDuration = sessionDuration : sessionDuration = "0" + sessionDuration;
    document.getElementById("timer").innerText = `${sessionDuration}:00`;
  });
});
