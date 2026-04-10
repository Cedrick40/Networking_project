// ========= FEED PAGE JAVASCRIPT =========

document.addEventListener('DOMContentLoaded', function() {
    console.log('Feed page loaded');
    
    // Get all like buttons
    const likeButtons = document.querySelectorAll('.like-button');
    console.log('Found like buttons:', likeButtons.length);
    
    // Add click event to each like button
    likeButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const postId = this.getAttribute('data-post-id');
            console.log('Like button clicked for post:', postId);
            likePost(postId);
        });
    });
});

// Like post function
function likePost(postId) {
    console.log('Liking post:', postId);
    
    // Get CSRF token
    const csrftoken = getCookie('csrftoken');
    
    fetch('/feed/' + postId + '/like/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const likesSpan = document.querySelector('.likes-count[data-post-id="' + postId + '"]');
        if (likesSpan) {
            likesSpan.textContent = data.count;
            // Add animation
            likesSpan.style.transform = 'scale(1.2)';
            setTimeout(function() {
                likesSpan.style.transform = 'scale(1)';
            }, 200);
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}

// Helper function to get cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}