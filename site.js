function copyToClipboard(element) {
    const temp = document.createElement('textarea');
    temp.value = document.querySelector(element).textContent;

    document.body.appendChild(temp);
    temp.select();

    try {
        document.execCommand('copy');

        // Google Analytics event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'copy_install_command', {
                'event_category': 'Downloads',
                'event_label': element.includes('windows') ? 'Windows' : 'Mac'
            });
        }

        // Visual feedback
        const button = event.target.closest('.copy-btn');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="bi bi-check-circle-fill"></i> Copied!';
        button.style.background = 'var(--secondary-color)';

        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);

    } catch (err) {
        alert('Failed to copy. Please copy manually.');
    } finally {
        document.body.removeChild(temp);
    }
}

// Track download intent
function trackDownload(source) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download_intent', {
            'event_category': 'Downloads',
            'event_label': source
        });
    }
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
