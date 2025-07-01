import { ApiService } from './modules/api.service.js';
import { Gallery } from './modules/gallery.module.js';
import { Search } from './modules/search.module.js';
import { Modal } from './modules/modal.module.js';

document.addEventListener("DOMContentLoaded", async () => {
    const gallery = new Gallery('gallery-grid');
    const search = new Search('search-form', 'search-input', 'search-history');
    const modal = new Modal('modal', 'modal-image', 'close-btn', 'prev-btn', 'next-btn');
    

    try {
        const images = await ApiService.fetchImages();
        gallery.init(images);
        modal.init(images);
        search.init(gallery, images);
    } catch (error) {
        console.error("Initialization error:", error);
    }

    document.getElementById('gallery-grid').addEventListener('imageClick', (e) => {
        modal.open(e.detail.index);
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-btn');
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeOptions = document.querySelectorAll('.theme-dropdown button');
    
    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeSwitcher.classList.toggle('active');
    });
    
    document.addEventListener('click', () => {
        themeSwitcher.classList.remove('active');
    });
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            setTheme(theme);
            localStorage.setItem('theme', theme);
        });
    });
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});

function setTheme(theme) {
    document.body.className = theme;
    
    document.querySelectorAll('.theme-dropdown button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    localStorage.setItem('theme', theme);
}