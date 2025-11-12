// Progress Bar Calculator
const START_DATE = new Date('2025-05-05T00:00:00'); // May 5, 2025
const END_DATE = new Date('2026-04-10T16:00:00');   // April 10, 2026, 4:00 PM

function updateProgressBar() {
    const now = new Date();
    
    // Calculate total duration in milliseconds
    const totalDuration = END_DATE - START_DATE;
    
    // Calculate elapsed time
    const elapsed = now - START_DATE;
    
    // Calculate percentage (capped at 100%)
    let percentage = (elapsed / totalDuration) * 100;
    percentage = Math.max(0, Math.min(100, percentage)); // Clamp between 0 and 100
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill && progressText) {
        progressFill.style.width = percentage.toFixed(2) + '%';
        progressText.textContent = percentage.toFixed(1) + '% Completed';
        
        console.log(`📊 Progress: ${percentage.toFixed(2)}% | Start: ${START_DATE.toDateString()} | End: ${END_DATE.toDateString()}`);
    }
    
    // Log milestone achievements
    if (percentage >= 25 && percentage < 25.1) {
        console.log('🎯 Milestone: 25% Completed!');
    } else if (percentage >= 50 && percentage < 50.1) {
        console.log('🎯 Milestone: Halfway there! 50% Completed!');
    } else if (percentage >= 75 && percentage < 75.1) {
        console.log('🎯 Milestone: 75% Completed!');
    } else if (percentage >= 100) {
        console.log('🎉 GLIM Chennai journey complete!');
        progressText.textContent = '100% - Journey Complete! 🎓';
    }
}

// Update on page load
document.addEventListener('DOMContentLoaded', () => {
    updateProgressBar();
    
    // Update every minute
    setInterval(updateProgressBar, 60000);
});
