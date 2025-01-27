const menu = document.createElement('div');
menu.id = 'menu';

const base = '/._./';
const links = [
    {
        href: '',
        label: 'Home',
        icon: 'fa-solid fa-house'
    },
    {
        href: 'soundboard/',
        label: 'Soundboard',
        icon: 'fa-solid fa-volume-high'
    },
    {
        href: 'podcast',
        label: 'Podcast',
        icon: 'fa-solid fa-microphone'
    }
];
const toggle = document.createElement('button');
toggle.classList.add('link');
toggle.innerHTML = '<i class="fa-solid fa-bars fa-fw"></i> Menu';
toggle.onclick = () => {
    menu.classList.toggle('expanded');
};

links.forEach(link => {
    const a = document.createElement('a');
    a.href = base+link.href;
    a.innerHTML = `<i class="${link.icon} fa-fw"></i> ${link.label}`;
    menu.appendChild(a);
});
menu.appendChild(toggle);
document.body.appendChild(menu);