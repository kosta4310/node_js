import { Application } from './app/Application';
import { router } from './app/routers';

// endpoints = {
//   'api/users': {
//     method: (req, res) => void
//   },
//   'api/users:id': {
//     method: (req, res) => void
//   }
// };

export function createWorkerServer(port: number) {
  const app = new Application();

  app.addRouter(router);
  app.listen(port);
}
