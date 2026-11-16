/**
 * KARAOKE TULUM - Módulo de Gestión de Canciones
 * Manejo del catálogo, filtros dinámicos, paginación sin scroll y CRUD para administrador.
 */

class SongsManager {
    constructor() {
        this.storageKey = window.STORAGE_KEYS ? window.STORAGE_KEYS.SONGS : 'tulum_songs';
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

    saveAll(songs) {
        if (window.storage) {
            return window.storage.set(this.storageKey, songs);
        }
        localStorage.setItem(this.storageKey, JSON.stringify(songs));
        return true;
    }

    getById(id) {
        const songs = this.getAll();
        return songs.find(s => String(s.id) === String(id)) || null;
    }

    add(songData) {
        const songs = this.getAll();
        const newId = songs.length > 0 ? Math.max(...songs.map(s => Number(s.id) || 0)) + 1 : 1;
        
        const newSong = {
            id: newId,
            titulo: songData.titulo.trim(),
            artista: songData.artista.trim(),
            genero: songData.genero.trim(),
            duracion: songData.duracion.trim() || '3:30',
            imagen: songData.imagen.trim() || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
            categoria: songData.categoria.trim(),
            subcategoria: songData.subcategoria ? songData.subcategoria.trim() : 'General',
            descripcion: (songData.descripcion && songData.descripcion.trim()) || 'Interpretación destacada para lucir tu voz en el lounge.',
            popularidad: Number(songData.popularidad) || 85,
            esDueto: Boolean(songData.esDueto),
            anio: Number(songData.anio) || new Date().getFullYear(),
            letra: Array.isArray(songData.letra) ? songData.letra : (songData.letra ? songData.letra.split('\n') : [
                "♪ Disfruta tu momento en Karaoke Tulum ♪",
                "Canta con el corazón...",
                "¡Sube el volumen y vive la noche!"
            ])
        };

        songs.unshift(newSong);
        this.saveAll(songs);

        if (window.registrarBitacora) {
            window.registrarBitacora("Crear Canción", "Canciones", `Canción "${newSong.titulo}" de ${newSong.artista} agregada al catálogo.`);
        }

        window.dispatchEvent(new CustomEvent('tulum:songs-updated'));
        return newSong;
    }

    update(id, updatedData) {
        const songs = this.getAll();
        const index = songs.findIndex(s => String(s.id) === String(id));
        if (index === -1) return null;

        songs[index] = {
            ...songs[index],
            ...updatedData,
            id: songs[index].id // Preservar ID
        };

        this.saveAll(songs);

        if (window.registrarBitacora) {
            window.registrarBitacora("Editar Canción", "Canciones", `Canción ID #${id} actualizada: "${songs[index].titulo}".`);
        }

        window.dispatchEvent(new CustomEvent('tulum:songs-updated'));
        return songs[index];
    }

    delete(id) {
        const songs = this.getAll();
        const songToDelete = songs.find(s => String(s.id) === String(id));
        if (!songToDelete) return false;

        const filtered = songs.filter(s => String(s.id) !== String(id));
        this.saveAll(filtered);

        // Remover también de favoritos si estaba
        if (window.favoritesManager) {
            window.favoritesManager.remove(id);
        }

        if (window.registrarBitacora) {
            window.registrarBitacora("Eliminar Canción", "Canciones", `Canción "${songToDelete.titulo}" eliminada del catálogo.`);
        }

        window.dispatchEvent(new CustomEvent('tulum:songs-updated'));
        return true;
    }

    /**
     * Búsqueda y filtrado dinámico con paginación integrada
     */
    filter({
        query = '',
        categoria = '',
        subcategoria = '',
        artista = '',
        orden = 'popularidad', // 'popularidad', 'az', 'za', 'anio'
        soloDuetos = false,
        pagina = 1,
        porPagina = 6
    } = {}) {
        let results = this.getAll();

        // Filtro de texto inteligente (título, artista, género, categoría, descripción)
        if (query) {
            const q = query.toLowerCase().trim();
            results = results.filter(s => 
                s.titulo.toLowerCase().includes(q) ||
                s.artista.toLowerCase().includes(q) ||
                s.genero.toLowerCase().includes(q) ||
                s.categoria.toLowerCase().includes(q) ||
                (s.descripcion && s.descripcion.toLowerCase().includes(q)) ||
                (s.subcategoria && s.subcategoria.toLowerCase().includes(q))
            );
        }

        // Filtro por categoría exacta (con soporte especial para Duetos)
        if (categoria && categoria !== 'Todas') {
            const catLow = categoria.toLowerCase();
            if (catLow === 'duetos') {
                results = results.filter(s => s.esDueto === true || s.categoria.toLowerCase() === 'duetos');
            } else {
                results = results.filter(s => s.categoria.toLowerCase() === catLow);
            }
        }

        // Filtro por subcategoría
        if (subcategoria && subcategoria !== 'Todas') {
            results = results.filter(s => s.subcategoria && s.subcategoria.toLowerCase() === subcategoria.toLowerCase());
        }

        // Filtro por artista
        if (artista && artista !== 'Todos') {
            results = results.filter(s => s.artista.toLowerCase().includes(artista.toLowerCase()));
        }

        // Filtro solo duetos
        if (soloDuetos) {
            results = results.filter(s => s.esDueto === true || s.categoria.toLowerCase() === 'duetos');
        }

        // Ordenamiento
        if (orden === 'popularidad') {
            results.sort((a, b) => b.popularidad - a.popularidad);
        } else if (orden === 'az') {
            results.sort((a, b) => a.titulo.localeCompare(b.titulo));
        } else if (orden === 'za') {
            results.sort((a, b) => b.titulo.localeCompare(a.titulo));
        } else if (orden === 'anio' || orden === 'recientes') {
            results.sort((a, b) => (b.anio || 0) - (a.anio || 0));
        }

        // Paginación para CERO SCROLL
        const totalItems = results.length;
        const totalPaginas = Math.max(1, Math.ceil(totalItems / porPagina));
        const paginaActual = Math.min(Math.max(1, pagina), totalPaginas);
        const inicio = (paginaActual - 1) * porPagina;
        const itemsPaginados = results.slice(inicio, inicio + porPagina);

        return {
            items: itemsPaginados,
            totalItems,
            totalPaginas,
            paginaActual,
            porPagina
        };
    }

    getFeatured(limit = 6) {
        return this.getAll()
            .sort((a, b) => b.popularidad - a.popularidad)
            .slice(0, limit);
    }

    getByArtist(artistaName) {
        const q = artistaName.toLowerCase().trim();
        return this.getAll().filter(s => s.artista.toLowerCase().includes(q));
    }

    getArtistsList() {
        const songs = this.getAll();
        const artistsMap = new Map();
        const seedMeta = window.SEED_ARTISTS || {};

        songs.forEach(s => {
            const artistaKey = s.artista.split('ft.')[0].split('&')[0].trim();
            if (!artistsMap.has(artistaKey)) {
                const meta = seedMeta[artistaKey] || {};
                artistsMap.set(artistaKey, {
                    artista: artistaKey,
                    cancionesCount: 1,
                    imagen: meta.imagen || s.imagen,
                    genero: meta.genero || s.genero,
                    biografia: meta.biografia || `Consagrado exponente de ${s.genero} con temas imprescindibles en el catálogo de Karaoke Tulum.`,
                    nacionalidad: meta.nacionalidad || 'Latinoamérica'
                });
            } else {
                const item = artistsMap.get(artistaKey);
                item.cancionesCount++;
            }
        });

        return Array.from(artistsMap.values()).sort((a, b) => b.cancionesCount - a.cancionesCount);
    }
}

window.songsManager = new SongsManager();
