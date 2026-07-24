async function handleSearch() {
  try {
    const query = document.getElementById('searchbar').value;
    const items = await TMDBService.searchMedia(query);

    items.forEach(item => {
    console.log(`Found: ${item.title || item.name}`);
  });

} catch (error) {
  console.error('Error during search:', error);
  }
}

async function handleAddToWatchlist(selectedMediaItem) {
  try {
    const result = await WatchlistService.addToWatchList(selectedMediaItem);
    alert(result.message);
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    alert("Failed to add item to watchlist.");
  }

}
