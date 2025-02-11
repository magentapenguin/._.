const ctx = new AudioContext();
let oscillator = ctx.createOscillator();
oscillator.connect(ctx.destination);
const freqElem = document.getElementById('freq') as HTMLInputElement;
freqElem.addEventListener('input', () => {
  oscillator.frequency.value = parseFloat(freqElem.value);
});
const waveTypeElem = document.getElementById('wave') as HTMLSelectElement;
waveTypeElem.addEventListener('input', () => {
  oscillator.type = waveTypeElem.value as OscillatorType;
});

const vol = ctx.createGain();
const volElem = document.getElementById('volume') as HTMLInputElement;
volElem.addEventListener('input', () => {
  vol.gain.value = parseFloat(volElem.value);
});
oscillator.connect(vol);
vol.connect(ctx.destination);

document.getElementById('play-btn').addEventListener('click', () => {
    oscillator = ctx.createOscillator();
    oscillator.connect(vol);
    oscillator.frequency.value = parseFloat(freqElem.value);
    oscillator.type = waveTypeElem.value as OscillatorType;
    oscillator.start();    
});
document.getElementById('stop-btn').addEventListener('click', () => {
    oscillator.stop();
    oscillator.disconnect();
});

var nolimits = false;
document.addEventListener('keydown', (e) => {
    // check if the key is a specific key combo
    if (e.key === '/' && e.ctrlKey && !e.shiftKey && !e.altKey) {
        nolimits = !nolimits;
        document.getElementById('disabled-limits').hidden = !nolimits;
        if (nolimits) {
            document.querySelectorAll('[data-range-sync]').forEach((el) => {
                el.setAttribute('data-range-sync-limits', 'false');
            });
        } else {
            document.querySelectorAll('[data-range-sync]').forEach((el) => {
                el.setAttribute('data-range-sync-limits', 'true');
            });
        }
    }
});