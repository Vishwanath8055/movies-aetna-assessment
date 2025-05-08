import { Request, Response } from 'express';
import * as movieService from '../services/movies.service';
import { ApiError } from '../types/error';

export const getAllMovies = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;

  try {
    const movies = await movieService.getMovies(page);
    res.json({ page, data: movies });
  } catch (err) {
    const error: ApiError = { status: 500, message: 'Failed to fetch movies' };
    console.error(err);
    res.status(error.status).json(error);
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  const imdbId = parseInt(req.params.imdbId);

  try {
    const movie = await movieService.getMovieById(imdbId);
    if (!movie) {
      return res.status(404).json({ status: 404, message: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    const error: ApiError = { status: 500, message: 'Failed to fetch movie' };
    console.error(err);
    res.status(error.status).json(error);
  }
};

export const getMoviesByYear = async (req: Request, res: Response) => {
  const year = req.query.year as string;
  const page = parseInt(req.query.page as string) || 1;
  const sort = (req.query.sort as string) || 'asc';

  if (!year) {
    return res.status(400).json({ status: 400, message: 'Year is required as query param' });
  }

  try {
    const movies = await movieService.getMoviesByYear(year, page, sort);
    res.json({ year, page, sort, data: movies });
  } catch (err) {
    const error: ApiError = { status: 500, message: 'Failed to fetch movies by year' };
    console.error(err);
    res.status(error.status).json(error);
  }
};

export const getMoviesByGenre = async (req: Request, res: Response) => {
  const genre = req.query.genre as string;
  const page = parseInt(req.query.page as string) || 1;

  if (!genre) {
    return res.status(400).json({ status: 400, message: 'Genre is required as query param' });
  }

  try {
    const movies = await movieService.getMoviesByGenre(genre, page);
    res.json({ genre, page, data: movies });
  } catch (err) {
    const error: ApiError = { status: 500, message: 'Failed to fetch movies by genre' };
    console.error(err);
    res.status(error.status).json(error);
  }
};
