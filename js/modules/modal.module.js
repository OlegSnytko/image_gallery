export class Modal {
    constructor(modalId, imageId, closeId, prevId, nextId) {
        this.modal = document.getElementById(modalId);
        this.image = document.getElementById(imageId);
        this.closeBtn = document.getElementById(closeId);
        this.prevBtn = document.getElementById(prevId);
        this.nextBtn = document.getElementById(nextId);
        this.currentIndex = 0;
        this.images = [];
        this.backdrop = document.getElementById('backdrop-blur');
        this.galleryContainer = document.querySelector('.gallery-container');
    }

    init(images) {
        if (!images || !images.length) {
            console.error("No images provided for modal");
            return;
        }
        
        this.images = images;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.closeBtn?.addEventListener('click', () => this.close());
        this.prevBtn?.addEventListener('click', () => this.navigate('prev'));
        this.nextBtn?.addEventListener('click', () => this.navigate('next'));

        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (!this.isOpen()) return;
            switch(e.key) {
                case 'Escape': this.close(); break;
                case 'ArrowLeft': this.navigate('prev'); break;
                case 'ArrowRight': this.navigate('next'); break;
            }
        });
    }

    open(index) {
        if (index < 0 || index >= this.images.length) {
            console.error("Invalid image index:", index);
            return;
        }
        
        this.backdrop.style.display = 'block';
        this.galleryContainer.classList.add('blur');

        this.currentIndex = index;
        this.updateModalImage();
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.backdrop.style.display = 'none';
        this.galleryContainer.classList.remove('blur');
    }

    navigate(direction) {
        const newIndex = direction === 'prev'
            ? (this.currentIndex - 1 + this.images.length) % this.images.length
            : (this.currentIndex + 1) % this.images.length;
        
        this.currentIndex = newIndex;
        this.updateModalImage();
    }

    updateModalImage() {
        const imgData = this.images[this.currentIndex];
        if (!imgData?.urls?.regular) {
            console.error("Invalid image data:", imgData);
            return;
        }
        
        
        this.image.src = imgData.urls.regular;
        this.image.alt = imgData.alt_description || 'Gallery image';
    }

    isOpen() {
        return this.modal?.style.display === 'block';
    }
}