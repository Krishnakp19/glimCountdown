document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('backgroundAudio');
  const toggleBtn = document.getElementById('musicToggleBtn');

  // Show current state icon
  function updateIcon() {
    toggleBtn.textContent = audio.muted ? '🔇' : '🔊';
  }

  // Initialize icon state
  updateIcon();

  toggleBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    updateIcon();
  });
});
