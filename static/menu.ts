import Tooltip from './tooltip';
import './menu.css';
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
    },
    {
        href: 'dynamicsounds/',
        label: 'Dynamic Sounds',
        icon: 'fa-solid fa-music-note'
    }
];
const toggle = document.createElement('button');
toggle.classList.add('link');
toggle.innerHTML = '<i class="fa-solid fa-bars fa-fw"></i> Toggle Menu';
toggle.onclick = () => {
    menu.classList.toggle('expanded');
    tooltips.forEach(t => t.opts.direction = menu.classList.contains('expanded') ? 'left' : 'bottom');
};
toggle.role = 'button';
menu.role = 'menu';
menu.setAttribute('aria-label', 'Main navigation');


const linkElements = [];
const tooltips = [];

links.forEach(link => {
    const a = document.createElement('a');
    a.href = base+link.href;
    a.innerHTML = `<i class="${link.icon} fa-fw"></i> ${link.label}`;
    a.role = 'menuitem';
    menu.appendChild(a);
    linkElements.push(a);
    tooltips.push(new Tooltip(a, link.label, { strategy: 'fixed', offset: 20, direction: 'bottom' }));
});
menu.appendChild(toggle);
document.body.appendChild(menu);
tooltips.push(new Tooltip(toggle, 'Toggle Menu', { strategy: 'fixed', offset: 20, direction: 'bottom' }));