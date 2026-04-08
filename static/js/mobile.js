document.addEventListener('DOMContentLoaded', function () {

    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const mobileSearchModal = document.getElementById('mobileSearchModal');
    const closeMobileSearch = document.getElementById('closeMobileSearch');

    // Mobile Menu
    if (mobileBtn && mobileMenu) {
        mobileBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();

            const isOpen = mobileMenu.style.display === 'block';

            if (isOpen) {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = '';
            } else {
                mobileMenu.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        };

        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.onclick = function() {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = '';
            };
        });
    }

    // Mobile Search
    if (mobileSearchBtn && mobileSearchModal) {
        mobileSearchBtn.onclick = function() {
            mobileSearchModal.classList.remove('hidden');

            setTimeout(() => {
                const input = document.getElementById('mobileSearchInput');
                if (input) input.focus();
            }, 100);
        };
    }

    if (closeMobileSearch && mobileSearchModal) {
        closeMobileSearch.onclick = function() {
            mobileSearchModal.classList.add('hidden');
        };

        mobileSearchModal.onclick = function(e) {
            if (e.target === mobileSearchModal) {
                mobileSearchModal.classList.add('hidden');
            }
        };
    }

    // Close mobile menu outside click
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileBtn &&
            mobileMenu.style.display === 'block' &&
            !mobileMenu.contains(e.target) &&
            !mobileBtn.contains(e.target)) {
            mobileMenu.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

});