import * as floating from "@floating-ui/dom";
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
    }
];
const toggle = document.createElement('button');
toggle.classList.add('link');
toggle.innerHTML = '<i class="fa-solid fa-bars fa-fw"></i> Menu';
toggle.onclick = () => {
    menu.classList.toggle('expanded');
};

interface TooltipOpts {
    padding?: number;
    offset?: number;
    animationDuration?: number;
    strategy?: 'fixed' | 'absolute';
}

class Tooltip {
    tooltip?: HTMLElement;
    private cleanUp?: () => void;
    constructor(public elem: HTMLElement, public text: string, private opts?: TooltipOpts) {
        console.log(elem, this.elem);
        elem.addEventListener('mouseenter', this.onHover.bind(this));
        elem.addEventListener('mouseleave', this.onLeave.bind(this));
    }
    unmount() {
        this.elem.removeEventListener('mouseenter', this.onHover);
        this.elem.removeEventListener('mouseleave', this.onLeave);
        this.tooltip?.remove();
    }
    private updatePosition() {
        if (!this.tooltip) return;
        floating.computePosition(this.elem, this.tooltip, {
            middleware: [
                floating.offset(this.opts?.offset ?? 8),
                floating.shift({ padding: this.opts?.padding ?? 5 })
            ],
            strategy: this.opts?.strategy ?? 'absolute'
        }).then(({ x, y, strategy }) => {
            Object.assign(this.tooltip.style, {
                left: `${x}px`,
                top: `${y}px`,
                position: strategy
            });
        });
    }
    onHover() {
        if (this.tooltip) this.tooltip.remove();
        this.tooltip = document.createElement('div');
        this.tooltip.classList.add('tooltip');
        this.tooltip.innerText = this.text;
        document.body.appendChild(this.tooltip);
        this.animate([
            { transform: 'scale(0%)' },
            { transform: 'scale(100%)' }
        ], {
            duration: this.opts?.animationDuration ?? 200,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        });
        this.cleanUp = floating.autoUpdate(this.elem, this.tooltip, this.updatePosition.bind(this));
    }
    private animate(kfs: Keyframe[], opts: KeyframeAnimationOptions, finish?: () => void) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            finish?.();
            return;
        }
        if (!this.tooltip) return;
        const animation = this.tooltip.animate(kfs, opts);
        animation.onfinish = finish;
    }
    onLeave() {
        this.animate([
            { transform: 'scale(100%)' },
            { transform: 'scale(0%)' }
        ], {
            duration: this.opts?.animationDuration ?? 200,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }, () => {
            this.tooltip?.remove();
            this.tooltip = undefined;
        });
        this.cleanUp?.();
    }
}

const linkElements = [];

links.forEach(link => {
    const a = document.createElement('a');
    a.href = base+link.href;
    a.innerHTML = `<i class="${link.icon} fa-fw"></i> ${link.label}`;
    menu.appendChild(a);
    linkElements.push(a);
    new Tooltip(a, link.label, { strategy: 'fixed' });
});
menu.appendChild(toggle);
document.body.appendChild(menu);
new Tooltip(toggle, 'Toggle menu', { strategy: 'fixed' });