// static/js/dropdown.js
document.addEventListener('DOMContentLoaded', function () {

    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationCount = document.getElementById('notificationCount');

    const userBtn = document.getElementById('userDropdownBtn');
    const userMenu = document.getElementById('userDropdownMenu');
    
    let notificationTimeout;
    let userTimeout;

    // Helper function to show dropdown with animation
    function showDropdown(dropdown) {
        dropdown.style.display = 'block';
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(function() {
            dropdown.style.opacity = '1';
            dropdown.style.transform = 'translateY(0)';
        }, 5);
    }

    // Helper function to hide dropdown with animation
    function hideDropdown(dropdown) {
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(function() {
            if (dropdown.style.opacity === '0') {
                dropdown.style.display = 'none';
            }
        }, 200);
    }

    // Initialize dropdown styles
    if (notificationDropdown) {
        notificationDropdown.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        notificationDropdown.style.opacity = '0';
        notificationDropdown.style.transform = 'translateY(-10px)';
    }
    
    if (userMenu) {
        userMenu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        userMenu.style.opacity = '0';
        userMenu.style.transform = 'translateY(-10px)';
    }

    // NOTIFICATION DROPDOWN - HOVER TO OPEN
    if (notificationBtn && notificationDropdown) {
        if (notificationCount) {
            notificationCount.classList.remove('hidden');
            notificationCount.textContent = '3';
        }

        // Show on hover
        notificationBtn.onmouseenter = function(e) {
            clearTimeout(notificationTimeout);
            showDropdown(notificationDropdown);
        };
        
        notificationBtn.onmouseleave = function(e) {
            notificationTimeout = setTimeout(function() {
                if (!notificationDropdown.matches(':hover')) {
                    hideDropdown(notificationDropdown);
                }
            }, 200);
        };
        
        notificationDropdown.onmouseenter = function() {
            clearTimeout(notificationTimeout);
            showDropdown(notificationDropdown);
        };
        
        notificationDropdown.onmouseleave = function() {
            hideDropdown(notificationDropdown);
        };
    }

    // USER DROPDOWN - HOVER TO OPEN
    if (userBtn && userMenu) {
        // Show on hover
        userBtn.onmouseenter = function(e) {
            clearTimeout(userTimeout);
            showDropdown(userMenu);
        };
        
        userBtn.onmouseleave = function() {
            userTimeout = setTimeout(function() {
                if (!userMenu.matches(':hover')) {
                    hideDropdown(userMenu);
                }
            }, 200);
        };
        
        userMenu.onmouseenter = function() {
            clearTimeout(userTimeout);
            showDropdown(userMenu);
        };
        
        userMenu.onmouseleave = function() {
            hideDropdown(userMenu);
        };
    }

});