// static/js/search.js
(function() {
    function initSearch() {
        const searchInput = document.getElementById('searchInput');
        const suggestionsContainer = document.getElementById('searchSuggestions');
        let suggestionTimeout;

        if (searchInput && suggestionsContainer) {
            searchInput.oninput = function() {
                clearTimeout(suggestionTimeout);
                const query = this.value.trim();

                if (query.length < 2) {
                    suggestionsContainer.classList.add('hidden');
                    return;
                }

                suggestionTimeout = setTimeout(function() {
                    const mockSuggestions = [
                        { name: query + ' developers', type: 'members', url: '/members/?q=' + encodeURIComponent(query) },
                        { name: query + ' projects', type: 'projects', url: '/projects/?q=' + encodeURIComponent(query) },
                        { name: query + ' jobs', type: 'jobs', url: '/jobs/?q=' + encodeURIComponent(query) },
                    ];

                    let html = '';
                    for (let i = 0; i < mockSuggestions.length; i++) {
                        html += '<a href="' + mockSuggestions[i].url + '" class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">';
                        html += '<div class="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs">';
                        html += (mockSuggestions[i].type === 'members' ? '👥' : (mockSuggestions[i].type === 'projects' ? '📁' : '💼'));
                        html += '</div><div><div class="text-sm font-medium text-gray-900 dark:text-white">' + mockSuggestions[i].name + '</div>';
                        html += '<div class="text-xs text-gray-500 dark:text-gray-400 capitalize">' + mockSuggestions[i].type + '</div></div></a>';
                    }
                    suggestionsContainer.innerHTML = html;
                    suggestionsContainer.classList.remove('hidden');
                }, 300);
            };

            document.onclick = function(e) {
                if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                    suggestionsContainer.classList.add('hidden');
                }
            };
        }

        // Keyboard shortcut (Ctrl+K)
        document.onkeydown = function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
})();