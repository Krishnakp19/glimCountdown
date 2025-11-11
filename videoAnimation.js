(() => {
    const video = document.getElementById('cornerVideoContainer');
    
    // Video dimensions
    const videoWidth = 180;
    const videoHeight = 100;
    
    // Starting position
    let x = 20;
    let y = 20;
    
    // Velocity (speed and direction)
    let velocityX = 2;
    let velocityY = 1.5;
    
    // Animation frame rate
    const FPS = 60;
    
    // Get viewport dimensions
    function getViewportSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    
    // Update position
    function animate() {
        const viewport = getViewportSize();
        
        // Update position
        x += velocityX;
        y += velocityY;
        
        // Check for collision with edges and reverse direction
        if (x + videoWidth >= viewport.width || x <= 0) {
            velocityX = -velocityX;
            x = x <= 0 ? 0 : viewport.width - videoWidth;
        }
        
        if (y + videoHeight >= viewport.height || y <= 0) {
            velocityY = -velocityY;
            y = y <= 0 ? 0 : viewport.height - videoHeight;
        }
        
        // Apply new position
        video.style.left = x + 'px';
        video.style.top = y + 'px';
    }
    
    // Start animation
    setInterval(animate, 1000 / FPS);
    
    // Update on window resize
    window.addEventListener('resize', () => {
        const viewport = getViewportSize();
        // Keep video within bounds after resize
        if (x + videoWidth > viewport.width) x = viewport.width - videoWidth;
        if (y + videoHeight > viewport.height) y = viewport.height - videoHeight;
    });
})();
