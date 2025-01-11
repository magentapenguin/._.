(async ()=>{
    const response = await fetch('/static/sounds.json')
    const soundinfo = await response.json()
    const sounds = soundinfo.sounds;
    const soundboard = document.getElementById('soundboard')
    const addSound = (name, url, id) => {
        const button = document.createElement('button')
        const audio = new Audio(url);
        audio.onended = () => {
            button.classList.remove('playing')
        }
        audio.onerror = () => {
            button.classList.add('error')
        }
        button.appendChild(audio)
        button.id = id
        button.innerText = name
        button.title = name

        button.innerHTML += '<i class="fa-solid fa-volume sound-icon"></i> <i class="fa-solid fa-triangle-exclamation error-icon"></i>'
        button.onclick = async () => {
            button.classList.add('playing')
            button.classList.remove('error')
            try {
                audio.play()
            } catch (e) {
                console.error(e)
                button.classList.add('error')
                button.classList.remove('playing')
            }
        }
        soundboard.appendChild(button)
        twemoji.parse(button)
    }
    for (const [name, data] of Object.entries(sounds)) {
        addSound(data.emoji+' '+data.name, soundinfo.base+data.file, name)
    }
    soundboard.classList.add('loaded')
})()