(() => {
  const track = document.getElementById("carouselTrack");
  if (!track) return;

  // Double the items so animation can loop seamlessly
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let animationDuration = 40000; // 40 seconds
  track.style.setProperty('--carousel-duration', animationDuration + 'ms');
  
  // Setup CSS variable for animation start if not present
  if (!track.style.getPropertyValue('--carousel-start')) {
    track.style.setProperty('--carousel-start', '0');
  }

  // Add CSS animation class
  track.classList.add('carousel-animate');

  // Pause animation on hover by toggling CSS class (handled by CSS)

  // Responsive adjustment helper if needed
  window.addEventListener('resize', () => {
    // Potentially adjust animation duration or other variables based on container width
  });
})();
