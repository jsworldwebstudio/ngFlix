import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TVShow, TVShowsDto } from '../types/tvshow';
import { map } from 'rxjs';
import { VideosDto } from '../types/video';
import { ImagesDto } from '../types/image';
import { CreditsDto } from '../types/credit';
import { GenresDto, MoviesDto } from '../types/movie';

@Injectable()
export class TVShowsService {
  private apiUrl = "https://api.themoviedb.org/3";
  private apiKey = "81afbda1d68d879477495f66a71bde7f";
  // private apiUrl = process.env["BASE_URL"];
  // private apiKey = process.env["API_KEY"];

  constructor(private http: HttpClient) { }

  getTVShowsByType(type: string, count = 20) {
    return this.http.get<TVShowsDto>(
      `${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`
    ).pipe(map((data)=>data.results.slice(0, count)));
  }

  getTVShowById(id: string | null) {
    return this.http.get<TVShow>(
      `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`
    )
  }

  getTVShowVideos(id: string | null) {
    return this.http.get<VideosDto>(
      `${this.apiUrl}/tv/${id}/videos?api_key=${this.apiKey}`
    ).pipe(map((data) => data.results));
  }

  geTVShowImages(id: string | null) {
    return this.http.get<ImagesDto>(
      `${this.apiUrl}/tv/${id}/images?api_key=${this.apiKey}`
    ).pipe(map((data) => data.backdrops));
  }

  getTVShowCast(id: string | null) {
    return this.http.get<CreditsDto>(
      `${this.apiUrl}/tv/${id}/credits?api_key=${this.apiKey}`
    ).pipe(map((data) => data.cast));
  }

  getSimilarTVShows(id: string | null) {
    return this.http.get<TVShowsDto>(
      `${this.apiUrl}/tv/${id}/similar?language=en-US&api_key=${this.apiKey}`
    ).pipe(map((data) => data.results.slice(0, 12)));
  }

  searchTVShows(page: number, searchValue?: string) {
    const uri = searchValue ? 'search/tv' : 'tv/popular'
    return this.http.get<TVShowsDto>(
      `${this.apiUrl}/${uri}?query=${searchValue}&page=${page}&language=en-US&api_key=${this.apiKey}`
    );
    // ).pipe(map((data) => data.results));
  }

  getTVShowGenres() {
    return this.http.get<GenresDto>(
      `${this.apiUrl}/genre/tv/list?api_key=${this.apiKey}`
    ).pipe(map((data) => data.genres));
  }

  getTVShowByGenre(genreId: string | null, pageNumber = 1) {
    return this.http.get<TVShowsDto>(
      `${this.apiUrl}/discover/tv?with_genres=${genreId}&page=${pageNumber}&language=en-US&api_key=${this.apiKey}`
    );
    // ).pipe(map((data) => data.results));
  }
}
