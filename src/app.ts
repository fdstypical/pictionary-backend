import express, { Application, Request, Response } from 'express';
import { server } from '../configs';

const app: Application = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(server.PORT, () => {
  return console.log(`server is listening on ${server.PORT}`);
});
