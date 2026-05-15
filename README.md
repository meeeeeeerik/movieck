# Movieck

A modern movie discovery web application built with React and powered by [The Movie Database (TMDb) API](https://www.themoviedb.org/). Browse trending movies, explore genre-based collections, view detailed movie info with trailers and cast, and search for any movie in real time.

## Features

- **Home page** — hero backdrop of a random movie, 11 categorized horizontal carousels (Popular, Top Rated, Upcoming, and 8 genre-based lists)
- **Movie details page** — poster, synopsis, runtime, genres, YouTube trailer in a modal, full cast & crew, and similar movie suggestions
- **Live search** — debounced search input in the header that navigates to a dedicated results page
- **Responsive design** — mobile-first layout using Tailwind CSS, works across all screen sizes
- **Smooth UX** — sticky header, loading spinners, error states, scroll-to-top on navigation

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router DOM 6 | Client-side routing |
| Axios | HTTP requests to TMDb API |
| Tailwind CSS 3 | Utility-first styling |
| React Transition Group | Modal animations |
| Create React App | Build tooling |

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Main Page | Hero section + movie category carousels |
| `/movie/:id` | Movie Page | Full movie details, trailer, cast & crew |
| `/search?q=` | Search Page | Real-time search results grid |

## Getting Started

### Prerequisites

- Node.js 16+
- A free TMDb API key — sign up at [themoviedb.org](https://www.themoviedb.org/signup)

### Installation

```bash
cd movieck
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
REACT_APP_TMDB_API_KEY=your_api_key_here
```

> The API key is currently hardcoded in `src/api.js`. Move it to `.env` before deploying.

### Running Locally

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

Outputs an optimized bundle to the `build/` directory.

## Project Structure

```
src/
├── api.js              # MovieApi class — all TMDb endpoints
├── App.js              # Root component, router setup
├── components/         # Reusable UI components (Header, Poster, Backdrop, Loader, Error, Footer…)
├── pages/              # Route-level components (MainPage, MoviePage, SearchPage)
├── hooks/              # Custom hooks (useMovies, useMovie, useSearchMovies)
└── utils/              # Helpers (debounce, getRandomMinMax)
```

## API Overview

All requests go through the `MovieApi` class in [src/api.js](src/api.js):

| Method | Endpoint | Description |
|---|---|---|
| `getPopular()` | `/movie/popular` | Popular movies |
| `getTopRated()` | `/movie/top_rated` | Top-rated movies |
| `getUpcoming()` | `/movie/upcoming` | Upcoming releases |
| `getMovie(id)` | `/movie/:id` | Movie details + videos + credits + similar |
| `getMovieByGenreId(id)` | `/discover/movie?with_genres=` | Genre-based lists |
| `search(query)` | `/search/movie` | Full-text search |

## License

This project was built as part of a frontend development course. Feel free to fork and experiment.
