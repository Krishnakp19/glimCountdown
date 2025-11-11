const TASK_FILE = 'Static/great_lakes_tasks.txt';
let ALL_TASKS = [];

// Get current date as seed for daily task selection
function getTodayDateSeed() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// Simple seeded random number generator
function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Convert date string to number seed
function dateToSeed(dateStr) {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        const char = dateStr.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

// Load tasks from file
async function loadTasks() {
    try {
        const response = await fetch(TASK_FILE);
        const text = await response.text();
        
        // Split by newlines and filter empty lines
        ALL_TASKS = text.split('\n')
                        .map(line => line.trim())
                        .filter(line => line.length > 0);
        
        console.log(`Loaded ${ALL_TASKS.length} tasks`);
    } catch (error) {
        console.error('Error loading tasks:', error);
        ALL_TASKS = ['🎯 Error loading tasks. Check the file path!'];
    }
}

// Select one random task based on today's date
function selectDailyTask() {
    if (ALL_TASKS.length === 0) return 'Loading task...';
    
    const dateSeed = getTodayDateSeed();
    const seed = dateToSeed(dateSeed);
    const randomValue = seededRandom(seed);
    const index = Math.floor(randomValue * ALL_TASKS.length);
    
    console.log(`Task for ${dateSeed}: ${ALL_TASKS[index]}`);
    return ALL_TASKS[index];
}

// Display the task in the ticker
function displayTask(task) {
    const tickerText = document.getElementById('ticker-text');
    tickerText.textContent = `Task for the Day: ${task}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadTasks();
    const dailyTask = selectDailyTask();
    displayTask(dailyTask);
});
