import { v4 as uuidv4 } from 'uuid';

type User = {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
};

const users: Array<User> = [];

export function getAllUsers() {
  return users;
}

export function createNewUser(userData: Omit<User, 'id'>) {
  const newUser = { id: uuidv4(), ...userData };
  users.push(newUser);
  return newUser;
}
