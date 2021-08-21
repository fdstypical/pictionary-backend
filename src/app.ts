import express, { Application, Request, Response } from 'express';
import { config, Routes } from '../configs';

const app: Application = express();
app.use(express.json());

app.get(Routes.root, (req: Request, res: Response) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(config.PORT, () => {
  return console.log(`server is listening on ${config.PORT}`);
});
