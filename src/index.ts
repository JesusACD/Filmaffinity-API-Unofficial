import { CheerioAPI, load } from "cheerio";
import axios, { AxiosResponse } from "axios";
import { MovieInfo, TrailerInfo, MovieSearchResult, Language } from "./types";

export class FilmaffinityScraper {
  private language: Language;
  private baseUrl: string;

  constructor(language: Language = 'es') {
    this.language = language;
    this.baseUrl = `https://www.filmaffinity.com/${language}`;
  }

  /**
   * Set the language for the scraper
   * @param language - The language to use ('es' for Spanish, 'en' for English)
   */
  setLanguage(language: Language): void {
    this.language = language;
    this.baseUrl = `https://www.filmaffinity.com/${language}`;
  }

  /**
   * Get the current language setting
   * @returns The current language
   */
  getLanguage(): Language {
    return this.language;
  }

  /**
   * Get detailed information about a movie from its Filmaffinity URL
   * @param url - The Filmaffinity movie URL
   * @returns Promise with movie information or null if an error occurs
   */
  async getMovie(url: string): Promise<MovieInfo | null> {
    try {
      const response: AxiosResponse = await axios.get(url);
      const html: string = response.data;
      const $: CheerioAPI = load(html);

      const title = $("#main-title span[itemprop='name']").text().trim();
      const year = $("dt:contains('Año') + dd[itemprop='datePublished']").text().trim();
      const duration = $("dt:contains('Duración') + dd[itemprop='duration']").text().trim();
      const country = $("#country-img img.nflag").attr("alt");
      const countryImage = $("#country-img img.nflag").attr("src");
      const director = $("dt:contains('Dirección') + dd.directors span[itemprop='name']").text().trim();
      
      const genres: string[] = [];
      $("dt:contains('Género') + dd.card-genres span[itemprop='genre'] a").each((_, elem) => {
        genres.push($(elem).text().trim());
      });

      const cast: string[] = [];
      $("dd.card-cast-debug li a[itemprop='url'] div.name[itemprop='name']").each((_, elem) => {
        cast.push($(elem).text().trim());
      });

      const synopsis = $("dt:contains('Sinopsis') + dd[itemprop='description']").text().trim();
      const imageUrl = $("#movie-main-image-container img[itemprop='image']").attr("src");
      const largeImageUrl = $("#movie-main-image-container a.lightbox").attr("href");
      const countryImageUrl = countryImage ? `https://www.filmaffinity.com${countryImage}` : null;

      let trailersUrl = "";
      $(".ntabs a").each((_, elem) => {
        const tabText = $(elem).text().trim();
        if (tabText.includes("Tráilers")) {
          const href = $(elem).attr("href");
          if (href) trailersUrl = href;
          return false;
        }
      });

      return {
        title,
        year,
        duration,
        country,
        director,
        genres,
        cast,
        synopsis,
        imageUrl,
        largeImageUrl,
        countryImageUrl,
        trailersUrl,
      };
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return null;
    }
  }

  /**
   * Get trailers information from a movie's trailer page
   * @param trailersUrl - The URL of the trailers page
   * @returns Promise with array of trailer objects or null if an error occurs
   */
  async getTrailers(trailersUrl: string): Promise<TrailerInfo[] | null> {
    try {
      const response: AxiosResponse = await axios.get(trailersUrl);
      const html: string = response.data;
      const $: CheerioAPI = load(html);

      const trailers: TrailerInfo[] = [];

      $(".evideo-box").each((_, elem) => {
        const trailerId = $(elem).attr("data-evideo-id");
        const trailerNum = $(elem).attr("data-evideo-num");
        const title = $(elem).find(".video-title strong").text().trim();
        const iframeSrc = $(elem).find("iframe").attr("src");

        trailers.push({
          id: trailerId,
          number: trailerNum,
          title,
          iframeSrc,
        });
      });

      return trailers;
    } catch (error) {
      console.error("Error fetching trailers:", error);
      return null;
    }
  }

  /**
   * Search for movies by title
   * @param query - The search query
   * @returns Promise with an array of search results
   */
  async searchMovies(query: string): Promise<MovieSearchResult[]> {
    try {
      const url = `${this.baseUrl}/search.php?stext=${encodeURIComponent(query)}`;
      const response: AxiosResponse = await axios.get(url);
      const html: string = response.data;
      const $: CheerioAPI = load(html);

      const movies: MovieSearchResult[] = [];

      $(".se-it").each((_, element) => {
        const movieTitle = $(element).find(".mc-title a").text().trim();
        const movieImageUrl = $(element)
          .find(".mc-poster img")
          .attr("data-src");
        const movieUrl = $(element).find(".mc-title a").attr("href") || '';
        const countryFlagImageUrl = $(element).find(".nflag").attr("src");

        const countryImageUrl = countryFlagImageUrl
          ? `https://www.filmaffinity.com${countryFlagImageUrl}`
          : null;

        movies.push({
          title: movieTitle,
          imageUrl: movieImageUrl,
          url: movieUrl,
          countryImageUrl,
        });
      });

      return movies;
    } catch (error) {
      console.error("Error searching movies:", error);
      return [];
    }
  }
}

export * from './types';
