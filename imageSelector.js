const IMAGE_FOLDER = 'Static/Profile Pics/';
const IMAGE_LIST_FILE = 'Static/images.txt';
let ALL_IMAGES = [];

// Load image list from text file
async function loadImageList() {
    try {
        const response = await fetch(IMAGE_LIST_FILE);
        const text = await response.text();
        
        // Split by newlines and filter empty lines
        ALL_IMAGES = text.split('\n')
                        .map(line => line.trim())
                        .filter(line => line.length > 0);
        
        console.log(`Loaded ${ALL_IMAGES.length} images`);
    } catch (error) {
        console.error('Error loading image list:', error);
    }
}

// Get current date as string (YYYYMMDD format) to use as seed
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
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

// Select random images based on today's date (same images all day)
function selectRandomImages(count = 2) {
    const dateSeed = getTodayDateSeed();
    const seed = dateToSeed(dateSeed);
    
    // Create a copy of the array to shuffle
    const available = [...ALL_IMAGES];
    const selected = [];
    
    // Use seeded random to select images
    for (let i = 0; i < count && available.length > 0; i++) {
        // Generate seeded random index
        const randomValue = seededRandom(seed + i);
        const index = Math.floor(randomValue * available.length);
        
        // Select and remove the image from available list
        selected.push(available[index]);
        available.splice(index, 1);
    }
    
    console.log(`Selected images for ${dateSeed}:`, selected);
    return selected;
}

// Display images on page
function displayImages(imageNames) {
    const container = document.getElementById('random-images-container');
    container.innerHTML = '';
    
    imageNames.forEach((imageName) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';
        
        const img = document.createElement('img');
        img.src = `${IMAGE_FOLDER}${imageName}`;
        img.alt = imageName;
        img.className = 'profile-image';
        
        const nameLabel = document.createElement('div');
        nameLabel.className = 'image-name';
        // Remove file extension for cleaner display
        const displayName = imageName.replace(/\.[^/.]+$/, '');
        nameLabel.textContent = displayName;
        
        imageCard.appendChild(img);
        imageCard.appendChild(nameLabel);
        container.appendChild(imageCard);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadImageList();
    const selectedImages = selectRandomImages(2);
    displayImages(selectedImages);
});
