"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmaffinityScraper = void 0;
const cheerio_1 = require("cheerio");
const axios_1 = __importDefault(require("axios"));
class FilmaffinityScraper {
    /**
     * Get detailed information about a movie from its Filmaffinity URL
     * @param url - The Filmaffinity movie URL
     * @returns Promise with movie information or null if an error occurs
     */
    async getMovie(url) {
        try {
            const response = await axios_1.default.get(url);
            const html = response.data;
            const $ = (0, cheerio_1.load)(html);
            const title = $("#main-title span[itemprop='name']").text().trim();
            const year = $("dt:contains('Año') + dd[itemprop='datePublished']").text().trim();
            const duration = $("dt:contains('Duración') + dd[itemprop='duration']").text().trim();
            const country = $("#country-img img.nflag").attr("alt");
            const countryImage = $("#country-img img.nflag").attr("src");
            const director = $("dt:contains('Dirección') + dd.directors span[itemprop='name']").text().trim();
            const genres = [];
            $("dt:contains('Género') + dd.card-genres span[itemprop='genre'] a").each((_, elem) => {
                genres.push($(elem).text().trim());
            });
            const cast = [];
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
                    if (href)
                        trailersUrl = href;
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
        }
        catch (error) {
            console.error("Error fetching movie data:", error);
            return null;
        }
    }
    /**
     * Get trailers information from a movie's trailer page
     * @param trailersUrl - The URL of the trailers page
     * @returns Promise with array of trailer objects or null if an error occurs
     */
    async getTrailers(trailersUrl) {
        try {
            const response = await axios_1.default.get(trailersUrl);
            const html = response.data;
            const $ = (0, cheerio_1.load)(html);
            const trailers = [];
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
        }
        catch (error) {
            console.error("Error fetching trailers:", error);
            return null;
        }
    }
}
exports.FilmaffinityScraper = FilmaffinityScraper;
__exportStar(require("./types"), exports);
