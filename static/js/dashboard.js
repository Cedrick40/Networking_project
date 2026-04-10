// ========= DASHBOARD MAIN =========
(function() {
    
    // Scroll to post input
    function scrollToPostInput() {
        const postInput = document.getElementById('postInput');
        if (postInput) {
            postInput.focus();
            postInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Focus post input on helper button click
    function initPostHelperButtons() {
        const helperButtons = document.querySelectorAll('.focus-post-input');
        helperButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const postInput = document.getElementById('postInput');
                if (postInput) {
                    postInput.focus();
                }
            });
        });
    }
    
    // Create Post button
    function initCreatePostButton() {
        const createPostBtn = document.getElementById('createPostBtn');
        if (createPostBtn) {
            createPostBtn.addEventListener('click', scrollToPostInput);
        }
    }
    
    // Skill tag hover effects
    function initSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Stat card hover effects
    function initStatCards() {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Set progress bar width
    function initProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar && progressBar.dataset.completion) {
            progressBar.style.width = progressBar.dataset.completion + '%';
        }
    }
    
    // ========= POST ACTIONS (Dashboard Feed) =========
    
    // Like Post (using dashboard's like function)
    function initLikeButtons() {
        const likeButtons = document.querySelectorAll('.like-post-btn');
        likeButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const postId = this.dataset.postId;
                likePost(postId);
            });
        });
    }
    
    // Toggle Comments
    function initCommentButtons() {
        const toggleButtons = document.querySelectorAll('.toggle-comments-btn');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const postId = this.dataset.postId;
                const commentsSection = document.getElementById(`comments-section-${postId}`);
                if (commentsSection) {
                    commentsSection.classList.toggle('hidden');
                }
            });
        });
    }
    
    // Edit Post
    function initEditButtons() {
        const editButtons = document.querySelectorAll('.edit-post-btn');
        editButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const postId = this.dataset.postId;
                window.location.href = `/feed/${postId}/edit/`;
            });
        });
    }
    
    // Delete Post
    function initDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete-post-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const postId = this.dataset.postId;
                if (confirm('Are you sure you want to delete this post?')) {
                    deletePost(postId);
                }
            });
        });
    }
    
    // Post menu dropdown (three dots)
    function initPostMenus() {
        const menuButtons = document.querySelectorAll('.post-menu-btn');
        menuButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const postId = btn.dataset.postId;
                const menu = document.getElementById(`post-menu-${postId}`);
                // Close all other menus
                document.querySelectorAll('[id^="post-menu-"]').forEach(m => {
                    if (m.id !== `post-menu-${postId}`) {
                        m.classList.add('hidden');
                    }
                });
                if (menu) {
                    menu.classList.toggle('hidden');
                }
            });
        });
        
        // Close menus when clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('[id^="post-menu-"]').forEach(menu => {
                menu.classList.add('hidden');
            });
        });
    }
    
    // ========= HELPER FUNCTIONS =========
    
    // Like post function
    function likePost(postId) {
        const csrftoken = getCookie('csrftoken');
        
        fetch(`/feed/${postId}/like/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        })
        .then(response => response.json())
        .then(data => {
            const likesSpan = document.querySelector(`.likes-count[data-post-id="${postId}"]`);
            if (likesSpan) {
                likesSpan.textContent = data.count;
                likesSpan.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    likesSpan.style.transform = 'scale(1)';
                }, 200);
            }
        })
        .catch(error => console.error('Error:', error));
    }
    
    // Delete post function
    function deletePost(postId) {
        const csrftoken = getCookie('csrftoken');
        
        fetch(`/feed/${postId}/delete/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const postElement = document.querySelector(`.feed-item[data-post-id="${postId}"]`);
                if (postElement) {
                    postElement.remove();
                }
                showToast('Post deleted successfully!', 'success');
            } else {
                showToast(data.error || 'Failed to delete post', 'error');
            }
        })
        .catch(error => console.error('Error:', error));
    }
    
    // Show toast notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white text-sm z-50 animate-fade-in ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    // Get CSRF token from cookies
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
    
    // ========= INITIALIZE EVERYTHING =========
    
    function initDashboard() {
        initPostHelperButtons();
        initCreatePostButton();
        initSkillTags();
        initStatCards();
        initPostMenus();
        initLikeButtons();
        initCommentButtons();
        initEditButtons();
        initDeleteButtons();
        initProgressBar();
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDashboard);
    } else {
        initDashboard();
    }
})();