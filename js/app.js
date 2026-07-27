// ========== SHARED UI FUNCTIONS ==========

function createCard(item) {
  const type = item.media_type || (item.title ? 'movie' : 'tv');
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <img src="${getImageURL(item.poster_path)}" alt="${getTitle(item)}" loading="lazy"/>
    <div class="movie-card-info">
      <div class="movie-card-title">${getTitle(item)}</div>
      <div class="movie-card-rating">⭐ ${getRating(item)} &bull; ${type === 'tv' ? 'TV' : 'Movie'}</div>
    </div>`;
  card.onclick = () => openModal(item.id, type);
  return card;
}

function renderGrid(containerId, items) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  if (!items || items.length === 0) {
    el.innerHTML = '<p style="color:#aaa">Nothing to show.</p>';
    return;
  }
  items.slice(0, 12).forEach(item => el.appendChild(createCard(item)));
}

async function openModal(id, type) {
  document.getElementById('modal-overlay').classList.add('active');
  document.getElementById('modal-content').innerHTML = '<div class="loading"><div class="spinner"></div>Loading...</div>';
  const movie = await getMovieDetails(id, type);
  const inList = isInWatchlist(movie.id);
  const genres = (movie.genres || []).map(g => `<span class="badge">${g.name}</span>`).join('');
  document.getElementById('modal-content').innerHTML = `
    <div class="modal-movie">
      <img class="modal-poster" src="${getImageURL(movie.poster_path)}" alt="${getTitle(movie)}"/>
      <div class="modal-info">
        <h2>${getTitle(movie)}</h2>
        <div class="modal-meta">${getYear(movie)} &bull; ⭐ ${getRating(movie)}</div>
        <div style="margin-bottom:12px">${genres}</div>
        <p class="modal-overview">${movie.overview || 'No description available.'}</p>
        <button class="btn ${inList ? 'btn-outline' : 'btn-primary'}"
          onclick="toggleWatchlistBtn(${movie.id}, '${movie.poster_path}', '${type}', this)">
          ${inList ? '✓ In Watchlist' : '+ Add to Watchlist'}
        </button>
      </div>
    </div>`;
}

function toggleWatchlistBtn(id, poster, type, btn) {
  if (isInWatchlist(id)) {
    removeFromWatchlist(id);
    btn.className = 'btn btn-primary';
    btn.textContent = '+ Add to Watchlist';
  } else {
    addToWatchlist({ id, poster_path: poster, media_type: type });
    btn.className = 'btn btn-outline';
    btn.textContent = '✓ In Watchlist';
  }
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}
