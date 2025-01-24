const menu = document.createElement('div');
menu.id = 'menu';

const links = [
    {
        href: '/',
        label: 'Home',
        icon: 'fa-solid fa-house'
    },
    {
        href: '/soundboard/',
        label: 'Soundboard',
        icon: 'fa-solid fa-volume-high'
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
    a.href = link.href;
    a.innerHTML = `<i class="${link.icon} fa-fw"></i> ${link.label}`;
    menu.appendChild(a);
});
menu.appendChild(toggle);
document.body.appendChild(menu);