// ========= WELCOME MODAL =========

// Welcome modal functions
function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.classList.add('hidden');
        // Mark welcome as seen
        fetch('/accounts/mark-welcome-seen/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCsrfToken(),
                'Content-Type': 'application/json',
            },
        });
    }
}

function completeProfile() {
    window.location.href = '/accounts/profile/edit/';
}

function getCsrfToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 10) === 'csrftoken=') {
                cookieValue = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return cookieValue;
}

// Show modal only for new users
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('welcomeModal');
    // Check if modal exists and if user is new (via data attribute)
    if (modal && modal.dataset.showModal === 'true') {
        setTimeout(function() {
            modal.classList.remove('hidden');
        }, 500);
    }
});