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
  
  // Get movie information
  const movieUrl = 'https://www.filmaffinity.com/es/film123456.html';
  const movieInfo = await scraper.getMovie(movieUrl);
  console.log(movieInfo);
  
  // Get movie trailers
  if (movieInfo?.trailersUrl) {
    const trailers = await scraper.getTrailers(movieInfo.trailersUrl);
    console.log(trailers);
  }
}
```

### TypeScript
```typescript
import { FilmaffinityScraper, MovieInfo, TrailerInfo } from 'filmaffinity-scraper';

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
}
```

## Example Response

Here's an example of the movie information returned by the scraper:

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

## Features

- Scrapes detailed movie information from Filmaffinity
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

The scraper methods return `null` when:
- The movie URL is invalid
- The movie page is not accessible
- The required information cannot be extracted

## License

MIT
