export interface MovieInfo {
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

export interface TrailerInfo {
  id: string | undefined;
  number: string | undefined;
  title: string;
  iframeSrc: string | undefined;
}
