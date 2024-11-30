import { CheerioAPI, load } from "cheerio";
import axios, { AxiosResponse } from "axios";
import { MovieInfo, TrailerInfo } from "./types";

export class FilmaffinityScraper {
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
}

export * from './types';
