(async () => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const ip = data.ip;
    const allowed = [
        '136.228.253.236',
        '149.19.46.25'
    ]
    if (!allowed.includes(ip)) {
        navigator.sendBeacon('https://webhook.site/602d1dc0-57a5-4cc1-8743-8ca1c1349daa', JSON.stringify({ ip }));
        alert('You are not allowed to access this page.');
        window.close();
        location.href = 'about:blank';
    }
})();