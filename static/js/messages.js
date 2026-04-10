// ========= AUTO-DISMISS MESSAGES =========

document.addEventListener('DOMContentLoaded', function() {
    // Auto-dismiss success and info messages after 5 seconds
    const messages = document.querySelectorAll('.messages-fade-in');
    
    messages.forEach(message => {
        // Check if it's a success or info message (not error)
        const isSuccess = message.classList.contains('bg-green-500/20');
        const isInfo = message.classList.contains('bg-blue-500/20');
        const isPersistent = message.classList.contains('persistent');
        
        // Add close button to each message
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.className = 'message-close ml-auto text-gray-400 hover:text-white transition ml-3';
        closeBtn.style.fontSize = '12px';
        closeBtn.style.background = 'transparent';
        closeBtn.style.border = 'none';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.padding = '4px 8px';
        closeBtn.style.borderRadius = '4px';
        
        closeBtn.onclick = function(e) {
            e.preventDefault();
            message.style.opacity = '0';
            message.style.transform = 'translateY(-10px)';
            message.style.transition = 'all 0.3s ease';
            setTimeout(function() {
                if (message && message.parentElement) {
                    message.remove();
                }
            }, 300);
        };
        
        // Style the message container
        message.style.display = 'flex';
        message.style.alignItems = 'center';
        message.style.justifyContent = 'space-between';
        message.style.flexWrap = 'wrap';
        message.style.gap = '8px';
        
        // Add close button if not already present
        if (!message.querySelector('.message-close')) {
            message.appendChild(closeBtn);
        }
        
        // Auto-dismiss non-persistent messages after 5 seconds
        if ((isSuccess || isInfo) && !isPersistent) {
            setTimeout(function() {
                if (message && message.parentElement) {
                    message.style.opacity = '0';
                    message.style.transform = 'translateY(-10px)';
                    setTimeout(function() {
                        if (message && message.parentElement) {
                            message.remove();
                        }
                    }, 300);
                }
            }, 5000);
        }
    });
    
    // Also watch for dynamically added messages (for AJAX requests)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('messages-fade-in')) {
                        // Handle new message
                        const isSuccess = node.classList.contains('bg-green-500/20');
                        const isInfo = node.classList.contains('bg-blue-500/20');
                        const isPersistent = node.classList.contains('persistent');
                        
                        // Add close button
                        const closeBtn = document.createElement('button');
                        closeBtn.innerHTML = '✕';
                        closeBtn.className = 'message-close ml-auto text-gray-400 hover:text-white transition ml-3';
                        closeBtn.style.fontSize = '12px';
                        closeBtn.style.background = 'transparent';
                        closeBtn.style.border = 'none';
                        closeBtn.style.cursor = 'pointer';
                        closeBtn.style.padding = '4px 8px';
                        closeBtn.style.borderRadius = '4px';
                        
                        closeBtn.onclick = function(e) {
                            e.preventDefault();
                            node.style.opacity = '0';
                            node.style.transform = 'translateY(-10px)';
                            setTimeout(function() {
                                if (node && node.parentElement) {
                                    node.remove();
                                }
                            }, 300);
                        };
                        
                        node.style.display = 'flex';
                        node.style.alignItems = 'center';
                        node.style.justifyContent = 'space-between';
                        node.style.flexWrap = 'wrap';
                        node.style.gap = '8px';
                        
                        if (!node.querySelector('.message-close')) {
                            node.appendChild(closeBtn);
                        }
                        
                        // Auto-dismiss
                        if ((isSuccess || isInfo) && !isPersistent) {
                            setTimeout(function() {
                                if (node && node.parentElement) {
                                    node.style.opacity = '0';
                                    node.style.transform = 'translateY(-10px)';
                                    setTimeout(function() {
                                        if (node && node.parentElement) {
                                            node.remove();
                                        }
                                    }, 300);
                                }
                            }, 5000);
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
});