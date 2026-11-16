/**
 * KARAOKE TULUM - Sistema de Favoritos
 * Persistencia en LocalStorage, alternancia de estados y notificaciones auditables.
 */

class FavoritesManager {
    constructor() {
        this.storageKey = window.STORAGE_KEYS ? window.STORAGE_KEYS.FAVORITES : 'tulum_favorites';
    }

    getAllIds() {
        if (window.storage) {
            return window.storage.get(this.storageKey, []);
        }
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch {
            return [];
        }
    }

    saveAll(ids) {
        if (window.storage) {
            return window.storage.set(this.storageKey, ids);
        }
        localStorage.setItem(this.storageKey, JSON.stringify(ids));
        return true;
    }

    isFavorite(songId) {
        const ids = this.getAllIds();
        return ids.some(id => String(id) === String(songId));
    }

    toggle(songId) {
        const ids = this.getAllIds();
        const idStr = String(songId);
        const index = ids.findIndex(id => String(id) === idStr);
        let added = false;
        let songTitle = 'Canción';

        if (window.songsManager) {
            const s = window.songsManager.getById(songId);
            if (s) songTitle = `"${s.titulo}" (${s.artista})`;
        }

        if (index > -1) {
            ids.splice(index, 1);
            added = false;
            if (window.registrarBitacora) {
                window.registrarBitacora("Eliminar Favorito", "Favoritos", `Canción eliminada de favoritos: ${songTitle}`);
            }
            if (window.showToast) {
                window.showToast("Favoritos", `${songTitle} eliminada de favoritos.`, "info");
            }
        } else {
            ids.push(Number(songId) || songId);
            added = true;
            if (window.registrarBitacora) {
                window.registrarBitacora("Agregar Favorito", "Favoritos", `Canción agregada a favoritos: ${songTitle}`);
            }
            if (window.showToast) {
                window.showToast("Favoritos", `${songTitle} agregada a tus favoritos.`, "success");
            }
        }

        this.saveAll(ids);
        window.dispatchEvent(new CustomEvent('tulum:favorites-updated', { detail: { songId, isFavorite: added } }));
        return added;
    }

    remove(songId) {
        const ids = this.getAllIds();
        const filtered = ids.filter(id => String(id) !== String(songId));
        this.saveAll(filtered);
        window.dispatchEvent(new CustomEvent('tulum:favorites-updated', { detail: { songId, isFavorite: false } }));
    }

    getFavoriteSongs() {
        const ids = this.getAllIds();
        if (!window.songsManager) return [];
        const allSongs = window.songsManager.getAll();
        return allSongs.filter(s => ids.some(id => String(id) === String(s.id)));
    }
}

window.favoritesManager = new FavoritesManager();
