(() => {
  const confettiBtn = document.getElementById('confettiBtn');
  if (!confettiBtn) return;

  confettiBtn.addEventListener('click', () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  });
})();
