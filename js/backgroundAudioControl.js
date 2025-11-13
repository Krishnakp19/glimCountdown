window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('backgroundAudio');

  function tryPlay() {
    audio.muted = false;
    audio.play().catch(() => {
      const btn = document.createElement('button');
      btn.textContent = 'Play Background Music';
      Object.assign(btn.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: '10000'
      });
      document.body.appendChild(btn);

      btn.addEventListener('click', () => {
        audio.play();
        btn.remove();
      });
    });
  }

  tryPlay();
});
