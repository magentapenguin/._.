import twemoji from '@twemoji/api';
import soundData from './sounds.json';
function error(message: string): void {
    alert(message);
    console.error(message);
}

const sounds = soundData.sounds;
if (!soundData.base) {
    error('No base URL for sounds found.');
}
const soundboard = document.getElementById('soundboard')
if (!soundboard) {
    error('No soundboard element found.');
}
if (!Object.keys(sounds).length) {
    error('No sounds found in the provided JSON.');
}

const addSound = (name: string, url: string, id: string): void => {
    const button: HTMLButtonElement = document.createElement('button');
    const audio: HTMLAudioElement = new Audio(url);
    audio.onended = (): void => {
        button.classList.remove('playing');
    };
    audio.onerror = (): void => {
        button.classList.add('error');
    };
    button.appendChild(audio);
    button.id = id;
    button.innerText = name;
    button.title = name;

    button.innerHTML += '<i class="fa-solid fa-volume sound-icon"></i> <i class="fa-solid fa-triangle-exclamation error-icon"></i>';
    button.onclick = (): void => {
        button.classList.add('playing');
        button.classList.remove('error');
        audio.play();
    };
    audio.onerror = (): void => {
        button.classList.add('error');
        button.classList.remove('playing');
    };
    if (soundboard) soundboard.appendChild(button);
    twemoji.parse(button);
};
for (const [name, data] of Object.entries(sounds)) {
    addSound(data.emoji + ' ' + data.name, soundData.base + data.file, name)
}
if (soundboard) soundboard.classList.add('loaded')
