document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('backgroundAudio');
  const toggleBtn = document.getElementById('musicToggleBtn');

  function updateIcon() {
    toggleBtn.textContent = audio.muted ? '🔇' : '🔊';
  }

  // Ensure icon is correct on load
  updateIcon();

  toggleBtn.addEventListener('click', () => {
    if (audio.muted) {
      // Unmute and attempt to play audio
      audio.muted = false;
      audio.play().catch(() => {
        // Playback failed; maybe user gesture needed, leave muted
        audio.muted = true;
      });
    } else {
      // Mute only (do not pause)
      audio.muted = true;
    }
    updateIcon();
  });
});
