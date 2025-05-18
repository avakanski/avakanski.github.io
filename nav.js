async function fetchNavData() {
    try {
        const response = await fetch('../nav-data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching navigation data:', error);
    }
}

function updateNavigation(navItems) {
    const nav = document.getElementById('main-nav');
    const ul = document.createElement('ul');
    
    const currentPath = window.location.pathname;
    const isRoot = currentPath === '/' || currentPath.endsWith('index.html');
    const isSubPage = currentPath.includes('/Blog_Topics/') || currentPath.includes('/Research_Topics/') || currentPath.includes('/Courses/');
    const isRootLevelPage = !isRoot && !isSubPage;

    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        if (isRoot || isRootLevelPage) {
            a.href = item.url;
        } else if (isSubPage) {
            a.href = '../' + item.url;
        }
        a.textContent = item.text;
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
}

async function initializeNavigation() {
    const data = await fetchNavData();
    if (data) {
        updateNavigation(data.navItems);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const navElement = document.getElementById('main-nav');

    const navItems = [
        { text: 'Home', url: 'index.html' },
        { text: 'Teaching', url: 'teaching.html' },
        { text: 'Research', url: 'research.html' },
        { text: 'Publications', url: 'publications.html' },       
        { text: 'Curriculum Vitae', url: 'curriculum_vitae.html' },
        { text: 'Blog', url: 'blog.html' },
        { text: 'Codes & Data', url: 'codes_data.html' },
        { text: 'Contact', url: 'contact.html' }
    ];

    if (navElement) {
        updateNavigation(navItems);
    } else {
        console.error('Navigation element not found');
    }
});
