document.addEventListener('DOMContentLoaded', function () {

    const mainHeader = document.getElementById('mainHeader');

    if (mainHeader) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                mainHeader.classList.add('shadow-lg');
                mainHeader.classList.remove('shadow-sm');
            } else {
                mainHeader.classList.remove('shadow-lg');
                mainHeader.classList.add('shadow-sm');
            }
        });
    }

});