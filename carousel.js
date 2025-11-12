const IMAGE_LIST_FILE = 'Static/images.txt';
const IMAGE_FOLDER = 'Static/Profile Pics/';

// Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Load carousel images
async function loadCarouselImages() {
    try {
        const response = await fetch(IMAGE_LIST_FILE);
        
        if (!response.ok) {
            throw new Error('Failed to load images');
        }
        
        const text = await response.text();
        let images = text.split('\n')
                        .map(line => line.trim())
                        .filter(line => line.length > 0);
        
        console.log(`✓ Loaded ${images.length} images`);
        
        // Limit to 30 images for better performance (randomly selected)
        const shuffledImages = shuffleArray(images);
        const limitedImages = shuffledImages.slice(0, 30);
        
        console.log(`✓ Using ${limitedImages.length} images for performance`);
        
        // Create carousel
        createCarousel(limitedImages);
        
    } catch (error) {
        console.error('✗ Error loading carousel:', error);
        document.querySelector('.carousel-container').style.display = 'none';
    }
}

function createCarousel(images) {
    const track = document.getElementById('carouselTrack');
    
    if (!track) {
        console.error('Carousel track not found');
        return;
    }
    
    // Duplicate images twice for seamless loop
    const allImages = [...images, ...images];
    
    // Use DocumentFragment
    const fragment = document.createDocumentFragment();
    
    allImages.forEach((imageName) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'carousel-item';
        
        const img = new Image();
        img.src = `${IMAGE_FOLDER}${imageName}`;
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        
        img.onerror = () => imgWrapper.remove();
        
        imgWrapper.appendChild(img);
        fragment.appendChild(imgWrapper);
    });
    
    track.appendChild(fragment);
    
    // Calculate duration - FASTER SPEED
    const itemWidth = 95; // 80px + 15px gap
    const totalWidth = images.length * itemWidth;
    const duration = Math.max(20, totalWidth / 40); // CHANGED: Divide by 40 instead of 20 = 2x faster
    
    console.log(`✓ Animation duration: ${duration}s for ${images.length} images`);
    
    // Set CSS variables
    track.style.setProperty('--carousel-duration', `${duration}s`);
    
    // Random start position
    const randomStart = Math.floor(Math.random() * images.length);
    track.style.setProperty('--carousel-start', `${-(randomStart * itemWidth)}px`);
    
    // Force animation start with delay
    setTimeout(() => {
        track.classList.add('carousel-animate');
        console.log('✓ Carousel animation started');
    }, 100);
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCarouselImages);
} else {
    loadCarouselImages();
}
