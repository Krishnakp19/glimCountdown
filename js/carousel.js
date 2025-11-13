(() => {
  const track = document.getElementById("carouselTrack");
  if (!track) return;

  const items = Array.from(track.children);
  items.forEach(item => track.appendChild(item.cloneNode(true)));

  track.style.setProperty('--carousel-duration', '40000ms');
  if (!track.style.getPropertyValue('--carousel-start')) {
    track.style.setProperty('--carousel-start', '0');
  }

  track.classList.add('carousel-animate');

  // Resize listener can be used if needed for responsive behaviour
  window.addEventListener('resize', () => {});
})();
