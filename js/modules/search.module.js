export class Search {
    constructor(formId, inputId, historyId) {
        this.form = document.getElementById(formId);
        this.input = document.getElementById(inputId);
        this.historyContainer = document.getElementById(historyId);
        this.history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    }

    init(gallery, images) {
        this.gallery = gallery;
        this.allImages = images;

        this.form.addEventListener('submit', (e) => this.handleSearch(e));
        this.input.addEventListener('input', () => this.handleInput());
        this.setupHistory();
    }

    async handleSearch(e) {
        e.preventDefault();
        const term = this.input.value.trim();

        if (term.length < 2) {
            if (term.length === 0) {
                this.gallery.updateDisplay();
            } else {
                alert('Введите минимум 2 символа');
            }
            return;
        }

        this.gallery.grid.innerHTML = '<div class="loader"></div>';
        
        await new Promise(resolve => setTimeout(resolve, 300));

        const filtered = this.filterImages(term);
        this.updateHistory(term);
        this.gallery.grid.innerHTML = ''; 
        this.gallery.displayImages(filtered.length ? filtered : this.allImages);

        if (filtered.length === 0) {
            this.gallery.grid.innerHTML += '<p class="no-results">Ничего не найдено</p>';
        }
    }

    filterImages(term) {
        return this.allImages.filter(image => {
            const fields = [
                image.alt_description,
                image.description,
                image.user?.name,
                ...(image.tags?.map(tag => tag.title) || [])
            ].filter(Boolean).map(f => f.toLowerCase());

            return fields.some(f => f.includes(term.toLowerCase()));
        });
    }

    updateHistory(term) {
        if (!term || this.history.includes(term)) return;
        this.history.unshift(term);
        this.history = this.history.slice(0, 5);
        localStorage.setItem('searchHistory', JSON.stringify(this.history));
        this.renderHistory();
    }

    renderHistory() {
        if (this.history.length === 0) return;

        this.historyContainer.innerHTML = `
            <ul>${this.history.map(term => `<li>${term}</li>`).join('')}</ul>
        `;
        this.historyContainer.style.display = 'block';

        this.historyContainer.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', () => {
                this.input.value = item.textContent;
                this.form.dispatchEvent(new Event('submit'));
            });
        });
    }

    handleInput() {
        if (this.input.value === '') {
            this.gallery.grid.innerHTML = ''; 
            this.gallery.updateDisplay();
        }
    }

    setupHistory() {
        this.input.addEventListener('focus', () => this.renderHistory());
        this.input.addEventListener('blur', () => {
            setTimeout(() => {
                this.historyContainer.style.display = 'none';
            }, 2000);
        });
    }
}