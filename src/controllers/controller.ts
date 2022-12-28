import { Error400 } from '../errors/MyError';
import { httpStatusCodes } from '../httpStatusCodes';
import { changeUser, createNewUser, getAllUsers, getUserById, removeUser } from '../models/userModel';
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
    const user = await getUserById(id);
    res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
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

export async function putUser(req: Req, res: Res) {
  try {
    const id = req.url?.split('/api/users/')[1] as string;
    const newUser = await changeUser(id, req.body);
    res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(req: Req, res: Res) {
  try {
    const id = req.url?.split('/api/users/')[1] as string;

    await removeUser(id);
    res.writeHead(httpStatusCodes.OK_DELETE, { 'Content-Type': 'application/json' });
    res.end();
  } catch (error) {
    throw error;
  }
}
