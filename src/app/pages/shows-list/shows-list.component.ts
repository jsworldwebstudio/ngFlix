import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { Observable, map } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { TVShowsService } from 'src/app/services/tvshows.service';
import { Movie, MoviesDto } from 'src/app/types/movie';
import { TVShowsDto, mapToMovies, mapToMoviesDto } from 'src/app/types/tvshow';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss']
})
export class ShowsListComponent implements OnInit {

  showsList$: Observable<MoviesDto> | null = null;
  tvShowsFull$: Observable<TVShowsDto> | null = null;
  tvShows$: Observable<Movie[]> | null = null;
  showType: string | null = 'movie';
  // showType: 'tv' | 'movie' = 'movie';
  searchValue = '';
  genreType = '';

  constructor(
    private router: ActivatedRoute,
    private movieservice: MoviesService,
    private tvshowsService: TVShowsService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.showType = params.get('type');
      // this.showType = this.router.snapshot.params['type'];

      this.getPagedShows(this.showType, 1);

      if (this.showType === 'tv') {
        this.genreType = "TV Shows"
      } else if (this.showType === 'movie') {
        this.genreType = "Movies"
      };
    });
  }

  getPagedShows(
    showType: string | null,
    page: number,
    searchKeyword?: string
  ) {
    if(showType === 'movie'){
      this.showsList$ = this.movieservice.searchMovies(page, searchKeyword);
    } 
    if(showType === 'tv'){
      this.showsList$ = this.tvshowsService
        .searchTVShows(page, searchKeyword)
        .pipe(map(mapToMoviesDto));
    } 
  }

  searchChange() {
    this.getPagedShows(this.showType, 1, this.searchValue);
  }

  pageChange(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;

    this.getPagedShows(this.showType, pageNumber, this.searchValue);
  }
}
