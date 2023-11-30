import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { MoviesService } from 'src/app/services/movies.service';
import { TVShowsService } from 'src/app/services/tvshows.service';
import { Actor } from 'src/app/types/credit';
import { Image } from 'src/app/types/image';
import { Movie } from 'src/app/types/movie';
import { mapToMovie, mapToMovies } from 'src/app/types/tvshow';
import { Video } from 'src/app/types/video';
import { map } from 'rxjs';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit {

  showId: string | null = '';
  showType: string | null = 'movie';
  // showType = 'movie';

  castTitle = '';
  similarShowTitle = '';

  show$: Observable<Movie> | null = null;
  showVideos$: Observable<Video[]> | null = null;
  showImages$: Observable<Image[]> | null = null;
  showSimilar$: Observable<Movie[]> | null = null;
  showCast$: Observable<Actor[]> | null = null;

  imagesSizes = IMAGES_SIZES;

  constructor(
    private router: ActivatedRoute,
    private moviesService: MoviesService,
    private tvshowsService: TVShowsService
  ) {}

  ngOnInit() {
    // this.showId = this.router.snapshot.params['id'];
    // this.showType = this.router.snapshot.params['type'];
    this.router.paramMap.subscribe((params) => {
      this.showId = params.get('id');
      this.showType = params.get('type');

      if(this.showType === 'movie'){
        this.show$ = this.moviesService.getMoviesById(this.showId);
        this.showVideos$ = this.moviesService.getMovieVideos(this.showId);
        this.showImages$ = this.moviesService.getMovieImages(this.showId);
        this.showSimilar$ = this.moviesService.getSimilarMovies(this.showId);
        this.showCast$ = this.moviesService.getMovieCast(this.showId);
        this.similarShowTitle = 'Similar Movies';
        this.castTitle = 'Movie Cast';
      } 
      if(this.showType === 'tv'){
        this.show$ = this.tvshowsService
          .getTVShowById(this.showId)
          .pipe(map(mapToMovie));
        this.showVideos$ = this.tvshowsService.getTVShowVideos(this.showId);
        this.showImages$ = this.tvshowsService.geTVShowImages(this.showId);
        this.showCast$ = this.tvshowsService.getTVShowCast(this.showId);
        this.showSimilar$ = this.tvshowsService
          .getSimilarTVShows(this.showId)
          .pipe(map(mapToMovies));
        this.similarShowTitle = 'Similar TV Shows';
        this.castTitle = 'TV Show Cast';
      }
    });
  }
}
