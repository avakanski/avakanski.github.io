// Fetch profile data from a JSON file or API
async function fetchProfileData() {
    try {
        const response = await fetch('profile-data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}

// Update the profile information
function updateProfile(data) {
    document.querySelector('.profile-info h2').textContent = data.title;
    document.querySelector('.profile-info p:nth-child(2)').innerHTML = `<a href="${data.departmentLink}">${data.department}</a>`;
    document.querySelector('.profile-info p:nth-child(3)').innerHTML = `<a href="${data.collegeLink}">${data.college}</a>`;
    document.querySelector('.profile-info p:nth-child(4)').innerHTML = `<a href="${data.universityLink}">${data.university}</a>`;
    document.querySelector('.profile-image').src = data.imageUrl;
}

// Update the about section
function updateAbout(data) {
    document.querySelector('.about p').textContent = data.aboutMe;
}

// Update research interests
function updateResearchInterests(data) {
    const ul = document.querySelector('.research-interests ul');
    ul.innerHTML = ''; // Clear existing list items
    data.researchInterests.forEach(interest => {
        const li = document.createElement('li');
        li.textContent = interest;
        ul.appendChild(li);
    });
}

// Initialize the dynamic content
async function initializeDynamicContent() {
    const data = await fetchProfileData();
    if (data) {
        updateProfile(data);
        updateAbout(data);
        updateResearchInterests(data);
    }
}

// Run the initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeDynamicContent);

console.log("Script file loaded");

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');

    // Fetch the navigation data from the JSON file
    fetch('nav-data.json')
        .then(response => response.json())
        .then(data => {
            const navList = document.createElement('ul');
            data.navItems.forEach(item => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = item.url;
                link.textContent = item.text;
                if (window.location.pathname.endsWith(item.url)) {
                    link.classList.add('active');
                }
                listItem.appendChild(link);
                navList.appendChild(listItem);
            });

            navbar.innerHTML = ''; // Clear any existing content
            navbar.appendChild(navList);
        })
        .catch(error => console.error('Error loading navigation data:', error));
});

console.log("End of script file");
