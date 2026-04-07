// ===== SINGLE SOURCE OF TRUTH - ALL JAVASCRIPT HERE =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
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
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (document.documentElement.classList.contains('dark')) {
                setTheme('light');
            } else {
                setTheme('dark');
            }
        });
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setTheme('dark');
    } else if (savedTheme === 'light') {
        setTheme('light');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    }
    
    // ===== NOTIFICATION DROPDOWN =====
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationCount = document.getElementById('notificationCount');
    
    if (notificationBtn && notificationDropdown) {
        if (notificationCount) {
            notificationCount.classList.remove('hidden');
            notificationCount.textContent = '3';
        }
        
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('hidden');
        });
    }
    
    // ===== USER DROPDOWN =====
    const userBtn = document.getElementById('userDropdownBtn');
    const userMenu = document.getElementById('userDropdownMenu');
    
    if (userBtn && userMenu) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('hidden');
        });
    }
    
    
    
    // ===== MOBILE SEARCH =====
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const mobileSearchModal = document.getElementById('mobileSearchModal');
    const closeMobileSearch = document.getElementById('closeMobileSearch');
    
    if (mobileSearchBtn && mobileSearchModal) {
        mobileSearchBtn.addEventListener('click', () => {
            mobileSearchModal.classList.remove('hidden');
            setTimeout(() => {
                const input = document.getElementById('mobileSearchInput');
                if (input) input.focus();
            }, 100);
        });
    }
    
    if (closeMobileSearch && mobileSearchModal) {
        closeMobileSearch.addEventListener('click', () => {
            mobileSearchModal.classList.add('hidden');
        });
        
        mobileSearchModal.addEventListener('click', (e) => {
            if (e.target === mobileSearchModal) {
                mobileSearchModal.classList.add('hidden');
            }
        });
    }
    
    // ===== CLOSE DROPDOWNS WHEN CLICKING OUTSIDE =====
    document.addEventListener('click', function(e) {
        if (userMenu && !userMenu.contains(e.target) && userBtn && !userBtn.contains(e.target)) {
            userMenu.classList.add('hidden');
        }
        if (notificationDropdown && notificationBtn && !notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationDropdown.classList.add('hidden');
        }
        if (mobileMenu && mobileBtn && mobileMenu.style.display === 'block') {
            if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
    });
    
    // ===== SCROLL EFFECT =====
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg');
                header.classList.remove('shadow-sm');
            } else {
                header.classList.remove('shadow-lg');
                header.classList.add('shadow-sm');
            }
        });
    }
    
    // ===== SEARCH SUGGESTIONS =====
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('searchSuggestions');
    let suggestionTimeout;
    
    if (searchInput && suggestionsContainer) {
        searchInput.addEventListener('input', function() {
            clearTimeout(suggestionTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                suggestionsContainer.classList.add('hidden');
                return;
            }
            
            suggestionTimeout = setTimeout(() => {
                const mockSuggestions = [
                    { name: query + ' developers', type: 'members', url: '/members/?q=' + encodeURIComponent(query) },
                    { name: query + ' projects', type: 'projects', url: '/projects/?q=' + encodeURIComponent(query) },
                    { name: query + ' jobs', type: 'jobs', url: '/jobs/?q=' + encodeURIComponent(query) },
                ];
                
                suggestionsContainer.innerHTML = mockSuggestions.map(item => `
                    <a href="${item.url}" class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div class="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs">
                            ${item.type === 'members' ? '👥' : item.type === 'projects' ? '📁' : '💼'}
                        </div>
                        <div>
                            <div class="text-sm font-medium text-gray-900 dark:text-white">${item.name}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400 capitalize">${item.type}</div>
                        </div>
                    </a>
                `).join('');
                suggestionsContainer.classList.remove('hidden');
            }, 300);
        });
        
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                suggestionsContainer.classList.add('hidden');
            }
        });
    }
    
    // Keyboard shortcut
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });
});