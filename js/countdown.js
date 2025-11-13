(() => {
  const targetDate = new Date('2026-04-10T16:00:00');

  function pad(num) { return num.toString().padStart(2, '0'); }

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');

    if (diff <= 0) {
      line1.textContent = '';
      line2.textContent = 'Your time at Great Lakes Institute of Management, Chennai is complete!';
      line3.textContent = '';
      return;
    }

    const days = Math.floor((targetDate - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / (1000 * 60 * 60 * 24)) + 1;

    const totalSecs = Math.floor(diff / 1000);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    line1.textContent = 'You have got';
    line2.textContent = `${pad(days)} days ${pad(hours)} Hours ${pad(minutes)} Minutes ${pad(seconds)} Seconds`;
    line3.textContent = 'left at GLIM Chennai';
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
