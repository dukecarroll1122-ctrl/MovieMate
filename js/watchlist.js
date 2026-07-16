// ========== WATCHLIST FUNCTIONS ==========

function getWatchlist() {
  const user = getCurrentUser();
  if (!user) return [];
  const key = `mm_watchlist_${user.email}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveWatchlist(list) {
  const user = getCurrentUser();
  if (!user) return;
  const key = `mm_watchlist_${user.email}`;
  localStorage.setItem(key, JSON.stringify(list));
}

function addToWatchlist(movie) {
  const list = getWatchlist();
  const exists = list.find(m => m.id === movie.id);
  if (exists) return false;
  list.push({ ...movie, watched: false, addedAt: new Date().toISOString() });
  saveWatchlist(list);
  return true;
}

function removeFromWatchlist(movieId) {
  const list = getWatchlist().filter(m => m.id !== movieId);
  saveWatchlist(list);
}

function toggleWatched(movieId) {
  const list = getWatchlist();
  const movie = list.find(m => m.id === movieId);
  if (movie) movie.watched = !movie.watched;
  saveWatchlist(list);
}

function isInWatchlist(movieId) {
  return getWatchlist().some(m => m.id === movieId);
}
