const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface IOnceGetMovies {
  playing_movie: IMovie[];
  topRated_movie: IMovie[];
  upComing_movie: IMovie[];
  latest_movie: IMovie[];
}

export const onceGetMovies = async () => {
  const movies = {} as IOnceGetMovies;
  const playing = await (
    await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko`)
  ).json();
  const topRated = await (
    await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko`)
  ).json();
  const upComing = await (
    await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko`)
  ).json();

  movies.playing_movie = playing.results;
  movies.topRated_movie = topRated.results;
  movies.upComing_movie = upComing.results;
  return movies;
};

export interface IGetMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
export interface Genre {
  id: number;
  name: string;
}
export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export const getMovieDetail = async (contentId: number, type: string) => {
  const response = await (
    await fetch(
      `${BASE_URL}/${type}/${contentId}?api_key=${API_KEY}&language=ko`
    )
  ).json();

  return response;
};
// https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
/////////////////////////////////////////////////////////////////////////////////////

// TV
export interface IGetTvResults {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}
export interface ITv {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IOnceGetTv {
  airingToday_tv: ITv[];
  topRated_tv: ITv[];
  popular_tv: ITv[];
}

export const onceGetTv = async () => {
  const tvs = {} as IOnceGetTv;
  const topRated = await (
    await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko`)
  ).json();
  const airingToday = await (
    await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko`)
  ).json();
  const popular = await (
    await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko`)
  ).json();

  tvs.topRated_tv = topRated.results;
  tvs.airingToday_tv = airingToday.results;
  tvs.popular_tv = popular.results;
  return tvs;
};

export interface IGetTvDetail {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: any[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: any;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date?: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path?: string;
  season_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export const getSearchResults = async (keyword: string) => {
  const response = await (
    await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&language=ko&query=${keyword}`
    )
  ).json();

  return response;
};
export interface ISearchResults {
  page: number;
  results: IResult[];
  total_pages: number;
  total_results: number;
}

export interface IResult {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type: string;
  genre_ids?: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  gender?: number;
  known_for_department?: string;
  profile_path?: string;
  known_for?: KnownFor[];
}

export interface KnownFor {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
