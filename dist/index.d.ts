import { MovieInfo, TrailerInfo } from "./types";
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
}
export * from './types';
