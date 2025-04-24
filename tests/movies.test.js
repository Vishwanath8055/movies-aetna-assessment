const request = require('supertest');
const app = require('../src/app');

describe('Movies API', () => {
  it('should return movies with pagination', async () => {
    const res = await request(app).get('/api/movies?page=1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.page).toBe(1);
  });

  it('should return a movie by imdbId', async () => {
    const res = await request(app).get('/api/movies/tt0094675');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('genres');
  });

  it('should return 404 for non-existing movie', async () => {
    const res = await request(app).get('/api/movies/nonexistingid123');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
  });
});
