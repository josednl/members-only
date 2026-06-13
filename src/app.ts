import express, { type Express } from 'express';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Members Only Message Board');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
