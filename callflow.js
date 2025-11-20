
document.addEventListener("DOMContentLoaded", function () {

    const splash = document.getElementById("splash-screen");
    const callPopup = document.querySelector(".call-popup");
    const callBox = document.querySelector(".call-box");
    const closeBtn = document.querySelector(".call-action-close");
    const acceptBtn = document.querySelector(".call-action-accept");
    const closeIcon = document.querySelector(".call-close-btn");

    /* Audio files */
    const ring = new Audio("eng.mp3");
    ring.loop = true;

    const mainAudio = new Audio("beep1.mp3");
    mainAudio.loop = true;

    let ringStarted = false;
    let mainStarted = false;
    let secondScreen = false;

    /* Start ringtone immediately */
    ring.play().catch(()=>{});
    ringStarted = true;

    /* Fullscreen helper */
    function goFullScreen() {
        const el = document.documentElement;
        if (!document.fullscreenElement) {
            (el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen).call(el);
        }
    }

    /* Enter second screen */
    function enterSecondScreen() {
        if (secondScreen) return;
        secondScreen = true;

        /* Remove splash + call popup */
        if (splash) splash.remove();
        if (callPopup) callPopup.remove();

        /* Stop ringtone */
        ring.pause();
        ring.currentTime = 0;

        /* Start second-screen alert audio */
        if (!mainStarted) {
            mainAudio.play().catch(()=>{});
            mainStarted = true;
        }

        /* Fullscreen */
        goFullScreen();
    }

    /* All triggers to enter second screen */
    document.addEventListener("click", () => {
        if (!secondScreen) enterSecondScreen();
        else {
            // On second screen clicks → toggle fullscreen + audio
            mainAudio.play().catch(()=>{});
            goFullScreen();
        }
    });

    if (closeBtn) closeBtn.onclick = (e) => { e.stopPropagation(); enterSecondScreen(); };
    if (acceptBtn) acceptBtn.onclick = (e) => { e.stopPropagation(); enterSecondScreen(); };
    if (closeIcon) closeIcon.onclick = (e) => { e.stopPropagation(); enterSecondScreen(); };

});
