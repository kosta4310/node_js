import { rejects } from 'node:assert';
import { resolveMx } from 'node:dns';
import { v4 as uuidv4 } from 'uuid';
import { Error400 } from '../errors/MyError';

export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
};

const users: Array<User> = [];

export function getAllUsers() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

export function createNewUser(userData: Omit<User, 'id'>) {
  return new Promise((resolve, reject) => {
    try {
      if (userData) {
        const newUser = { id: uuidv4(), ...userData };
        users.push(newUser);
        resolve(newUser);
      } else {
        throw new Error400('body required');
      }
    } catch (error) {
      reject(error);
    }
  });
}
