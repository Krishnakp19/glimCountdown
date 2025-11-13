document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('backgroundAudio');
  const btn = document.getElementById('musicToggleBtn');

  function updateIcon() {
    btn.textContent = audio.muted ? '🔇' : '🔊';
  }

  updateIcon();

  btn.addEventListener('click', () => {
    if (audio.muted) {
      audio.muted = false;
      audio.play().catch(() => {
        audio.muted = true;
      });
    } else {
      audio.muted = true;
    }
    updateIcon();
  });
});
