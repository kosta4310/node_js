import { httpStatusCodes } from '../httpStatusCodes';
import { createNewUser, getAllUsers } from '../models/userModel';
import { Req, Res } from '../server';

export async function getUsers(req: Req, res: Res) {
  try {
    res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' });
    const users = await getAllUsers();
    res.end(JSON.stringify(users));
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
