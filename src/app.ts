import express, { Request, Response, NextFunction } from 'express';
import moviesRoutes from './routes/movies.routes';

const app = express();

app.use(express.json());
app.use('/api/movies', moviesRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unexpected Error:', err);
  res.status(500).json({ status: 500, message: 'Something went wrong!' });
});

export default app;
