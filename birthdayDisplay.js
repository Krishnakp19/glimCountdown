const BIRTHDAY_FILE = 'Static/birthdays.txt';
const IMAGE_LIST_FILE = 'Static/images.txt';
const IMAGE_FOLDER = 'Static/Profile Pics/';

let ALL_IMAGES = [];
let BIRTHDAY_DATA = [];

function getTodayDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${month}-${day}`;
}

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

async function loadBirthdays() {
    try {
        const response = await fetch(BIRTHDAY_FILE);
        if (!response.ok) {
            console.warn('⚠ Birthday file not found');
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
        console.log(`✓ Loaded ${BIRTHDAY_DATA.length} birthdays`);
        return true;
    } catch (error) {
        console.error('✗ Error loading birthdays:', error);
        return false;
    }
}

function findMatchingImage(personName) {
    const searchName = personName.toLowerCase().replace(/\s+/g, ' ').trim();
    
    for (const imageFile of ALL_IMAGES) {
        if (imageFile.toLowerCase().includes(searchName)) {
            console.log(`  ✓ Match: "${personName}" → "${imageFile}"`);
            return imageFile;
        }
    }
    
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

function getTodaysBirthdays() {
    const today = getTodayDate();
    console.log(`📅 Today: ${today}`);
    return BIRTHDAY_DATA.filter(entry => entry.date === today);
}

function displayBirthdays(birthdayPeople) {
    const container = document.getElementById('birthday-container');
    
    if (!container) {
        console.error('✗ Birthday container not found!');
        return;
    }
    
    if (birthdayPeople.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    const imagesContainer = document.getElementById('birthday-images');
    imagesContainer.innerHTML = '';
    
    let matchedCount = 0;
    
    birthdayPeople.forEach(person => {
        const imageFile = findMatchingImage(person.name);
        
        if (imageFile) {
            matchedCount++;
            const card = document.createElement('div');
            card.className = 'birthday-card';
            
            const img = document.createElement('img');
            img.src = `${IMAGE_FOLDER}${imageFile}`;
            img.alt = person.name;
            img.className = 'birthday-image';
            
            const name = document.createElement('div');
            name.className = 'birthday-name';
            name.textContent = person.name;
            
            const cake = document.createElement('div');
            cake.className = 'cake-icon';
            cake.textContent = '🎂';
            
            card.appendChild(cake);
            card.appendChild(img);
            card.appendChild(name);
            imagesContainer.appendChild(card);
        }
    });
    
    if (matchedCount === 0) {
        container.style.display = 'none';
    } else {
        console.log(`✓ Displayed ${matchedCount} birthday(s)`);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎂 Birthday Display: Starting...');
    const imagesLoaded = await loadImageList();
    const birthdaysLoaded = await loadBirthdays();
    
    if (imagesLoaded && birthdaysLoaded) {
        const todaysBirthdays = getTodaysBirthdays();
        displayBirthdays(todaysBirthdays);
    }
});
