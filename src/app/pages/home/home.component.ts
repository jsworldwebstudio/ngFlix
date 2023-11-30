import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { TVShowsService } from 'src/app/services/tvshows.service';
import { mapToMovies } from 'src/app/types/tvshow';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  constructor(
    private moviesService: MoviesService,
    private tvshowsService: TVShowsService
  ) {}
  
  popularMovies$ = this.moviesService.getMoviesByType('popular', 12);
  upcomingMovies$ = this.moviesService.getMoviesByType('upcoming', 12);
  topRatedMovies$ = this.moviesService.getMoviesByType('top_rated', 12);
  popularTVShows$ = this.tvshowsService.getTVShowsByType('popular', 12)
    .pipe(map(mapToMovies)
  );
  // popularTVShows$ = this.tvshowsService.getTVShowsByType('popular', 12)
  // .pipe(map(tvshows => {
  //   return tvshows.map((tvshow: TVShow)=> {
  //     return {
  //       ...tvshow,
  //       title: tvshow.name,
  //       original_title: tvshow.original_name
  //     }
  //   })
  // }));

}
