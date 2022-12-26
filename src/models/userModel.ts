import { rejects } from 'node:assert';
import { resolveMx } from 'node:dns';
import { v4 as uuidv4 } from 'uuid';
import { Error400 } from '../errors/MyError';
import { isValidDataUser } from '../utils/checkDataUser';

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

export function getUserById(id: string) {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    console.log(`id: ${id}`);

    // переписать на trycatch
    // if (user) {
    resolve(user);
    // } else {
    //   reject('user not found');
    // }
  });
}

export function createNewUser(userData: Omit<User, 'id'>) {
  return new Promise((resolve, reject) => {
    try {
      if (userData && isValidDataUser(userData)) {
        const newUser = { id: uuidv4(), ...userData };
        users.push(newUser);
        resolve(newUser);
      } else {
        throw new Error400('Body does not contain required fields');
      }
    } catch (error) {
      reject(error);
    }
  });
}
