window.onload = function () {

  /* -------------------------------------------------
     ELEMENTS
  ------------------------------------------------- */

  // Popup 1 (Leave site)
  const leaveDialog = document.getElementById("leaveDialog");
  const leaveBtn = document.getElementById("leaveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  // Popup 2 (Admin panel)
  const adminModal = document.getElementById("adminModal");
  const adminBox = document.getElementById("adminModalBox");
  const adminHeader = document.querySelector(".admin-modal-header");
  const adminButtons = document.querySelectorAll(".admin-btn");

  // Popup 3 (Image popup)
  const imagePopup = document.getElementById("imagePopup");


  /* -------------------------------------------------
     INITIAL STATES
  ------------------------------------------------- */
  leaveDialog.classList.add("ls-show");  // show popup-1 on load
  adminModal.style.display = "none";     // hide popup-2 initially
  imagePopup.style.display = "none";     // hide popup-3 initially

  let initialPhase = true;               // to know when popup-1 should switch
  document.body.classList.add("modal-open", "dark-ui");


  /* -------------------------------------------------
     FULLSCREEN TOGGLE
  ------------------------------------------------- */
  function toggleFullScreen() {
    const doc = document.documentElement;

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


  /* -------------------------------------------------
     AUDIO (starts only after click)
  ------------------------------------------------- */
  const audio = new Audio("eng.mp3");
  audio.loop = true;
  let audioStarted = false;

  function startAudio() {
    if (!audioStarted) {
      audio.play().catch(() => {});
      audioStarted = true;
    }
  }


  /* -------------------------------------------------
     SHOW POPUP-2 AFTER POPUP-1
  ------------------------------------------------- */
  function openAdminPanel() {
    if (!initialPhase) return;
    initialPhase = false;

    leaveDialog.classList.remove("ls-show");

    adminModal.style.display = "flex";
    adminModal.classList.add("fade-in");
  }


  /* -------------------------------------------------
     SHOW IMAGE POPUP AFTER FULLSCREEN
  ------------------------------------------------- */
  function showImagePopup() {
    imagePopup.style.display = "flex";
    imagePopup.classList.add("fade-in");
  }


  /* -------------------------------------------------
     INITIAL CLICK LOGIC
  ------------------------------------------------- */
  function initialClick() {
    startAudio();
    toggleFullScreen();
    openAdminPanel();

    // Show image popup AFTER entering fullscreen
    setTimeout(showImagePopup, 400);

    document.removeEventListener("click", initialClick);
  }

  document.addEventListener("click", initialClick);


  /* -------------------------------------------------
     POPUP-1 BUTTONS (Leave / Cancel)
  ------------------------------------------------- */
  function handlePopup1Btn(e) {
    e.stopPropagation();
    initialClick();
  }

  leaveBtn.addEventListener("click", handlePopup1Btn);
  cancelBtn.addEventListener("click", handlePopup1Btn);


  /* -------------------------------------------------
     POPUP-2 BUTTONS (maximize / close / min / login)
     All toggle fullscreen; popup stays open
  ------------------------------------------------- */
  adminButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      startAudio();
      toggleFullScreen();
    });
  });


  /* -------------------------------------------------
     DRAGGABLE ADMIN WINDOW
  ------------------------------------------------- */
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  if (adminHeader && adminBox) {
    adminHeader.style.cursor = "move";

    adminHeader.addEventListener("mousedown", function (e) {
      isDragging = true;

      const rect = adminBox.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      adminBox.style.position = "fixed";
      adminBox.style.transform = "none";

      e.preventDefault();
      e.stopPropagation();
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDragging) return;

      adminBox.style.left = e.clientX - offsetX + "px";
      adminBox.style.top = e.clientY - offsetY + "px";
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
    });
  }


  /* -------------------------------------------------
     DISABLE ESC + F11
  ------------------------------------------------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "F11") {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

};
