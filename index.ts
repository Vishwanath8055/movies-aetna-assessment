import dotenv from 'dotenv';
import app from './src/app';

dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
