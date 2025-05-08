import request from 'supertest';
import app from '../src/app';

describe('Movies API', () => {
  it('should return movies with pagination', async () => {
    const res = await request(app).get('/api/movies?page=1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.page).toBe(1);
  });

  it('should return a movie by movieId', async () => {
    const res = await request(app).get('/api/movies/15');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title');
  });

  it('should return movies by year', async () => {
    const res = await request(app).get('/api/movies/by-year?year=2005');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('year');
  });

  it('should return 400 if year not provided', async () => {
    const res = await request(app).get('/api/movies/by-year');
    expect(res.statusCode).toEqual(400);
  });

  it('should return movies by genre', async () => {
    const res = await request(app).get('/api/movies/by-genre?genre=Action');
    expect(res.statusCode).toEqual(200);
    expect(res.body.genre).toBe('Action');
  });

  it('should return 400 if genre not provided', async () => {
    const res = await request(app).get('/api/movies/by-genre');
    expect(res.statusCode).toEqual(400);
  });
});
