# Movie-Watchlist-App MovieMate





\# MovieMate



MovieMate is a web application that helps users discover movies and television shows and organize them in a personal watchlist.



The application uses The Movie Database (TMDB) API to display trending titles, popular movies, popular television shows, search results, and title details.



MovieMate was created by Group 7 as a semester project for CIS 1512: Software Engineering.



\## Main Features



\- Create a new user account

\- Log in and log out

\- View trending movies and television shows

\- View popular movies

\- View popular television shows

\- Search for movies and television shows

\- Open a title-details modal

\- View a title’s poster, year, rating, genres, and description

\- Add titles to a personal watchlist

\- Remove titles from the watchlist

\- Mark titles as watched or unwatched

\- Filter the watchlist by:

&#x20; - All titles

&#x20; - Movies

&#x20; - Television shows

&#x20; - Watched titles

&#x20; - Unwatched titles

\- Sort the watchlist by:

&#x20; - Title

&#x20; - Rating

&#x20; - Date added

\- View basic profile information

\- View total saved, watched, and unwatched titles

\- Use the application on different screen sizes



\## Technologies Used



\- HTML

\- CSS

\- JavaScript

\- TMDB API

\- Browser Local Storage

\- Git

\- GitHub



\## Project File Structure



```text

movie-watchlist-app/

│

├── index.html

├── README.md

│

├── css/

│   └── style.css

│

├── js/

│   ├── api.js

│   ├── app.js

│   ├── auth.js

│   ├── config.js

│   └── watchlist.js

│

└── pages/

&#x20;   ├── home.html

&#x20;   ├── profile.html

&#x20;   ├── search.html

&#x20;   └── watchlist.html

\## File Descriptions



\- index.html — Contains the registration and login forms. It is the first page users see when opening MovieMate.

\- home.html — Displays trending titles, popular movies, and popular television shows.

\- search.html — Allows users to search for movies and television shows and view title details.

\- watchlist.html — Displays saved titles and includes filters, sorting, watched status, and removal options.

\- profile.html — Displays the user’s username, email address, and watchlist totals.

\- style.css — Contains the main design and responsive styles for MovieMate.

\- auth.js — Handles registration, login, logout, the current user, and protected-page access.

\- api.js — Connects MovieMate to the TMDB API and retrieves movie and television information.

\- watchlist.js — Handles saving, removing, and updating watchlist items.

\- app.js — Contains shared functions for movie cards, grids, title details, and watchlist actions.

\- config.js — Contains the TMDB API settings, including the API URL, image URL, and API key.



\## How to Run MovieMate



1\. Download or clone the MovieMate project.

2\. Open the project folder in Visual Studio Code or another code editor.

3\. Create a free account with The Movie Database.

4\. Get a TMDB API key.

5\. Open `js/config.js`.

6\. Add the API key using the following format:



```JavaScript

const CONFIG = {

&#x20; API\_KEY: 'YOUR\_TMDB\_API\_KEY',

&#x20; BASE\_URL: 'https://api.themoviedb.org/3',

&#x20; IMAGE\_BASE\_URL: 'https://image.tmdb.org/t/p/w500',

};

7\. Start the application using the Live Server extension in Visual Studio Code.

8\. Open `index.html` in the browser.

9\. Create an account and log in to use MovieMate.



\## Data Storage



MovieMate uses browser Local Storage for the current semester version.



Local Storage is used to save:



\- Registered user accounts

\- The currently logged-in user

\- Personal watchlist items

\- Watched and unwatched status

\- The date a title was added



Because the information is stored in the browser, it is available only on the same browser and device.



A future version could use a backend database so users can access the same account and watchlist from more than one device.



\## TMDB API



MovieMate uses the TMDB API to retrieve:



\- Trending movies and television shows

\- Popular movies

\- Popular television shows

\- Search results

\- Posters

\- Ratings

\- Release years

\- Genres

\- Title descriptions



MovieMate does not own the movie and television information received from TMDB.



\## Current Project Scope



MovieMate is a semester project and a working front-end web application.



The current version does not include:



\- Movie or television streaming

\- Personalized recommendations

\- Social or friend features

\- Real-time notifications

\- A mobile application

\- A backend database

\- Cross-device account access



These features could be considered in a future version.



\## Development Team



\- Alexander Lor

\- Bethlehem Balcha

\- Meagan Azzo

\- Sarah O’Neil

\- Randy Carroll



\## Course Information



\- Course: CIS 1512: Software Engineering

\- Project: MovieMate

\- Group: Group 7

\- Year: 2026





