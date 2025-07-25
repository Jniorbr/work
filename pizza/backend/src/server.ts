import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors';
import path from 'path'

import { router } from './routes'

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if(err instanceof Error){
    //Se for uma instancia do tipo error
    res.status(400).json({
      error: err.message
    })
    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })
  return;
})

app.listen(3333, () => console.log('Servidor on'))