// --- Global Helper UI Helpers ---
function getTitle(item) { return item.title || item.name || 'Untitled'; }
function getRating(item) { return item.vote_average ? item.vote_average.toFixed(1) : '0.0'; }
function getYear(item) { const date = item.release_date || item.first_air_date; return date ? date.split('-')[0] : 'N/A'; }
function getImageURL(path) { return path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=No+Poster'; }

// --- Existing Search Handlers ---
async function handleSearch() {
    try {
        const query = document.getElementById('searchbar').value;
        const items = await searchMovies(query);
        items.forEach(item => console.log(`Found: ${item.title || item.name}`));
    } catch (error) {
        console.error('Error during search:', error);
    }
}

async function handleAddToWatchlist(selectedMediaItem) {
    try {
        const result = addToWatchlist(selectedMediaItem);
        alert(result ? 'Added to watchlist!' : 'Already in watchlist.');
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        alert("Failed to add item to watchlist.");
    }
}

// --- Home Grid Rendering Logic ---
function createCard(item) {
    const type = item.media_type || (item.title ? 'movie' : 'tv');
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="${getImageURL(item.poster_path)}" alt="${getTitle(item)}" loading="lazy"/>
        <div class="movie-card-info">
            <div class="movie-card-title">${getTitle(item)}</div>
            <div class="movie-card-rating">⭐ ${getRating(item)}</div>
        </div>`;
    card.onclick = () => openModal(item.id, type);
    return card;
}

function renderGrid(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';
    if (!items || items.length === 0) {
        el.innerHTML = '<p style="color:#aaa">Nothing to show right now.</p>';
        return;
    }
    items.slice(0, 12).forEach(item => el.appendChild(createCard(item)));
}

// --- Main Homepage Initializer ---
async function initHome() {
    try {
        const [trending, movies, tv] = await Promise.all([
            fetchTrending(),
            getPopular('movie'),
            getPopular('tv')
        ]);

        renderGrid('trending-grid', trending);
        renderGrid('popular-movies-grid', movies);
        renderGrid('popular-tv-grid', tv);
    } catch (error) {
        console.error("Failed to load home layout sections:", error);
    }
}

// --- Detail Modals & Watchlist Actions ---
async function openModal(id, type) {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    if (!overlay || !content) return;

    overlay.classList.add('active');
    content.innerHTML = '<div class="loading"><div class="spinner"></div>Loading...</div>';
    
    try {
        const movie = await getMovieDetails(id, type);
        const inList = isInWatchlist(movie.id);
        const genres = (movie.genres || []).map(g => `<span class="badge">${g.name}</span>`).join('');
        
        content.innerHTML = `
            <div class="modal-movie">
                <img class="modal-poster" src="${getImageURL(movie.poster_path)}" alt="${getTitle(movie)}"/>
                <div class="modal-info">
                    <h2>${getTitle(movie)}</h2>
                    <div class="modal-meta">
                        ${getYear(movie)} &bull; ${movie.runtime || (movie.number_of_seasons + ' seasons') || ''} &bull; ⭐ ${getRating(movie)}
                    </div>
                    <div style="margin-bottom:12px">${genres}</div>
                    <p class="modal-overview">${movie.overview || 'No description available.'}</p>
                    <button class="btn ${inList ? 'btn-outline' : 'btn-primary'}" id="modal-watchlist-btn">
                        ${inList ? '✓ In Watchlist' : '+ Add to Watchlist'}
                    </button>
                </div>
            </div>`;

        document.getElementById('modal-watchlist-btn').onclick = function() {
            toggleWatchlistBtn(movie, this, type);
        };
    } catch(err) {
        console.error('openModal error:', err);
        content.innerHTML = '<p>Error loading descriptions.</p>';
    }
}

function toggleWatchlistBtn(movie, btn, type) {
    const inList = isInWatchlist(movie.id);
    if (inList) {
        removeFromWatchlist(movie.id);
        btn.className = 'btn btn-primary';
        btn.textContent = '+ Add to Watchlist';
    } else {
        movie.media_type = type;
        addToWatchlist(movie);
        btn.className = 'btn btn-outline';
        btn.textContent = '✓ In Watchlist';
    }
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('active');
}

// Global Event Delegation for clicking outside the Modal frame
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) closeModal();
        });
    }
});
