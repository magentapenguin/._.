import twemoji from '@twemoji/api';
function error(message: string): void {
    alert(message);
    console.error(message);
}
(async () => {
    const response = await fetch('/static/sounds.json')
    const soundinfo = await response.json() as { base: string, sounds: Record<string, SoundData> };
    const sounds = soundinfo.sounds;
    if (!soundinfo.base) {
        error('No base URL for sounds found.');
        return;
    }
    const soundboard = document.getElementById('soundboard')
    if (!soundboard) {
        error('No soundboard element found.');
        return;
    }
    if (!Object.keys(sounds).length) {
        error('No sounds found in the provided JSON.');
        return;
    }
    interface SoundData {
        emoji: string;
        name: string;
        file: string;
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
        soundboard.appendChild(button);
        twemoji.parse(button);
    };
    for (const [name, data] of Object.entries(sounds)) {
        addSound(data.emoji + ' ' + data.name, soundinfo.base + data.file, name)
    }
    soundboard.classList.add('loaded')
})()