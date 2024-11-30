# Filmaffinity Scraper

A TypeScript library to scrape movie information from Filmaffinity.

## Installation

```bash
npm install filmaffinity-scraper
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

## Development

To build the project:

```bash
npm run build
```

This will generate the JavaScript files and type definitions in the `dist` directory.

## License

MIT
