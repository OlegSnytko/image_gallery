export class Gallery {
    constructor(containerId) {
        this.grid = document.getElementById(containerId);
        this.images = [];
        //this.mediaQuery = window.matchMedia('(max-width: 768px)');
        //this.isMobile = window.innerWidth <= 768; 

        this.currentImages = []; 
        this.isMobile = window.matchMedia('(max-width: 768px)').matches;
        this.handleResize = this.handleResize.bind(this);
    }

    init(images) {
        this.allImages = images;
        //this.hadleResize();
        //this.mediaQuery.addEventListener('change', () => this.handleResize());

        this.updateDisplay();
        window.matchMedia('(max-width: 768px)').addEventListener('change', this.handleResize);
    }

    /*hadleResize(){
        this.isMobile = this.mediaQuery.matches;
        
        const imagesToShow = this.isMobile ? this.allImages.slice(0, 8) : this.allImages;
        this.displayImages(imagesToShow);
    }*/

    handleResize(event) {
        const newIsMobile = event.matches;
        
        // Обновляем только если изменился режим
        if (this.isMobile !== newIsMobile) {
            this.isMobile = newIsMobile;
            this.updateDisplay();
        }
    }


    updateDisplay() {
        // Определяем какие изображения показывать
        const imagesToShow = this.isMobile ? this.allImages.slice(0, 8) : this.allImages;
        this.currentImages = imagesToShow;
        
        // Очищаем и перерисовываем галерею
        this.grid.innerHTML = '';
        this.displayImages(imagesToShow);
    }


    /*displayImages(images) {
        this.grid.innerHTML = '';
        images.forEach((image, index) => {
            const imgElement = document.createElement('div');
            imgElement.className = 'gallery-item';
            imgElement.innerHTML = this.createImageHTML(image, index);
            this.grid.appendChild(imgElement);
            
            imgElement.addEventListener('click', () => {
                this.grid.dispatchEvent(new CustomEvent('imageClick', { 
                    detail: { index } 
                }));
            });

            const img = imgElement.querySelector('img');
            img.addEventListener('load', () => img.classList.add('loaded'));
        });
    }

    createImageHTML(image, index) {
        return `
            <img src="${image.urls.regular}" 
                 alt="${image.alt_description || 'Gallery image'}" 
                 class="gallery-img" 
                 data-index="${index}">
            <div class="image-info">
                <p class="image-tags">${image.tags?.map(tag => tag.title).join(', ') || 'Нет тегов'}</p>
                <p class="image-author">Автор: ${image.user?.name || 'Неизвестен'}</p>
            </div>
        `;
    }*/



        displayImages(images) {
        images.forEach((image, index) => {
            const imgElement = document.createElement('div');
            imgElement.className = 'gallery-item';
            imgElement.innerHTML = this.createImageHTML(image, index);
            this.grid.appendChild(imgElement);
            
            imgElement.addEventListener('click', () => {
                // Находим индекс в полном массиве изображений
                const globalIndex = this.allImages.findIndex(img => img.id === image.id);
                this.grid.dispatchEvent(new CustomEvent('imageClick', { 
                    detail: { index: globalIndex } 
                }));
            });

            const img = imgElement.querySelector('img');
            img.addEventListener('load', () => img.classList.add('loaded'));
        });
    }

    createImageHTML(image, index) {
        return `
            <img src="${image.urls.regular}" 
                 alt="${image.alt_description || 'Gallery image'}" 
                 class="gallery-img" 
                 data-index="${index}">
            <div class="image-info">
                <p class="image-tags">${image.tags?.map(tag => tag.title).join(', ') || 'Нет тегов'}</p>
                <p class="image-author">Автор: ${image.user?.name || 'Неизвестен'}</p>
            </div>
        `;
    }
        
}