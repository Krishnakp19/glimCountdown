const BIRTHDAY_FILE = 'Static/birthdays.txt';
const IMAGE_LIST_FILE = 'Static/images.txt';
const IMAGE_FOLDER = 'Static/Profile Pics/';

let ALL_IMAGES = [];
let BIRTHDAY_DATA = [];

// Get today's date in MM-DD format
function getTodayDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${month}-${day}`;
}

// Load all image filenames
async function loadImageList() {
    try {
        const response = await fetch(IMAGE_LIST_FILE);
        const text = await response.text();
        ALL_IMAGES = text.split('\n')
                         .map(line => line.trim())
                         .filter(line => line.length > 0);
        console.log(`✓ Loaded ${ALL_IMAGES.length} images for birthday matching`);
        return true;
    } catch (error) {
        console.error('✗ Error loading images:', error);
        return false;
    }
}

// Load birthday data
async function loadBirthdays() {
    try {
        const response = await fetch(BIRTHDAY_FILE);
        if (!response.ok) {
            console.warn('⚠ Birthday file not found or empty. Create Static/birthdays.txt');
            return false;
        }
        
        const text = await response.text();
        
        BIRTHDAY_DATA = text.split('\n')
                            .map(line => line.trim())
                            .filter(line => line.length > 0 && line.includes(','))
                            .map(line => {
                                const [date, name] = line.split(',');
                                return { date: date.trim(), name: name.trim() };
                            });
        
        console.log(`✓ Loaded ${BIRTHDAY_DATA.length} birthday entries`);
        console.log('Birthday ', BIRTHDAY_DATA);
        return true;
    } catch (error) {
        console.error('✗ Error loading birthdays:', error);
        return false;
    }
}

// Fuzzy match name to image filename (case-insensitive partial match)
function findMatchingImage(personName) {
    const searchName = personName.toLowerCase().replace(/\s+/g, ' ').trim();
    
    console.log(`🔍 Searching for: "${personName}" (normalized: "${searchName}")`);
    
    // Try exact match first
    for (const imageFile of ALL_IMAGES) {
        if (imageFile.toLowerCase().includes(searchName)) {
            console.log(`  ✓ Exact match found: "${imageFile}"`);
            return imageFile;
        }
    }
    
    // Try matching individual parts of the name
    const nameParts = searchName.split(' ');
    for (const imageFile of ALL_IMAGES) {
        const imageNameLower = imageFile.toLowerCase();
        const allPartsMatch = nameParts.every(part => imageNameLower.includes(part));
        
        if (allPartsMatch) {
            console.log(`  ✓ Partial match found: "${imageFile}"`);
            return imageFile;
        }
    }
    
    console.warn(`  ✗ No match found for "${personName}"`);
    return null;
}

// Get today's birthday people
function getTodaysBirthdays() {
    const today = getTodayDate();
    console.log(`📅 Today's date: ${today}`);
    
    const birthdays = BIRTHDAY_DATA.filter(entry => entry.date === today);
    console.log(`🎂 Found ${birthdays.length} birthday(s) today:`, birthdays);
    
    return birthdays;
}

// Display birthday celebrants
function displayBirthdays(birthdayPeople) {
    const container = document.getElementById('birthday-container');
    
    if (!container) {
        console.error('✗ Birthday container element not found in HTML!');
        return;
    }
    
    // Hide container if no birthdays today
    if (birthdayPeople.length === 0) {
        console.log('ℹ No birthdays today - hiding container');
        container.style.display = 'none';
        return;
    }
    
    console.log(`🎉 Displaying ${birthdayPeople.length} birthday celebrant(s)`);
    
    // Show container
    container.style.display = 'block';
    
    const imagesContainer = document.getElementById('birthday-images');
    imagesContainer.innerHTML = '';
    
    let matchedCount = 0;
    
    birthdayPeople.forEach(person => {
        const imageFile = findMatchingImage(person.name);
        
        if (imageFile) {
            matchedCount++;
            
            const birthdayCard = document.createElement('div');
            birthdayCard.className = 'birthday-card';
            
            const img = document.createElement('img');
            img.src = `${IMAGE_FOLDER}${imageFile}`;
            img.alt = person.name;
            img.className = 'birthday-image';
            img.onerror = () => {
                console.error(`✗ Failed to load image: ${img.src}`);
            };
            
            const nameLabel = document.createElement('div');
            nameLabel.className = 'birthday-name';
            nameLabel.textContent = person.name;
            
            const cakeIcon = document.createElement('div');
            cakeIcon.className = 'cake-icon';
            cakeIcon.textContent = '🎂';
            
            birthdayCard.appendChild(cakeIcon);
            birthdayCard.appendChild(img);
            birthdayCard.appendChild(nameLabel);
            imagesContainer.appendChild(birthdayCard);
        }
    });
    
    // If no matches found, hide container
    if (matchedCount === 0) {
        console.warn('⚠ No matching images found for today\'s birthdays');
        container.style.display = 'none';
    } else {
        console.log(`✓ Successfully displayed ${matchedCount} birthday photo(s)`);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎂 Birthday Display: Initializing...');
    
    const imagesLoaded = await loadImageList();
    const birthdaysLoaded = await loadBirthdays();
    
    if (!imagesLoaded || !birthdaysLoaded) {
        console.log('⚠ Birthday display disabled due to loading errors');
        return;
    }
    
    const todaysBirthdays = getTodaysBirthdays();
    displayBirthdays(todaysBirthdays);
});
