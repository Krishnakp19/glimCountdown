(() => {
    const video = document.getElementById('cornerVideoContainer');
    
    // Video dimensions - PORTRAIT (taller than wide)
    const videoWidth = 120;
    const videoHeight = 180;
    
    // Get viewport dimensions
    function getViewportSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    
    // Random starting position
    const viewport = getViewportSize();
    let x = Math.floor(Math.random() * (viewport.width - videoWidth));
    let y = Math.floor(Math.random() * (viewport.height - videoHeight));
    
    // Random velocity direction (but consistent speed)
    const speed = 2;
    const angle = Math.random() * Math.PI * 2; // Random angle
    let velocityX = Math.cos(angle) * speed;
    let velocityY = Math.sin(angle) * speed;
    
    console.log(`🎬 Video starting at position (${Math.floor(x)}, ${Math.floor(y)}) with velocity (${velocityX.toFixed(2)}, ${velocityY.toFixed(2)})`);
    
    // Animation frame rate
    const FPS = 60;
    
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
