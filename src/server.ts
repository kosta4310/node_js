import http from 'node:http';
import { Router } from './app/Router';
import { App } from './app/App';
import { router } from './app/my_routers';
import { parseJson } from './app/middleware/parseJson';

export function createWorkerServer(port: number) {
  const app = new App();
  app.use(parseJson);
  app.addRoute(router);

  app.listen(port, () => console.log(`server running on port ${port}`));
}
