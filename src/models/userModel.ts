import { v4 as uuidv4 } from 'uuid';
import { Error400, Error404, MyError } from '../errors/MyError';
import { isValidDataUser, isValidUuid } from '../utils/checkDataUser';
import { model as users } from '../index';

export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
};

// const users: Array<User> = [];

export function getAllUsers() {
  return new Promise((resolve) => {
    resolve(users);
  });
}

export function getUserById(id: string): Promise<User | Error | MyError> {
  return new Promise((resolve, reject) => {
    try {
      if (isValidUuid(id)) {
        const user = users.find((user) => user.id === id);
        if (user) {
          resolve(user);
        } else {
          throw new Error404(`User with id = ${id} doesn't exist`);
        }
      } else {
        throw new Error400('UserId is invalid');
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

export function changeUser(id: string, user: Omit<User, 'id'>) {
  return new Promise(async (resolve, reject) => {
    try {
      let currentUser = await getUserById(id);

      if (user && isValidDataUser(user)) {
        currentUser = Object.assign(currentUser, { ...user });
        resolve(currentUser);
      } else {
        throw new Error400('Body does not contain required fields');
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function removeUser(id: string): Promise<Error | MyError | void> {
  return new Promise(async (resolve, reject) => {
    try {
      if (isValidUuid(id)) {
        let deletedUser = [];
        users.forEach((user, idx) => {
          if (user.id === id) {
            deletedUser = users.splice(idx, 1);
          }
        });
        if (deletedUser.length) {
          resolve();
        } else {
          throw new Error404(`User with id = ${id} doesn't exist`);
        }
      } else {
        throw new Error400('UserId is invalid');
      }
    } catch (error) {
      reject(error);
    }
  });
}
