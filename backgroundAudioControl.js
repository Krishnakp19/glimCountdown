window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('backgroundAudio');

  function playAudio() {
    audio.muted = false; // Unmute audio
    audio.play().catch(() => {
      // Autoplay was prevented, so add a user interaction control to start audio
      const unmuteBtn = document.createElement('button');
      unmuteBtn.textContent = 'Play Background Music';
      unmuteBtn.style.position = 'fixed';
      unmuteBtn.style.top = '10px';
      unmuteBtn.style.right = '10px';
      unmuteBtn.style.zIndex = 10000;
      document.body.appendChild(unmuteBtn);

      unmuteBtn.addEventListener('click', () => {
        audio.play();
        unmuteBtn.remove();
      });
    });
  }

  playAudio();
});
