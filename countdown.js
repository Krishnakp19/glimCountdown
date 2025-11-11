(() => {
  const targetDateStr = '2026-04-10T16:00:00';

  function pad(num) {
    return num.toString().padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    const targetDate = new Date(targetDateStr);

    let diff = targetDate.getTime() - now.getTime();
    if (diff < 0) {
      document.getElementById('line1').textContent = "";
      document.getElementById('line2').textContent = "Your time at Great Lakes Institute of Management, Chennai is complete!";
      document.getElementById('line3').textContent = "";
      return;
    }

    const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetMid = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    const days = Math.floor((targetMid - todayMid) / (1000 * 60 * 60 * 24)) + 1;

    let totalSecs = Math.floor(diff / 1000);
    const hours = Math.floor((totalSecs % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    const timeString = `${pad(days)} days ${pad(hours)} Hours ${pad(minutes)} Minutes ${pad(seconds)} Seconds`;

    document.getElementById('line2').textContent = timeString;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
