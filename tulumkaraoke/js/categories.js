/**
 * KARAOKE TULUM - Módulo de Categorías y Subcategorías
 * Gestión de géneros musicales, navegación por categorías y administración.
 */

class CategoriesManager {
    constructor() {
        this.storageKey = window.STORAGE_KEYS ? window.STORAGE_KEYS.CATEGORIES : 'tulum_categories';
    }

    getAll() {
        if (window.storage) {
            return window.storage.get(this.storageKey, []);
        }
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch {
            return [];
        }
    }

    saveAll(categories) {
        if (window.storage) {
            return window.storage.set(this.storageKey, categories);
        }
        localStorage.setItem(this.storageKey, JSON.stringify(categories));
        return true;
    }

    getById(id) {
        const categories = this.getAll();
        return categories.find(c => c.id === id) || null;
    }

    getByName(name) {
        const categories = this.getAll();
        return categories.find(c => c.nombre.toLowerCase() === name.toLowerCase()) || null;
    }

    add(categoryData) {
        const categories = this.getAll();
        const id = 'cat-' + categoryData.nombre.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 15) + '-' + Date.now().toString().slice(-4);
        
        const newCategory = {
            id: id,
            nombre: categoryData.nombre.trim(),
            descripcion: categoryData.descripcion.trim() || 'Selección musical exclusiva de Tulum',
            icono: categoryData.icono || 'music',
            color: categoryData.color || '#9B5CFF',
            imagen: categoryData.imagen || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
            subcategorias: Array.isArray(categoryData.subcategorias) ? categoryData.subcategorias : (
                categoryData.subcategorias ? categoryData.subcategorias.split(',').map(s => s.trim()) : ['General']
            )
        };

        categories.push(newCategory);
        this.saveAll(categories);

        if (window.registrarBitacora) {
            window.registrarBitacora("Crear Categoría", "Categorías", `Categoría "${newCategory.nombre}" agregada.`);
        }

        window.dispatchEvent(new CustomEvent('tulum:categories-updated'));
        return newCategory;
    }

    update(id, updatedData) {
        const categories = this.getAll();
        const index = categories.findIndex(c => c.id === id);
        if (index === -1) return null;

        categories[index] = {
            ...categories[index],
            ...updatedData,
            id: categories[index].id
        };

        this.saveAll(categories);

        if (window.registrarBitacora) {
            window.registrarBitacora("Editar Categoría", "Categorías", `Categoría "${categories[index].nombre}" actualizada.`);
        }

        window.dispatchEvent(new CustomEvent('tulum:categories-updated'));
        return categories[index];
    }

    delete(id) {
        const categories = this.getAll();
        const catToDelete = categories.find(c => c.id === id);
        if (!catToDelete) return false;

        const filtered = categories.filter(c => c.id !== id);
        this.saveAll(filtered);

        if (window.registrarBitacora) {
            window.registrarBitacora("Eliminar Categoría", "Categorías", `Categoría "${catToDelete.nombre}" eliminada.`);
        }

        window.dispatchEvent(new CustomEvent('tulum:categories-updated'));
        return true;
    }

    getSongCount(categoryName) {
        if (!window.songsManager) return 0;
        const allSongs = window.songsManager.getAll();
        return allSongs.filter(s => s.categoria.toLowerCase() === categoryName.toLowerCase()).length;
    }
}

window.categoriesManager = new CategoriesManager();
