const IMAGE_LIST_FILE = 'Static/images.txt';
const IMAGE_FOLDER = 'Static/Profile Pics/';

// Load and populate carousel
async function loadCarouselImages() {
    try {
        const response = await fetch(IMAGE_LIST_FILE);
        const text = await response.text();
        const images = text.split('\n')
                          .map(line => line.trim())
                          .filter(line => line.length > 0);
        
        console.log(`✓ Loaded ${images.length} images for carousel`);
        
        // Create carousel
        createCarousel(images);
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
    
    // Duplicate images for seamless loop
    const allImages = [...images, ...images];
    
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
    
    console.log(`✓ Carousel created with ${allImages.length} images`);
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎠 Initializing image carousel...');
    loadCarouselImages();
});
