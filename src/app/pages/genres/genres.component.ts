import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { TVShowsService } from 'src/app/services/tvshows.service';
import { Genre, Movie, MoviesDto } from 'src/app/types/movie';
import { PaginatorState } from 'primeng/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mapToMoviesDto } from 'src/app/types/tvshow';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit, OnDestroy {

  genres$ : Observable<Genre[]> | null = null;
  shows$: Observable<Movie[]> | null = null;
  showsList$: Observable<MoviesDto> | null = null;
  showType: 'tv' | 'movie' = 'movie';
  genreIdSaved: string | null = '';
  genreType: string | null = '';
  genreNameSaved: string = '';

  constructor(
    private mService : MoviesService,
    private tvService: TVShowsService,
    private route : ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.showsList$ = null;

      // this.genreIdSaved = params.get('genreId');
      // this.genreType = params.get('type');
      this.genreType = params.get('type') ? params.get('type') : 'movie';

      if (this.genreType === 'movie') {
        this.genres$ = this.mService.getMoviesGenres();
      } else if (this.genreType === 'tv') {
        this.genres$ = this.tvService.getTVShowGenres();
      }
      
    });
  }

  getPagedShows(
    showType: string | null,
    genre: string | null,
    pageNumber: number
  ) {
    if(showType === 'movie'){
      this.showsList$ = this.mService.getMoviesByGenre(genre, pageNumber);
    } else if (showType === 'tv') {
      this.showsList$ = this.tvService
        .getTVShowByGenre(genre, pageNumber)
        .pipe(map(mapToMoviesDto));
    } 
  }

  findByGenre(genreId: string, genreName: string) {
    this.genreIdSaved = genreId;
    this.genreNameSaved = genreName;

    // this.showsList$ = this.mService.getMoviesByGenre(genreId);
    if(this.genreType === 'movie'){
      this.showsList$ = this.mService.getMoviesByGenre(genreId);
    } else if (this.genreType === 'tv') {
      this.showsList$ = this.tvService
        .getTVShowByGenre(genreId)
        .pipe(map(mapToMoviesDto));
    }
  }

  pageChange(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;

    this.getPagedShows(this.genreType, this.genreIdSaved, pageNumber);
  }

  ngOnDestroy() {

  }
}
