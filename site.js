function copyToClipboard(element) {
    const temp = document.createElement('textarea');
    temp.value = document.querySelector(element).textContent;

    document.body.appendChild(temp);

    temp.select();

    document.execCommand('copy');
    document.body.removeChild(temp);

    // Google Analytics event
    if (typeof gtag !== 'undefined')
        gtag('event', 'copy_install_command', {
            'event_category': 'Downloads',
            'event_label': element.includes('windows') ? 'Windows' : 'Mac'
        });

    alert('Copied to clipboard!');
}

// Track download intent
function trackDownload(source) {
    if (typeof gtag !== 'undefined')
        gtag('event', 'download_intent', {
            'event_category': 'Downloads',
            'event_label': source
        });
}
