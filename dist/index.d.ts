import { MovieInfo, TrailerInfo, MovieSearchResult } from "./types";
export declare class FilmaffinityScraper {
    /**
     * Get detailed information about a movie from its Filmaffinity URL
     * @param url - The Filmaffinity movie URL
     * @returns Promise with movie information or null if an error occurs
     */
    getMovie(url: string): Promise<MovieInfo | null>;
    /**
     * Get trailers information from a movie's trailer page
     * @param trailersUrl - The URL of the trailers page
     * @returns Promise with array of trailer objects or null if an error occurs
     */
    getTrailers(trailersUrl: string): Promise<TrailerInfo[] | null>;
    /**
     * Search for movies by title
     * @param searchQuery - The movie title to search for
     * @returns Promise with an array of movie search results
     */
    searchMoviesByTitle(searchQuery: string): Promise<MovieSearchResult[]>;
}
export * from './types';
