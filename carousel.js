const IMAGE_LIST_FILE = 'Static/images.txt';
const IMAGE_FOLDER = 'Static/Profile Pics/';

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Load and populate carousel
async function loadCarouselImages() {
    try {
        const response = await fetch(IMAGE_LIST_FILE);
        const text = await response.text();
        const images = text.split('\n')
                          .map(line => line.trim())
                          .filter(line => line.length > 0);
        
        console.log(`✓ Loaded ${images.length} images for carousel`);
        
        // Shuffle images for random order
        const shuffledImages = shuffleArray(images);
        
        // Create carousel
        createCarousel(shuffledImages);
    } catch (error) {
        console.error('✗ Error loading carousel images:', error);
    }
}

function createCarousel(images) {
    const track = document.getElementById('carouselTrack');
    
    if (!track) {
        console.error('Carousel track not found');
        return;
    }
    
    // Create circular list - triple the images for smooth infinite loop
    const allImages = [...images, ...images, ...images];
    
    allImages.forEach(imageName => {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'carousel-item';
        
        const img = document.createElement('img');
        img.src = `${IMAGE_FOLDER}${imageName}`;
        img.alt = imageName;
        img.loading = 'lazy';
        
        img.onerror = () => {
            console.warn(`Failed to load: ${imageName}`);
            imgWrapper.style.display = 'none';
        };
        
        imgWrapper.appendChild(img);
        track.appendChild(imgWrapper);
    });
    
    // Start from random position in the carousel
    const randomOffset = Math.floor(Math.random() * images.length);
    const itemWidth = 80 + 15; // width + gap
    const startPosition = -(randomOffset * itemWidth);
    track.style.transform = `translateX(${startPosition}px)`;
    
    console.log(`✓ Carousel created with ${allImages.length} images, starting at position ${randomOffset}`);
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎠 Initializing image carousel...');
    loadCarouselImages();
});
