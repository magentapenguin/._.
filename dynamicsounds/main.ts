const ctx = new AudioContext();
let oscillator = ctx.createOscillator();
oscillator.connect(ctx.destination);
const freqElem = document.getElementById('freq') as HTMLInputElement;
freqElem.addEventListener('input', () => {
  oscillator.frequency.value = parseFloat(freqElem.value);
});
const waveTypeElem = document.getElementById('wave-type') as HTMLSelectElement;
waveTypeElem.addEventListener('input', () => {
  oscillator.type = waveTypeElem.value as OscillatorType;
});

const vol = ctx.createGain();
const volElem = document.getElementById('volume') as HTMLInputElement;
volElem.addEventListener('input', () => {
  vol.gain.value = parseFloat(volElem.value) / 100;
});
oscillator.connect(vol);
vol.connect(ctx.destination);
const playBtn = document.getElementById('play-btn') as HTMLButtonElement;
const stopBtn = document.getElementById('stop-btn') as HTMLButtonElement;


playBtn.addEventListener('click', () => {
    ctx.resume();
    oscillator = ctx.createOscillator();
    oscillator.connect(vol);
    oscillator.frequency.value = parseFloat(freqElem.value);
    oscillator.type = waveTypeElem.value as OscillatorType;
    oscillator.start();
    playBtn.disabled = true;
    stopBtn.disabled = false;
    playBtn.blur();
    playBtn.querySelector('span').innerText = 'Playing...';
});
stopBtn.addEventListener('click', () => {
    oscillator.stop();
    oscillator.disconnect();
    playBtn.disabled = false;
    stopBtn.disabled = true;
    playBtn.querySelector('span').innerText = 'Play';
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