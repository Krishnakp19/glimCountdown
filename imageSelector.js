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

// Select random images
function selectRandomImages(count = 2) {
    const shuffled = [...ALL_IMAGES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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
