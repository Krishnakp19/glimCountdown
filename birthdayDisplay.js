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
        console.log(`Loaded ${ALL_IMAGES.length} images`);
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

// Load birthday data
async function loadBirthdays() {
    try {
        const response = await fetch(BIRTHDAY_FILE);
        const text = await response.text();
        
        BIRTHDAY_DATA = text.split('\n')
                            .map(line => line.trim())
                            .filter(line => line.length > 0)
                            .map(line => {
                                const [date, name] = line.split(',');
                                return { date: date.trim(), name: name.trim() };
                            });
        
        console.log(`Loaded ${BIRTHDAY_DATA.length} birthday entries`);
    } catch (error) {
        console.error('Error loading birthdays:', error);
        BIRTHDAY_DATA = [];
    }
}

// Fuzzy match name to image filename (case-insensitive partial match)
function findMatchingImage(personName) {
    const searchName = personName.toLowerCase().replace(/\s+/g, ' ');
    
    // Try to find image filename that contains the person's name
    for (const imageFile of ALL_IMAGES) {
        const imageNamePart = imageFile.toLowerCase();
        
        // Check if all parts of the person's name appear in the filename
        const nameParts = searchName.split(' ');
        const allPartsMatch = nameParts.every(part => imageNamePart.includes(part));
        
        if (allPartsMatch) {
            console.log(`Matched "${personName}" to "${imageFile}"`);
            return imageFile;
        }
    }
    
    console.log(`No match found for "${personName}"`);
    return null;
}

// Get today's birthday people
function getTodaysBirthdays() {
    const today = getTodayDate();
    return BIRTHDAY_DATA.filter(entry => entry.date === today);
}

// Display birthday celebrants
function displayBirthdays(birthdayPeople) {
    const container = document.getElementById('birthday-container');
    
    // Hide container if no birthdays today
    if (birthdayPeople.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    // Show container
    container.style.display = 'block';
    
    const imagesContainer = document.getElementById('birthday-images');
    imagesContainer.innerHTML = '';
    
    birthdayPeople.forEach(person => {
        const imageFile = findMatchingImage(person.name);
        
        if (imageFile) {
            const birthdayCard = document.createElement('div');
            birthdayCard.className = 'birthday-card';
            
            const img = document.createElement('img');
            img.src = `${IMAGE_FOLDER}${imageFile}`;
            img.alt = person.name;
            img.className = 'birthday-image';
            
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
    if (imagesContainer.children.length === 0) {
        container.style.display = 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadImageList();
    await loadBirthdays();
    
    const todaysBirthdays = getTodaysBirthdays();
    console.log(`Birthdays today: ${todaysBirthdays.length}`);
    
    displayBirthdays(todaysBirthdays);
});
