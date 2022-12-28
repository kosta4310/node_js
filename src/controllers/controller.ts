import { Error400 } from '../errors/MyError';
import { httpStatusCodes } from '../httpStatusCodes';
import { createNewUser, getAllUsers, getUserById } from '../models/userModel';
import { Req, Res } from '../server';

export async function getUsers(req: Req, res: Res) {
  try {
    const users = await getAllUsers();
    res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    throw error;
  }
}

export async function getUser(req: Req, res: Res) {
  try {
    const id = req.url?.split('/api/users/')[1] as string;

    // if (id && isValidUuid(id)) {
    const user = await getUserById(id);
    res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    // } else {
    //   throw new Error400('UserId is invalid');
    // }
  } catch (error) {
    throw error;
  }
}

export async function createUser(req: Req, res: Res) {
  try {
    const newUser = await createNewUser(req.body);
    res.writeHead(httpStatusCodes.OK_POST, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    throw error;
  }
}

// export async function changeUser(req: Req, res: Res) {
//   try {
//     const newUser = await createNewUser(req.body);
//     res.writeHead(httpStatusCodes.OK_POST, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(newUser));
//   } catch (error) {
//     throw error;
//   }
// }
