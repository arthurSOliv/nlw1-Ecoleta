import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

// GET: Buscar uma ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informação existente no back-end
// DELETE: Remover uma informação do back-end

//Request Param: Parâmetros que vem na própria rota que identificam um recurso
//Query Param: Parâmetros que vem na própria rota geralmente opicionais para filtros, paginação
//Request Body: Parâmetros para criação e atualização de usuário

app.listen(3333);