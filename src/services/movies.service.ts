import db from '../database/db';

interface Movie {
  imdb_id: string;
  title: string;
  releaseDate: string;
  genres: string[];
  budget: string;
  [key: string]: any;
}

export const getMovies = (page = 1, limit = 50): Promise<Movie[]> => {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;
    const query = `
      SELECT movieId, imdbId AS imdb_id, title, releaseDate, genres, '$' || budget AS budget
      FROM movies
      LIMIT ? OFFSET ?
    `;
    db.all(query, [limit, offset], (err, rows) => {
      if (err) return reject(err);

      const parsed = rows.map((movie: any) => ({
        ...movie,
        genres: safeParseGenres(movie.genres)
      }));

      resolve(parsed);
    });
  });
};

const safeParseGenres = (raw: string): string[] => {
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

// Add similar typings to the other functions...
