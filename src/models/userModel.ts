import { v4 as uuidv4 } from 'uuid';
import { Error400, Error404, MyError } from '../errors/MyError';
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

export function getUserById(id: string): Promise<User | Error | MyError> {
  return new Promise((resolve, reject) => {
    try {
      const user = users.find((user) => user.id === id);
      if (user) {
        resolve(user);
      } else {
        throw new Error404(`User with id = ${id} doesn't exist`);
      }
    } catch (error) {
      reject(error);
    }
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

export function changeUser(id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await getUserById(id);
      console.log(user);
    } catch (error) {
      reject(error);
    }
  });
}
