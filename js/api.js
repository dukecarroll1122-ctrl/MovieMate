// ========== TMDB API FUNCTIONS ==========

async function fetchTrending() {
  const res = await fetch(`${CONFIG.BASE_URL}/trending/all/week?api_key=${CONFIG.API_KEY}`);
  const data = await res.json();
  return data.results;
}

async function searchMovies(query) {
  const res = await fetch(`${CONFIG.BASE_URL}/search/multi?api_key=${CONFIG.API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`);
  const data = await res.json();
  return data.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv');
}

async function getMovieDetails(id, type = 'movie') {
  const res = await fetch(`${CONFIG.BASE_URL}/${type}/${id}?api_key=${CONFIG.API_KEY}`);
  return await res.json();
}

async function getPopular(type = 'movie') {
  const res = await fetch(`${CONFIG.BASE_URL}/${type}/popular?api_key=${CONFIG.API_KEY}`);
  const data = await res.json();
  return data.results;
}

function getImageURL(path) {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `${CONFIG.IMAGE_BASE_URL}${path}`;
}

function getTitle(item) {
  return item.title || item.name || 'Unknown';
}

function getYear(item) {
  const date = item.release_date || item.first_air_date || '';
  return date ? date.substring(0, 4) : 'N/A';
}

function getRating(item) {
  return item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
}
