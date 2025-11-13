window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('backgroundAudio');

  function tryPlay() {
    audio.muted = false;
    audio.play().catch(() => {
      const btn = document.createElement('button');
      btn.textContent = 'Play Background Music';
      btn.style.position = 'fixed';
      btn.style.top = '10px';
      btn.style.right = '10px';
      btn.style.zIndex = '10000';
      document.body.appendChild(btn);

      btn.addEventListener('click', () => {
        audio.play();
        btn.remove();
      });
    });
  }

  tryPlay();
});
