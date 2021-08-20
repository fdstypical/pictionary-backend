import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
