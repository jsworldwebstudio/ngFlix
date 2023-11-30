import { Movie, MoviesDto } from "./movie"

export type TVShow = {
  id: number
  backdrop_path: string
  genre_ids: number[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  name: string
  vote_average: number
  vote_count: number
  first_air_date: string
}

export type TVShowsDto = {
  page: number
  results: TVShow[]
  total_pages: number
  total_results: number
}

export function mapToMovies(tvshows: TVShow[]): Movie[] {
  return tvshows.map((tvshow: TVShow)=> {
    return {
      ...tvshow,
      title: tvshow.name,
      original_title: tvshow.original_name
    };
  });
}

export function mapToMovie(tvshow: TVShow): Movie {
  return {
    ...tvshow,
    title: tvshow.name,
    original_title: tvshow.original_name
  };
}

export function mapToMoviesDto(tvshowsDto: TVShowsDto): MoviesDto {
  return {
    results: tvshowsDto.results.map(mapToMovie),
    total_pages: tvshowsDto.total_pages,
    total_results: tvshowsDto.total_results,
    page: tvshowsDto.page
  };
}