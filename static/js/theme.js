// static/js/theme.js
(function() {
    // Function to initialize theme toggle
    function initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');

        // If element not found, try again after a short delay
        if (!themeToggle) {
            console.log('Theme toggle not found, retrying...');
            setTimeout(initTheme, 100);
            return;
        }

        console.log('Theme toggle found, initializing...');

        function setTheme(theme) {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                if (themeIcon) themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                if (themeIcon) themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        }

        // Remove any existing listeners
        themeToggle.onclick = null;
        
        // Add click handler
        themeToggle.onclick = function(e) {
            e.preventDefault();
            const isDark = document.documentElement.classList.contains('dark');
            if (isDark) {
                setTheme('light');
            } else {
                setTheme('dark');
            }
        };

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setTheme('dark');
        } else if (savedTheme === 'light') {
            setTheme('light');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();