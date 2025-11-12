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

// Load and populate carousel (optimized)
async function loadCarouselImages() {
    try {
        const response = await fetch(IMAGE_LIST_FILE, {
            cache: 'force-cache' // Use browser cache
        });
        
        if (!response.ok) {
            throw new Error('Failed to load images');
        }
        
        const text = await response.text();
        const images = text.split('\n')
                          .map(line => line.trim())
                          .filter(line => line.length > 0);
        
        console.log(`✓ Loaded ${images.length} images`);
        
        // Shuffle for random order
        const shuffledImages = shuffleArray(images);
        
        // Create carousel
        createCarousel(shuffledImages);
        
    } catch (error) {
        console.error('✗ Error loading carousel:', error);
        // Hide carousel on error
        const container = document.querySelector('.carousel-container');
        if (container) container.style.display = 'none';
    }
}

function createCarousel(images) {
    const track = document.getElementById('carouselTrack');
    
    if (!track) {
        console.error('Carousel track not found');
        return;
    }
    
    // Only duplicate twice (not 3x or 5x) - reduces DOM nodes by 40-60%
    const allImages = [...images, ...images];
    
    // Use DocumentFragment for batch DOM insertion (much faster)
    const fragment = document.createDocumentFragment();
    
    // Create all elements at once
    allImages.forEach((imageName, index) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'carousel-item';
        
        const img = new Image(); // Better performance than createElement('img')
        img.src = `${IMAGE_FOLDER}${imageName}`;
        img.alt = imageName.split('.')[0]; // Remove extension
        img.loading = 'lazy'; // Native lazy loading
        img.decoding = 'async'; // Async decoding - prevents blocking
        
        // Silent error handling
        img.onerror = () => imgWrapper.remove();
        
        imgWrapper.appendChild(img);
        fragment.appendChild(imgWrapper);
    });
    
    // Single DOM insertion (much faster than multiple appendChild)
    track.appendChild(fragment);
    
    // Calculate dynamic animation duration based on image count
    const itemWidth = 95; // 80px + 15px gap
    const totalWidth = images.length * itemWidth;
    const duration = Math.max(40, totalWidth / 25); // Adjusted for smooth speed
    
    // Set CSS custom properties (no JavaScript animation needed)
    track.style.setProperty('--carousel-duration', `${duration}s`);
    
    // Random start position
    const randomOffset = Math.floor(Math.random() * images.length);
    const startPosition = -(randomOffset * itemWidth);
    track.style.setProperty('--carousel-start', `${startPosition}px`);
    
    // Trigger CSS animation after paint (prevents layout thrashing)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            track.classList.add('carousel-animate');
        });
    });
    
    console.log(`✓ Carousel: ${allImages.length} items (${images.length} unique) - ${duration}s duration`);
}

// Initialize - check if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCarouselImages);
} else {
    // DOM already loaded
    loadCarouselImages();
}
