(() => {
  const tickerText = document.getElementById('ticker-text');
  if (!tickerText) return;

  // Example static text, replace or add dynamic logic as needed
  const text = "Task for the Day: 🎤 Whisper 'strategy' every time you pass someone studying.";

  function initTicker() {
    tickerText.textContent = text;
  }

  document.addEventListener('DOMContentLoaded', initTicker);
})();
