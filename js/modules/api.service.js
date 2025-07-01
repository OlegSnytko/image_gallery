export class ApiService {
    static async fetchImages(count = 12) {
        try {
            if (!window.CONFIG || !window.CONFIG.API_URL) {
                throw new Error("Configuration not loaded");
            }
            const response = await fetch(
                `${window.CONFIG.API_URL}?client_id=${window.CONFIG.UNSPLASH_ACCESS_KEY}&count=${count}`
            );
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching images:", error);
            return this.getPlaceholderImages();
        }
    }

    static getPlaceholderImages() {
        return Array.from({length: 4}, (_, i) => ({
            urls: {regular: `https://via.placeholder.com/600/FFFFFF/282828?text=Image+${i+1}`},
            alt_description: `Placeholder ${i+1}`
        }));
    }
}