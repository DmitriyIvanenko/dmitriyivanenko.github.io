(function() {
    'use strict';

    var vectorIds = ['vector2', 'vector3', 'vector4', 'vector5'];
    var currentIndex = 0;
    var intervalMs = 1000;

    function applyActive(index) {
        vectorIds.forEach(function(id, idx) {
            var element = document.getElementById(id);
            if (!element) {
                return;
            }
            if (idx === index) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }

    function nextVector() {
        currentIndex = (currentIndex + 1) % vectorIds.length;
        applyActive(currentIndex);
    }

    function init() {
        applyActive(currentIndex);
        window.setInterval(nextVector, intervalMs);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
