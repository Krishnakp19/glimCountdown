window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('backgroundAudio');
    const musicBtn = document.getElementById('musicToggleBtn');
    
    // Start muted
    audio.muted = true;
    audio.volume = 0.7; // Set volume to 70%
    
    if (musicBtn) {
        // Set initial icon to muted
        musicBtn.textContent = '🔇 Muted';
        
        musicBtn.addEventListener('click', () => {
            if (audio.paused) {
                // Play and unmute
                audio.muted = false;
                audio.play().then(() => {
                    musicBtn.textContent = '🔊 Music';
                }).catch(error => {
                    console.error('Error playing audio:', error);
                    musicBtn.textContent = '🔇 Click to Play';
                });
            } else {
                // Toggle mute/unmute
                audio.muted = !audio.muted;
                if (audio.muted) {
                    musicBtn.textContent = '🔇 Muted';
                } else {
                    musicBtn.textContent = '🔊 Music';
                }
            }
        });
        
        // Auto-start audio (muted) to enable later unmuting
        audio.play().catch(() => {
            console.log('Autoplay prevented, waiting for user interaction');
        });
    }
});
