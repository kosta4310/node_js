import { createUser, deleteUser, getUser, getUsers, putUser } from '../controllers/controller';
import { Req, Res } from '../server';

export const endpoints: { [key: string]: { [key: string]: (req: Req, res: Res) => Promise<void> } } = {
  GET: {
    getusers: getUsers,
    getuser: getUser,
  },
  POST: {
    postuser: createUser,
  },
  PUT: {
    changeuser: putUser,
  },
  DELETE: {
    deluser: deleteUser,
  },
};
