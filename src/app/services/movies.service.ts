import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenresDto, Movie, MoviesDto } from '../types/movie';
import { map } from 'rxjs';
import { VideosDto } from '../types/video';
import { ImagesDto } from '../types/image';
import { CreditsDto } from '../types/credit';

@Injectable()
export class MoviesService {
  private apiUrl = "https://api.themoviedb.org/3";
  private apiKey = "81afbda1d68d879477495f66a71bde7f";
  // private apiUrl = process.env["BASE_URL"];
  // private apiKey = process.env["API_KEY"];

  constructor(private http: HttpClient) { }

  getMoviesByType(type: string, count = 20) {
    return this.http.get<MoviesDto>(
      `${this.apiUrl}/movie/${type}?api_key=${this.apiKey}`
    ).pipe(map((data) => data.results.slice(0, count)));
  }

  getMoviesById(id: string | null) {
    return this.http.get<Movie>(
      `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`
    )
  }

  getMovieVideos(id: string | null) {
    return this.http.get<VideosDto>(
      `${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`
    ).pipe(map((data) => data.results));
  }

  getSimilarMovies(id: string | null) {
    return this.http.get<MoviesDto>(
      `${this.apiUrl}/movie/${id}/similar?language=en-US&api_key=${this.apiKey}`
    ).pipe(map((data) => data.results.slice(0, 12)));
  }

  getMovieImages(id: string | null) {
    return this.http.get<ImagesDto>(
      `${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`
    ).pipe(map((data) => data.backdrops));
  }

  getMovieCast(id: string | null) {
    return this.http.get<CreditsDto>(
      `${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    ).pipe(map((data) => data.cast));
  }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? 'search/movie' : 'movie/popular'
    return this.http.get<MoviesDto>(
      `${this.apiUrl}/${uri}?query=${searchValue}&page=${page}&language=en-US&api_key=${this.apiKey}`
    );
  }

  getMoviesGenres() {
    return this.http.get<GenresDto>(
      `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`
    ).pipe(map((data) => data.genres));
  }

  getMoviesByGenre(genreId: string | null, pageNumber = 1) {
    return this.http.get<MoviesDto>(
      `${this.apiUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&language=en-US&api_key=${this.apiKey}`
    );
    // ).pipe(map((data) => data.results));
  }
}