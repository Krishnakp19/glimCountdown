(() => {
  const cornerVideoContainer = document.getElementById('cornerVideoContainer');
  if (!cornerVideoContainer) return;

  // Example bouncing animation within viewport bounds
  let x = 10, y = 10;
  let dx = 3, dy = 2;
  const maxX = window.innerWidth - cornerVideoContainer.offsetWidth;
  const maxY = window.innerHeight - cornerVideoContainer.offsetHeight;

  function move() {
    x += dx;
    y += dy;

    if (x <= 0 || x >= maxX) dx = -dx;
    if (y <= 0 || y >= maxY) dy = -dy;

    cornerVideoContainer.style.left = x + 'px';
    cornerVideoContainer.style.top = y + 'px';

    requestAnimationFrame(move);
  }

  // Start position fixed to avoid conflicts
  cornerVideoContainer.style.position = 'fixed';
  cornerVideoContainer.style.left = x + 'px';
  cornerVideoContainer.style.top = y + 'px';
  cornerVideoContainer.style.zIndex = '9999';

  requestAnimationFrame(move);

  // Adjust maxX and maxY on resize
  window.addEventListener('resize', () => {
    maxX = window.innerWidth - cornerVideoContainer.offsetWidth;
    maxY = window.innerHeight - cornerVideoContainer.offsetHeight;
  });
})();
