document.querySelectorAll('[data-range-sync]').forEach((el) => {
    console.log(el);
    const target = document.getElementById(el.getAttribute('data-range-sync'));
    if (target) {
        if (el instanceof HTMLInputElement && target instanceof HTMLInputElement) {
            el.addEventListener('blur', () => {
                // limits
                if (el.getAttribute('data-range-sync-limits') === 'true') {
                    const min = parseFloat(el.getAttribute('min'));
                    const max = parseFloat(el.getAttribute('max'));
                    const value = parseFloat(el.value);
                    if (value < min) {
                        el.value = min.toString();
                    } else if (value > max) {
                        el.value = max.toString();
                    }
                } else if (el.getAttribute('data-range-sync-limits') === 'range') {
                    // use range limits
                    const min = parseFloat(target.getAttribute('min'));
                    const max = parseFloat(target.getAttribute('max'));
                    const value = parseFloat(el.value);
                    if (value < min) {
                        el.value = min.toString();
                    } else if (value > max) {
                        el.value = max.toString();
                    }
                }
                target.value = el.value;
            });
            target.addEventListener('input', () => {
                el.value = target.value;
            });
            el.value = target.value;
        } else {
            console.error(`Element with id ${el.getAttribute('data-range-sync')} is not an input element`);
        }
    } else {
        console.error(`No element found with id ${el.getAttribute('data-range-sync')}`);
    }
});
document.querySelectorAll('input').forEach((el) => {
    el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
        }
    });
});