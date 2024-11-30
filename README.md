# Filmaffinity Scraper

A TypeScript library to scrape movie information from Filmaffinity.

## Installation

```bash
npm install filmaffinity-api-unofficial
```

## Usage

### JavaScript
```javascript
const { FilmaffinityScraper } = require('filmaffinity-scraper');

async function example() {
    const scraper = new FilmaffinityScraper();
    try {
        // Example: Search for a movie
        const searchResults = await scraper.searchMovies("thor 2");
        console.log(searchResults);

        // If you find a movie, you can get its details
        if (searchResults.length > 0 && searchResults[0].url) {
            const movieDetails = await scraper.getMovie(searchResults[0].url);
            console.log(movieDetails);

            // Get movie trailers
            if (movieDetails?.trailersUrl) {
              const trailers = await scraper.getTrailers(movieDetails.trailersUrl);
              console.log(trailers);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
```

### TypeScript
```typescript
const { FilmaffinityScraper, MovieInfo, TrailerInfo, MovieSearchResult } = require('filmaffinity-scraper');

async function example(): Promise<void> {
  const scraper = new FilmaffinityScraper();
  
  // Get movie information
  const movieUrl = 'https://www.filmaffinity.com/es/film123456.html';
  const movieInfo: MovieInfo | null = await scraper.getMovie(movieUrl);
  console.log(movieInfo);
  
  // Get movie trailers
  if (movieInfo?.trailersUrl) {
    const trailers: TrailerInfo[] | null = await scraper.getTrailers(movieInfo.trailersUrl);
    console.log(trailers);
  }

  // Search movies by title
  const searchResults: MovieSearchResult[] = await scraper.searchMovies('La hora fatal');
  console.log(searchResults);
}
```

## Example Responses

### Movie Information
```javascript
{
  title: 'La hora fatal (Mr. Wong en el cuartel)',
  year: '1940',
  duration: '68 min.',
  country: 'Estados Unidos',
  director: 'William Nigh',
  genres: [ 'Intriga', 'Thriller', 'Cine negro' ],
  cast: [
    'Boris Karloff',
    'Marjorie Reynolds',
    'Grant Withers',
    'Charles Trowbridge',
    'Frank Puglia',
    'Craig Reynolds',
    'Lita Chevret',
    'Harry Strang',
    'Hooper Atchley',
    'Jason Robards Sr.',
    'Richard Loo'
  ],
  synopsis: 'James Lee Wong investiga el asesinato de un oficial de policía durante el robo a una joyería. Bobbie Logan es una temeraria reportera que intentará seguir los pasos del inspector oriental Wong para conseguir la exclusiva. (FILMAFFINITY)',
  imageUrl: 'https://pics.filmaffinity.com/the_fatal_hour-580434775-mmed.jpg',
  largeImageUrl: 'https://pics.filmaffinity.com/the_fatal_hour-580434775-large.jpg',
  countryImageUrl: 'https://www.filmaffinity.com/imgs/countries2/US.png',
  trailersUrl: ''
}
```

### Trailers Information
```javascript
[
  {
    id: "vi2364450073",
    number: "1",
    title: "Tráiler (2:25)",
    iframeSrc: "https://www.filmaffinity.com/es/evideos.php?movie_id=123456"
  },
  {
    id: "vi2364450074",
    number: "2",
    title: "Tráiler 2 (1:53)",
    iframeSrc: "https://www.filmaffinity.com/es/evideos.php?movie_id=123456"
  }
]
```

### Search Results
```javascript
[
  {
    title: "La hora fatal (Mr. Wong en el cuartel)",
    imageUrl: "https://pics.filmaffinity.com/the_fatal_hour-580434775-mmed.jpg",
    url: "https://www.filmaffinity.com/mx/film123456.html",
    countryImageUrl: "https://www.filmaffinity.com/imgs/countries2/US.png"
  },
  // ... more results
]
```

## Language Support

The scraper supports both Spanish (es) and English (en) languages. You can specify the language in three ways:

### 1. During initialization
```typescript
// Default to Spanish
const scraper = new FilmaffinityScraper();

// Or specify English explicitly
const englishScraper = new FilmaffinityScraper('en');
```

### 2. Change language after initialization
```typescript
const scraper = new FilmaffinityScraper();
scraper.setLanguage('en'); // Change to English
scraper.setLanguage('es'); // Change back to Spanish
```

### 3. Check current language
```typescript
const currentLanguage = scraper.getLanguage(); // Returns 'es' or 'en'
```

The language setting affects all scraper operations, including movie searches and information retrieval. The scraper will automatically use the appropriate Filmaffinity domain (filmaffinity.com/es or filmaffinity.com/en) based on the selected language.

## Types

### MovieInfo
```typescript
interface MovieInfo {
  title: string;
  year: string;
  duration: string;
  country: string | undefined;
  director: string;
  genres: string[];
  cast: string[];
  synopsis: string;
  imageUrl: string | undefined;
  largeImageUrl: string | undefined;
  countryImageUrl: string | null;
  trailersUrl: string;
}
```

### TrailerInfo
```typescript
interface TrailerInfo {
  id: string | undefined;
  number: string | undefined;
  title: string;
  iframeSrc: string | undefined;
}
```

### MovieSearchResult
```typescript
interface MovieSearchResult {
  title: string;
  imageUrl: string | undefined;
  url: string;
  countryImageUrl: string | null;
}
```

## Features

- Scrapes detailed movie information from Filmaffinity
- Search movies by title
- Supports both movie details and trailer information
- Provides TypeScript type definitions
- Returns high-quality movie poster images (both medium and large sizes)
- Includes comprehensive movie metadata (title, year, duration, country, director, etc.)
- Extracts full cast list and genres
- Returns movie synopsis
- Handles country flags/images

## Development

To build the project:

```bash
npm run build
```

This will generate the JavaScript files and type definitions in the `dist` directory.

## Error Handling

The scraper methods return:
- `null` when movie information cannot be retrieved (getMovie)
- Empty array `[]` when no search results are found (searchMovies)
- `null` when:
  - The movie URL is invalid
  - The movie page is not accessible
  - The required information cannot be extracted

## License

MIT
