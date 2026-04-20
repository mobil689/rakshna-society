document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const terminalWindow = document.querySelector('.terminal-window');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('terminalTheme');
    if (savedTheme === 'dark') {
        terminalWindow.classList.remove('light-mode');
        updateToggleBtn(false);
    } else {
        terminalWindow.classList.add('light-mode');
        updateToggleBtn(true);
    }

    themeToggle.addEventListener('click', () => {
        const isLight = terminalWindow.classList.toggle('light-mode');
        localStorage.setItem('terminalTheme', isLight ? 'light' : 'dark');
        updateToggleBtn(isLight);
    });

    function updateToggleBtn(isLight) {
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        
        if (isLight) {
            icon.className = 'fa-solid fa-moon';
            text.textContent = 'Dark Mode';
        } else {
            icon.className = 'fa-solid fa-sun';
            text.textContent = 'Light Mode';
        }
    }

    // Flip Card Logic
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Dropdown Logic
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const dropdown = trigger.closest('.team-dropdown');
            dropdown.classList.toggle('active');
            
            // Update text if needed (optional)
            const span = trigger.querySelector('span');
            if (dropdown.classList.contains('active')) {
                span.textContent = span.textContent.replace('More', 'Fewer');
            } else {
                span.textContent = span.textContent.replace('Fewer', 'More');
            }
        });
    });
});

