const BIRTHDAY_FILE = 'Static/birthdays.txt';
const IMAGE_LIST_FILE = 'Static/images.txt';
const IMAGE_FOLDER = 'Static/Profile Pics/';

let ALL_IMAGES = [];
let BIRTHDAY_NAMES = [];

// Load all image filenames
async function loadImageList() {
    try {
        const response = await fetch(IMAGE_LIST_FILE);
        const text = await response.text();
        ALL_IMAGES = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        console.log(`✓ Loaded ${ALL_IMAGES.length} images`);
        return true;
    } catch (error) {
        console.error('✗ Error loading images:', error);
        return false;
    }
}

// Load birthday names (just names, one per line)
async function loadBirthdayNames() {
    try {
        const response = await fetch(BIRTHDAY_FILE);
        if (!response.ok) {
            console.warn('⚠ Birthday file not found');
            return false;
        }
        const text = await response.text();
        BIRTHDAY_NAMES = text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        console.log(`✓ Loaded ${BIRTHDAY_NAMES.length} birthday names`);
        console.log('Names:', BIRTHDAY_NAMES);
        return true;
    } catch (error) {
        console.error('✗ Error loading birthdays:', error);
        return false;
    }
}

// Fuzzy match name to image filename
function findMatchingImage(personName) {
    const searchName = personName.toLowerCase().replace(/\s+/g, ' ').trim();
    
    // Try exact match first
    for (const imageFile of ALL_IMAGES) {
        if (imageFile.toLowerCase().includes(searchName)) {
            console.log(`  ✓ Match: "${personName}" → "${imageFile}"`);
            return imageFile;
        }
    }
    
    // Try matching individual parts
    const nameParts = searchName.split(' ');
    for (const imageFile of ALL_IMAGES) {
        const imageLower = imageFile.toLowerCase();
        if (nameParts.every(part => imageLower.includes(part))) {
            console.log(`  ✓ Partial match: "${personName}" → "${imageFile}"`);
            return imageFile;
        }
    }
    
    console.warn(`  ✗ No match for "${personName}"`);
    return null;
}

// Display birthday photos
function displayBirthdays() {
    const container = document.getElementById('birthday-container');
    
    if (!container) {
        console.error('✗ Birthday container not found!');
        return;
    }
    
    // Hide if no names in file
    if (BIRTHDAY_NAMES.length === 0) {
        console.log('ℹ No names in birthdays.txt - hiding container');
        container.style.display = 'none';
        return;
    }
    
    console.log(`🎂 Displaying ${BIRTHDAY_NAMES.length} birthday photo(s)`);
    
    // Show container
    container.style.display = 'block';
    
    const imagesContainer = document.getElementById('birthday-images');
    imagesContainer.innerHTML = '';
    
    let matchedCount = 0;
    
    BIRTHDAY_NAMES.forEach(personName => {
        const imageFile = findMatchingImage(personName);
        
        if (imageFile) {
            matchedCount++;
            
            const card = document.createElement('div');
            card.className = 'birthday-card';
            
            const img = document.createElement('img');
            img.src = `${IMAGE_FOLDER}${imageFile}`;
            img.alt = personName;
            img.className = 'birthday-image';
            img.onerror = () => {
                console.error(`✗ Failed to load: ${img.src}`);
            };
            
            const name = document.createElement('div');
            name.className = 'birthday-name';
            name.textContent = personName;
            
            const cake = document.createElement('div');
            cake.className = 'cake-icon';
            cake.textContent = '🎂';
            
            card.appendChild(cake);
            card.appendChild(img);
            card.appendChild(name);
            imagesContainer.appendChild(card);
        }
    });
    
    // Hide if no matches found
    if (matchedCount === 0) {
        console.warn('⚠ No matching images found');
        container.style.display = 'none';
    } else {
        console.log(`✓ Successfully displayed ${matchedCount} birthday photo(s)`);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎂 Birthday Display: Starting...');
    
    const imagesLoaded = await loadImageList();
    const namesLoaded = await loadBirthdayNames();
    
    if (imagesLoaded && namesLoaded) {
        displayBirthdays();
    } else {
        console.log('⚠ Birthday display disabled');
    }
});
